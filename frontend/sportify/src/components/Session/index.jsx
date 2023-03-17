import React, {useEffect, useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import "./Session.css";

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
	  <LineChart width={730} height={250}  data={data && data.map((el, i) => {
		  return {name: i, day: days[el.day - 1], length: el.sessionLength}
		  	  })} style={{background: "#FF0000"}}  margin={{ top: 5, right: 30, left: 20, bottom: 5}} >
		  <XAxis dataKey="day" axisLine={false} tick={{fill: 'white'}}/>
		  <Tooltip />
		  <Line type="monotone" dataKey="length" stroke="#FFFFFF" />
	  </LineChart>
	  </div>
  );
}

export default Session;
