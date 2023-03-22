import axios from "axios";

/**
 * Get data from the API
 * @param userId
 * @returns {Promise<{sessions: axios.AxiosResponse<any>, userData: axios.AxiosResponse<any>, performance: axios.AxiosResponse<any>, activity: axios.AxiosResponse<any>}>}
 */
export async function getUserData(userId) {
	const url = `http://localhost:3000/user/${userId}`;
	try {
		const res = await axios.get(url)
		return res.data.data
	} catch (error) {
		console.log('Fetch error', error);
	}
}

export async function getActivities(userId) {
	const url = `http://localhost:3000/user/${userId}/activity`;
	try {
		return await axios
			.get(url)
			.then((res) => res.data.data.sessions);
	} catch (error) {
		console.log('Fetch error', error);
	}

}

export async function getSessions(userId) {
	const url = `http://localhost:3000/user/${userId}/average-sessions`;
	try {
		return await axios
			.get(url)
			.then((res) => res.data.data.sessions);
	} catch (error) {
		console.log('Fetch error', error);
	}
}

export async function getPerformance(userId) {
	const url = `http://localhost:3000/user/${userId}/performance`;
	try {
		return await axios
			.get(url)
			.then((res) => res.data.data);
	} catch (error) {
		console.log('Fetch error', error);
	}
}



