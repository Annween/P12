import React, {useEffect, useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import "./Session.css";

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

const Session = () => {

	const [data, setData] = useState([]);

	async function getUserData(id) {
		return axios.get(`http://localhost:3000/user/${id}/average-sessions`);
	}


	useEffect(() => {
		let mounted = true;
		getUserData(12)
			.then(data => {
				if (mounted) {
					setData(data?.data?.data.sessions);
				}
			})
		return () => mounted = false;
	},[])


	const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  return (
	  <div className="sessionChart">
		  <div className="header-session">
		  <h4 className="session-title">Durée moyenne des sessions</h4>
		  </div>
	  <LineChart width={300} height={300}  data={data && data.map((el, i) => {
		  return {name: i, day: days[el.day - 1], length: el.sessionLength}
		  	  })} style={{background: "#FF0000", borderRadius: "10px"}}  margin={{ top: 5, right: 30, left: 20, bottom: 5}} >
		  <XAxis dataKey="day" axisLine={false} tick={{fill : "white", fontFamily: "Roboto, sans-serif", opacity: "0.5"}} tickLine={false}/>
		  <Tooltip />
		  <Line type="monotone" dataKey="length" stroke="#FFFFFF" strokeWidth={2.5} style={{opacity: "0.5"}} />
	  </LineChart>
	  </div>
  );
}

export default Session;
