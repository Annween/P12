/**
 * Class for data processing
 **/

import {getSessions, getPerformance, getActivities, getUserData} from "../services/api";


export default class ApiFormatter {

	async getFormattedSessionData(userId) {
		const data = await getSessions(userId);
		return this.__formatSessionData(data);
	}

	async getFormattedActivityData(userId) {
		const data = await getActivities(userId);
		return this.__formatActivityData(data);
	}

	async getFormattedIntensityData(userId) {
		const data = await getPerformance(userId);
		return this.__formatIntensityData(data);
	}

	async getFormattedScoreData(userId) {
		const data = await getUserData(userId);
		return this.__formatScoreData(data);
	}

	async getFormattedUserData(userId) {
		return getUserData(userId);
	}

	__formatSessionData(data) {
		const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
		return  data.map((el, i) => {
			return {name: i, day: days[el.day - 1], length: el.sessionLength}
		})
	}

	__formatActivityData(data) {
		return data.map((el, i) => {
			return {day: i, kilogram: el.kilogram, calories: el.calories}
		})
	}

	__formatIntensityData(data) {
		return data.data.map((el, i) => {
			return {subject : data.kind[el.kind], value: el.value}
		})
	}

	__formatScoreData(data) {
		return (data.todayScore || data.score) * 100
	}

}



