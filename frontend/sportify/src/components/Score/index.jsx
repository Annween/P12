import React, {useEffect, useState} from "react";
import axios from "axios";
import {RadialBarChart, RadialBar, Tooltip} from "recharts";

const Score = () => {

	const [data, setData] = useState([]);

	async function getScoreData(id) {
		return axios.get(`http://localhost:3000/user/${id}`);
	}

	useEffect(() => {
		let mounted = true;
		getScoreData(12)
			.then(data => {
				if (mounted) {
					setData(data?.data?.data);

				}
			})
		return () => mounted = false;
	},[])
	return (
		<RadialBarChart
			width={730}
			height={250}
			innerRadius="10%"
			outerRadius="80%"
			data={[{uv : 12}]}
			startAngle={180}
			endAngle={0}
		>
			<RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey="uv" />
			<Tooltip />
		</RadialBarChart>
	);
}

export default Score;
