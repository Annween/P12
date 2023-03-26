import React, {useEffect, useState} from "react";
import calories from "../../images/calories-icon.png";
import carbs from "../../images/carbs-icon.png";
import fat from "../../images/fat-icon.png";
import protein from "../../images/protein-icon.png";
import "./KeyData.css";
import ApiFormatter from "../../utils/index";

/**
 * KeyData component
 * @component Show the key data of the user
 * @returns {JSX.Element}
 */


const KeyData = ({userId}) => {

	const [keyData, setData] = useState([]);
	const [error, setError] = useState(null);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedUserData(userId)
			.then(data => {
				if (mounted) {
					setData(data.keyData);
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

	return <div className="keyData">
		<DataError />
		{!error && <>
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
		</>}
	</div>

}

export default KeyData;
