import React, {useEffect, useState} from "react";
import {LineChart, Line, XAxis, Tooltip} from 'recharts';
import "./Session.css";
import ApiFormatter from "../../utils/index";
import PropTypes from "prop-types";

/**
 * A component that displays the average duration of the user's sessions
 *
 *  @component Session component that displays the average duration of the user's sessions
 *  @example
 *  return (
 *  <Session />
 *  )
 *
 **/

const Session = (props) => {

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedSessionData(props.userId)
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

	const CustomTooltip = ({active, payload, label}) => {
		if (active) {
			return (
				<div className="session-tooltip">
					<p className="label">{`${payload[0].value} min`}</p>
				</div>
			);
		}

		return null;
	}
	const DataError = () => {
		if (error) {
			return <p className="error">Une erreur est survenue: impossible de charger les données</p>
		}
		return null
	}


	return (
		<div className="sessionChart">
			<DataError/>
			<div className="header-session">
				<h4 className="session-title">Durée moyenne des sessions</h4>
			</div>
			{!error &&
				<LineChart width={300} height={300} data={data} style={{background: "#FF0000", borderRadius: "10px"}}
				           margin={{top: 5, bottom: 5, left: 10, right: 10}}>
					<XAxis dataKey="day" axisLine={false}
					       tick={{fill: "white", fontFamily: "Roboto, sans-serif", opacity: "0.5"}} tickLine={false}/>
					<Tooltip cursor={false} content={< CustomTooltip/>}/>
					<Line type="monotone" dataKey="length" stroke="#FFFFFF" strokeWidth={2.5} style={{opacity: "0.5"}}
					      dot={false}/>
				</LineChart>}
		</div>
	);

}

Session.propTypes = {
	userId: PropTypes.number.isRequired
}
export default Session;
