import React, {useEffect, useState} from "react";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import "./Intensity.css";
import ApiFormatter from "../../utils/index";
import PropTypes from "prop-types";

/**
 * Average intensity of the user
 *
 *  @component RadarChart of the average intensity of the user
 *  @example
 *  return (
 *  <Intensity />
 *  )
 *
 **/
const Intensity = (props) => {

	const [data, setData] = useState([]);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedIntensityData(props.userId)
			.then(data => {
				if (mounted) {
					setData(data);
				}
			})
		return () => mounted = false;
	},[])

	return (
		<section className="intensity">cla
			<div className="radar">
		<RadarChart outerRadius={window.innerWidth > 1340 ? "70%" : "60%"} width={400} height={250} data={data}>
			<PolarGrid />
			<PolarAngleAxis dataKey="subject"  tick={{fill: "white", fontSize: 14}} />
			<PolarRadiusAxis tick={false} axisLine={false}  angle={30} domain={[0, 150]} />
			<Radar name="subject" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.8} />
		</RadarChart>
			</div>
		</section>
	);
}

Intensity.propTypes = {
	userId: PropTypes.number.isRequired
}

export default Intensity;
