/**
 * Class for data processing
 */


export default class Models {

	SessionsData(data) {
		const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
		return data && data.map((el, i) => {
			return {name: i, day: days[el.day - 1], length: el.sessionLength}
		})

	}

}

