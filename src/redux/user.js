import { createSlice } from "@reduxjs/toolkit";

export const getInitialName = (name) => {
	const sname = name.split(" ")
	let fl = ''  // first latter
	for (let i = 0; i < sname.length; i++) {
		fl = fl + sname[i][0]?.toUpperCase();
	}
	return fl
}

export const userSlice = createSlice({
	name: "user",
	initialState: [{
		wantconnect: false,
		wantsignup: false,
		username: "",
		initialName: "",
		token: "",
	}],
	reducers: {
		setConnect: (state, action) => {
			return {
				...state,
				wantconnect: action.payload
			}
		},
		setSignup: (state, action) => {
			return {
				...state,
				wantsignup: action.payload
			}
		},
		setUsername: (state, action) => {
			return {
				...state,
				username: action.payload

			}
		},
		setInitialName: (state, action) => {
			return {
				...state,
				initialName: getInitialName(action.payload)
			}
		},
		setToken: (state, action) => {
			return {
				...state,
				token: action.payload
			}
		},
	}
})

export const { setConnect, setSignup, setUsername, setInitialName, setToken } = userSlice.actions