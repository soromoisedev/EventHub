import axios from 'axios'

const baseURL = 'http://localhost:4000'

const Axios = axios.create({ baseURL })

Axios.interceptors.request.use(config => {
	const token = localStorage.getItem("token")
	if (token) {
		// console.log("le if token : ", token);
		config.headers['Authorization'] = `Bearer ${token}`
	} else {
		// console.log("le else token : ", token);
	}
	return config
},
	(error) => {
		console.log("l'erreur dans Axios : ", error);
		return Promise.reject(error);
	}
)

export default Axios