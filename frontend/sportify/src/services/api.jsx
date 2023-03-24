import axios from "axios";

/**
 * Get data from the API
 * @param userId
 * @returns {Promise<{sessions: axios.AxiosResponse<any>, userData: axios.AxiosResponse<any>, performance: axios.AxiosResponse<any>, activity: axios.AxiosResponse<any>}>}
 */
const baseURL = "http://localhost:3000";
export async function getUserData(userId) {
	const url = `${baseURL}/user/${userId}`;
	try {
		const res = await axios.get(url)
		return res.data.data
	} catch (error) {
		console.log('Fetch error', error);
		throw error
	}
}

export async function getActivities(userId) {
	const url = `${baseURL}/user/${userId}/activity`;
	try {
		return await axios
			.get(url)
			.then((res) => res.data.data.sessions);
	} catch (error) {
		console.log('Fetch error', error);
		throw error
	}

}

export async function getSessions(userId) {
	const url = `${baseURL}/user/${userId}/average-sessions`;
	try {
		return await axios
			.get(url)
			.then((res) => res.data.data.sessions);
	} catch (error) {
		console.log('Fetch error', error);
		throw error
	}
}

export async function getPerformance(userId) {
	const url = `${baseURL}/user/${userId}/performance`;
	try {
		return await axios
			.get(url)
			.then((res) => res.data.data);
	} catch (error) {
		console.log('Fetch error', error);
		throw error
	}
}



