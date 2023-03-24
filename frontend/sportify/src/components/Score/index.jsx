import React, {useEffect, useState} from "react";
import { RadialBarChart, RadialBar } from "recharts";
import "./Score.css";
import ApiFormatter from "../../utils/index";
import PropTypes from "prop-types";

/**
 * Score component
 * @component Show the score of the user
 * @example
 * return (
 * <Score />
 * )
 */


const Score = (props) => {

	const [scoreValue, setScoreValue] = useState(0);
	const [error, setError] = useState(null);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedScoreData(props.userId)
			.then(data => {
				if (mounted) {
					setScoreValue(data);
				}
			}).catch(error => {
			setError(error)
		})
		return () => mounted = false;
	}, [])

	const data = [
		{
			uv: scoreValue,
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
					<h3>{scoreValue} %</h3><p>de votre objectif</p>
				</div>

			<RadialBarChart
				width={500}
				height={300}
				cx={150}
				cy={150}
				innerRadius={200}
				outerRadius={50}
				barSize={10}
				data={data}
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

Score.propTypes = {
	userId: PropTypes.number.isRequired
}

export default Score;
