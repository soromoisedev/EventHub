import { createSlice } from "@reduxjs/toolkit";

export const userEventParticipateSlice = createSlice({
	name: "userEventParticipate",
	initialState: [],
	reducers: {
		setUserEventParticipate: (state, action) => {
			// console.log(action.payload)
			// state.slice(0, 0)
			for (let i = state.length; i > 0; i--) {
				state.pop();
			}
			action.payload.forEach(element => {
				// console.log("le parcour : ", element)
				state.push(element)
			});
			// state. (action.payload)
		}
	}
})

export const { setUserEventParticipate } = userEventParticipateSlice.actions