import React, {useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import oval_red from "../../images/oval_red.png";
import oval_black from "../../images/oval_black.png";
import "./Activity.css";


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
		<CartesianGrid strokeDasharray="3 3" />
   <XAxis dataKey="day" />
   <YAxis dataKey="kilogram" domain={[69, 'auto']} orientation={"right"}/>
   <Tooltip />
   <Bar radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="kilogram" fill="#000000" />
   <Bar radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="calories" fill="#E60000" />
 </BarChart>
   </section>
}




export default Activity;
