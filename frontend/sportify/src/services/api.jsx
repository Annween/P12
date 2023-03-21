import axios from "axios";
import {useEffect, useState} from "react";

/**
 * Get data from the API
 * @param userId
 * @returns {Promise<{sessions: axios.AxiosResponse<any>, userData: axios.AxiosResponse<any>, performance: axios.AxiosResponse<any>, activity: axios.AxiosResponse<any>}>}
 */
export async function getData(userId) {


	const url = `http://localhost:3000/user/${userId}`;

	try{
		const userData = await axios.get(url).then(response => response.data);
		const activity = await axios
			.get(url + '/activity')
			.then((res) => res.data.data);
		const sessions = await axios
			.get(url + '/average-sessions')
			.then((res) => res.data.data);
		const performance = await axios
			.get(url + '/performance')
			.then((res) => res.data.data);


		return { userData, activity, sessions, performance };

	}catch (error) {
		console.log('Fetch error', error);
	}

}





export default getData;

