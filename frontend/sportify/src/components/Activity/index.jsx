import React, {useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";


const Activity = () => {
  const [data, setData] = useState([]);

  async function getActivityData(id) {
    return axios.get(`http://localhost:3000/user/${id}/activity`);
  }

  useEffect(() => {
		let mounted = true;
    getActivityData(12)
			.then(data => {
				if (mounted) {
          setData(data?.data?.data?.sessions);
				}
			})
		return () => mounted = false;
	},[])


   return <BarChart width={730} height={250} data={data && data.map((el, i) => {
      return {day: i, kilogram: el.kilogram, calories: el.calories}
   })}>
   <CartesianGrid strokeDasharray="3 3" />
   <XAxis dataKey="day" />
   <YAxis dataKey="kilogram"/>
   <Tooltip />
   <Legend />
   <Bar dataKey="kilogram" fill="#8884d8" />
   <Bar dataKey="calories" fill="#82ca9d" />
 </BarChart>
}




export default Activity;
