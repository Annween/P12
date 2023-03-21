import React, {useEffect, useState} from "react";
import axios from "axios";
import calories from "../../images/calories-icon.png";
import carbs from "../../images/carbs-icon.png";
import fat from "../../images/fat-icon.png";
import protein from "../../images/protein-icon.png";
import "./KeyData.css";

/**
 * KeyData component
 * @component Show the key data of the user
 * @example
 * return (
 * <KeyData />
 * )
 */


function KeyData() {

	const [keyData, setData] = useState([]);

	async function getUserData(id) {
		return axios.get(`http://localhost:3000/user/${id}`);
	}

	useEffect(() => {
		let mounted = true;
		getUserData(12)
			.then(data => {
				if (mounted) {
					setData(data?.data?.data.keyData);
				}
			})
		return () => mounted = false;
	}, [])

	return <div className="keyData">

		<div className="container">
			<div className="element">
				<img src={calories} alt="calories"/>
			</div>
			<div className="text">
				<h3>{keyData.calorieCount}kCal</h3>
				<p>Calories</p>
			</div>
		</div>

		<div className="container">
			<div className="element">
				<img src={protein} alt="protein"/>
			</div>
			<div className="text">
				<h3>{keyData.proteinCount}g</h3>
				<p>Protéines</p>
			</div>
		</div>
		<div className="container">
			<div className="element">
				<img src={carbs} alt="carbs"/>
			</div>
			<div className="text">
				<h3>{keyData.carbohydrateCount}g</h3>
				<p>Glucides</p>
			</div>
		</div>
		<div className="container">
			<div className="element">
				<img src={fat} alt="fat"/>

			</div>
			<div className="text">
				<h3>{keyData.lipidCount}g</h3>
				<p>Lipides</p>
			</div>
		</div>
	</div>

}

export default KeyData;
