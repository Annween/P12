import React, {useEffect, useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
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

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedSessionData(props.userId)
			.then(data => {
				if (mounted) {
					setData(data);
				}
			})
		return () => mounted = false;
	},[])



  return (
	  <div className="sessionChart">
		  <div className="header-session">
		  <h4 className="session-title">Durée moyenne des sessions</h4>
		  </div>
	  <LineChart width={300} height={300}  data={data} style={{background: "#FF0000", borderRadius: "10px"}}  margin={{top: 5, bottom: 5}} >
		  <XAxis dataKey="day" axisLine={false} tick={{fill : "white", fontFamily: "Roboto, sans-serif", opacity: "0.5"}} tickLine={false}/>
		  <Tooltip />
		  <Line type="monotone" dataKey="length" stroke="#FFFFFF" strokeWidth={2.5} style={{opacity: "0.5"}} />
	  </LineChart>
	  </div>
  );
}

Session.propTypes = {
	userId: PropTypes.number.isRequired
}
export default Session;
