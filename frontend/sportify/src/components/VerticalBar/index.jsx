import React from "react";
import "./VerticalBar.css";
import zen from "../../images/iconzen.png";
import ride from "../../images/icon_ride.png";
import swim from "../../images/icon_swim.png";
import strength from "../../images/icon_strength.png";

function VerticalBar() {
	return (<div className="vertical-bar flex-column">
		<div className="vertical-bar__item">
			<img src={zen} alt="zen"/>
		</div>
		<div className="vertical-bar__item">
			<img src={swim} alt="swim"/>
		</div>
		<div className="vertical-bar__item">
			<img src={ride} alt="ride"/>
		</div>
		<div className="vertical-bar__item">
			<img src={strength} alt="strength"/>
		</div>

		<div className="copyright">
			<small>Copyright, SportSee 2020</small>
		</div>

	</div>);

}


export default VerticalBar;
