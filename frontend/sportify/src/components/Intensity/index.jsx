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
const Intensity = () => {

	const [data, setData] = useState([]);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		getPerformanceData(12)
			.then(data => {
				if (mounted) {
					setData(data?.data?.data);
				}
			})
		return () => mounted = false;
	},[])

	return (
		<section className="intensity">
			<div className="header-intensity">
			<h4>Intensité</h4>
			</div>
			<div className="radar">
		<RadarChart outerRadius={window.innerWidth > 1340 ? "70%" : "60%"} width={400} height={250}  data={data.data && data.data.map((el, i) => {return{ subject : data.kind[el.kind], value: el.value}})}>
			<PolarGrid />
			<PolarAngleAxis dataKey="subject"  tick={{fill: "white", fontSize: 14}} />
			<PolarRadiusAxis tick={false} axisLine={false}  angle={30} domain={[0, 150]} />
			<Radar name="subject" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.8} />
		</RadarChart>
			</div>
		</section>
	);
}

export default Intensity;
