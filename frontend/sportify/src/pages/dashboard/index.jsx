import React, {useEffect, useState} from "react";
import Activity from "../../components/Activity";
import Session from "../../components/Session";
import Intensity from "../../components/Intensity";
import Score from "../../components/Score";
import "./dashboard.css";
import KeyData from "../../components/KeyData";
import {useParams} from "react-router-dom";
import ApiFormatter from "../../utils/index";

/** Dashboard page
 *
 * @return {JSX.Element}
 * @constructor
 */


function Dashboard() {

	const { id } = useParams();
	const [data, setData] = useState([]);
	const [userId, setUserId] = useState(parseInt(id));

	const dataFormatter = new ApiFormatter();

	useEffect(() => {
		let mounted = true;
		dataFormatter.getFormattedUserData(userId)
			.then(data => {
				if (mounted) {
					setData(data.userInfos);
				}
			})
		return () => mounted = false;
	}, [id])


	return <section className={"dashboard"}>
		<h1>Bonjour <span className="red">{data.firstName}</span></h1>
		<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
		<div className="flex">
			<div className="flex-column">
				<div>
					<Activity userId={userId}/>
				</div>
				<div className="flex-custom">
					<Session userId={userId}/>
					<Intensity userId={userId}/>
					<Score userId={userId}/>
				</div>
			</div>
			<div>
				<KeyData userId={userId}/>
			</div>
		</div>
	</section>
}


export default Dashboard;

