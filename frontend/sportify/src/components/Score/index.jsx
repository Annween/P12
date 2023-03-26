import React, {useEffect, useState} from "react";
import {RadialBarChart, RadialBar} from "recharts";
import "./Score.css";
import ApiFormatter from "../../utils/index";
import PropTypes from "prop-types";

/**
 * Score component
 * @component Show the score of the user
 * @param {number} userId
 * @returns {JSX.Element}
 */


const Score = ({userId}) => {

	const [scoreValue, setScoreValue] = useState(0);
	const [error, setError] = useState(null);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedScoreData(userId)
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

	const DataError = () => {
		if (error) {
			return <p className="error">Une erreur est survenue: impossible de charger les données</p>
		}
		return null
	}

	return (
		<div className="score">
			<DataError/>
			{!error && <>
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
						label={{position: "insideStart", fill: "white"}}
						cornerRadius={10}
						clockWise={true}
						dataKey="uv"

					/>

				</RadialBarChart>
			</> }
		</div>
	);
}

Score.propTypes = {
	userId: PropTypes.number.isRequired
}

export default Score;
