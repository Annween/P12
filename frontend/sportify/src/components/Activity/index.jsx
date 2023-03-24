import React, {useState, useEffect} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import axios from "axios";
import oval_red from "../../images/oval_red.png";
import oval_black from "../../images/oval_black.png";
import "./Activity.css";
import ApiFormatter from "../../utils/index";
import PropTypes from "prop-types";

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
	const [error, setError] = useState(null);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedActivityData(props.userId)
			.then(data => {
				if (mounted) {
					setData(data);
				}
			})
			.catch(error => {
				setError(error)
			})
		return () => mounted = false;
	}, [])

	const CustomTooltip = ({active, payload}) => {

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

	const DataError = () => {
		if (error) {
			return <p className="error">Une erreur est survenue: impossible de charger les données</p>
		}
		return null
	}


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
		<DataError/>
		{!error &&
			<ResponsiveContainer width="100%" height={250}>
			<BarChart width={730} height={250} data={data}>
				<CartesianGrid vertical={false} strokeDasharray="3"/>
				<XAxis dataKey="day" tickLine={false} style={{fontSize: "14px", color: "#9B9EAC", stroke: "#9B9EAC"}}/>
				<YAxis dataKey="kilogram" yAxisId="right" domain={[69, 'auto']} orientation={"right"}
				       tickLine={false} style={{fontSize: "14px", color: "#9B9EAC", stroke: "none"}}/>
				<YAxis dataKey="calories" yAxisId="left"  domain={[0, 'dataMax + 10']}  orientation={"left"}
				       hide={true}/>
				<Tooltip content={<CustomTooltip/>}/>
				<Bar yAxisId="right" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="kilogram" fill="#000000"/>
				<Bar yAxisId="left" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="calories" fill="#E60000"/>
			</BarChart>
			</ResponsiveContainer>
		}
	</section>
}

Activity.propTypes = {
	userId: PropTypes.number.isRequired
}

export default Activity;
