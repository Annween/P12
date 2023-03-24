/**
 * Class for data processing
 **/


import {getSessions, getPerformance, getActivities, getUserData} from "../services/api";


export default class ApiFormatter {

	async getFormattedSessionData(userId) {
		try{
			const data = await getSessions(userId);
			console.log(data);
			return this.__formatSessionData(data);
		}catch (e) {
			throw e
		}
	}

	async getFormattedActivityData(userId) {
		try {
			const data = await getActivities(userId);
			return this.__formatActivityData(data);
		} catch (e) {
			throw e
		}
	}

	async getFormattedIntensityData(userId) {
		try{
			const data = await getPerformance(userId);
			return this.__formatIntensityData(data);
		} catch (e) {
			throw e
		}
	}

	async getFormattedScoreData(userId) {
		try {
			const data = await getUserData(userId);
			return this.__formatScoreData(data);
		}catch (e) {
			throw e
		}

	}

	async getFormattedUserData(userId) {
		try{
			return getUserData(userId);
		}catch (e) {
			throw e
		}
	}

	__formatSessionData(data) {

		const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

		return  data.map((el, i) => {
			return {name: i, day: days[el.day - 1], length: el.sessionLength}
		})
	}

	__formatActivityData(data) {
		return data.map((el, i) => {
			i++;
			return {day: i, kilogram: el.kilogram, calories: el.calories}
		})
	}

	__formatIntensityData(data) {
		//French translation
		data.kind = {
			1: 'Cardio',
			2: 'Energie',
			3: 'Endurance',
			4: 'Force',
			5: 'Vitesse',
			6: 'Intensité'
		}
		return data.data.map((el, i) => {
			return {subject : data.kind[el.kind], value: el.value}
		})
	}

	__formatScoreData(data) {
		return (data.todayScore || data.score) * 100
	}

}



