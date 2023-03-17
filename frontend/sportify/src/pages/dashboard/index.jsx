import React, {useEffect, useState} from "react";
import Activity from "../../components/Activity";
import Session from "../../components/Session";
import Intensity from "../../components/Intensity";
import Score from "../../components/Score";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {

  const [data, setData] = useState([]);

  async function getUserData(id) {
    return axios.get(`http://localhost:3000/user/${id}`);
  }

  useEffect(() => {
    let mounted = true;
    getUserData(12)
        .then(data => {
          if (mounted) {
            setData(data?.data?.data.userInfos);
          }
        })
    return () => mounted = false;
  },[])


  return <section className={"dashboard"}>
    <h1>Bonjour <span className="red">{data.firstName}</span></h1>
    <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    <Activity />
    <Session/>
    <Intensity/>
    <Score/>
  </section>
}




export default Dashboard;

