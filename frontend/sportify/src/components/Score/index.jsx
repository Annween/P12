import React, {useEffect, useState} from "react";
import axios from "axios";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import "./Score.css";


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



	const dataArray = [

		{
			uv: 12,
			fill: "red"
		},

		{
			uv: 100,
			fill: "transparent"
		},





	];

	const style = {
		top: 0,
		left: 350,
		lineHeight: "24px"
	};



		return (
			<div className="score">
				<div className="objectif">
					<h3>12 %</h3><p>de votre objectif</p>
				</div>

			<RadialBarChart
				width={500}
				height={300}
				cx={150}
				cy={150}
				innerRadius={200}
				outerRadius={50}
				barSize={10}
				data={dataArray}
				startAngle={90}

			>
				<RadialBar
					minAngle={15}
					label={{ position: "insideStart", fill: "white" }}
					cornerRadius={10}
					clockWise={true}
					dataKey="uv"

				/>

			</RadialBarChart>

			</div>
		);


}

export default Score;
