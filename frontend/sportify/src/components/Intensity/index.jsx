import React, {useEffect, useState} from "react";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import "./Intensity.css";
import ApiFormatter from "../../utils/index";
import PropTypes from "prop-types";

/**
 * Average intensity of the user
 * @param {number} userId
 *  @component RadarChart of the average intensity of the user
 * @returns {JSX.Element}
 *
 **/
const Intensity = ({userId}) => {

	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedIntensityData(userId)
			.then(data => {
				if (mounted) {
					setData(data);
				}
			}).catch(error => {
			setError(error)
		})
		return () => mounted = false;
	}, [])

	const DataError = () => {
		if (error) {
			return <p className="error">Une erreur est survenue: impossible de charger les données</p>
		}
		return null
	}

	return (
		<section className="intensity">
			<DataError/>
			{!error &&
				<div className="radar">
					<RadarChart outerRadius={window.innerWidth > 1340 ? "70%" : "60%"} width={400} height={250}
					            data={data}>
						<PolarGrid radialLines={false}/>
						<PolarAngleAxis dataKey="subject" tick={{fill: "white", fontSize: 14}}/>
						<PolarRadiusAxis tick={false} axisLine={false} angle={30} domain={[0, 150]}/>
						<Radar name="subject" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.8}/>
					</RadarChart>
				</div>
			}
		</section>
	);
}

Intensity.propTypes = {
	userId: PropTypes.number.isRequired
}

export default Intensity;
