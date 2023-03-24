import React, {useEffect, useState} from "react";
import Activity from "../../components/Activity";
import Session from "../../components/Session";
import Intensity from "../../components/Intensity";
import Score from "../../components/Score";
import axios from "axios";
import "./dashboard.css";
import KeyData from "../../components/KeyData";
import {useParams} from "react-router-dom";
import ApiFormatter from "../../utils/index";


function Dashboard() {

	const [data, setData] = useState([]);

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		getUserData(12)
			.then(data => {
				if (mounted) {
					setData(data.userInfos);
				}
			})
		return () => mounted = false;
	}, [], id)


	return <section className={"dashboard"}>
		<h1>Bonjour <span className="red">{data.firstName}</span></h1>
		<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
		<div className="flex">
			<div className="flex-column">
				<div>
					<Activity/>
				</div>
				<div className="flex-custom">
					<Session/>
					<Intensity/>
					<Score/>
				</div>
			</div>
			<div>
				<KeyData userId={userId}/>
			</div>
		</div>

	</section>
}


export default Dashboard;

