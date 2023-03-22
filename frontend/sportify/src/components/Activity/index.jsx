import React, {useState, useEffect} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import axios from "axios";
import oval_red from "../../images/oval_red.png";
import oval_black from "../../images/oval_black.png";
import "./Activity.css";

/**
 * Activity component
 * @component Show the activity of the user
 * @example
 * return (
 * <Activity />
 * )
 */


const Activity = (props) => {
	const [data, setData] = useState([]);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedActivityData(props.userId)
			.then(data => {
				if (mounted) {
					setData(data);
				}
			})
		return () => mounted = false;
	}, [])

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="activity-tooltip">
					<p className="label">{`${payload[0].value}`}kg</p>
					<p className="label">{`${payload[1].value}`}Kcal</p>
				</div>
			);
		}

		return null;
	};

	return <section className="activity">
		<div className="header-activity">
			<h5>Activité quotidienne</h5>

			<ul>
				<li><img src={oval_black} alt={"oval"}/></li>
				<li className="grey">Poids (kg)</li>
				<li><img src={oval_red} alt={"oval"}/></li>
				<li className="grey">Calories brûlées (kCal)</li>
			</ul>
		</div>
		<BarChart width={730} height={250} data={data && data.map((el, i) => {
			return {day: i, kilogram: el.kilogram, calories: el.calories}
		})}>
			<CartesianGrid vertical={false} strokeDasharray="3"/>
			<XAxis dataKey="day" tickLine={false} style={{fontSize: "14px", color: "#9B9EAC", stroke: "#9B9EAC"}}/>
			<YAxis dataKey="kilogram" yAxisId="right" domain={['dataMin', 'dataMax']} orientation={"right"} tickLine={false}  style={{fontSize: "14px", color: "#9B9EAC", stroke: "none"}} />
			<YAxis dataKey="calories" yAxisId="left"  domain={['dataMin', 'dataMax']} orientation={"left"} hide={true}  />
			<Tooltip content={<CustomTooltip />} />
			<Bar yAxisId="right" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="kilogram" fill="#000000"/>
			<Bar yAxisId="left" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="calories" fill="#E60000"/>
		</BarChart>
	</section>
}


export default Activity;
