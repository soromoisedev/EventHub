import { createSlice } from "@reduxjs/toolkit";

export const userEventListSlice = createSlice({
	name: "userEventList",
	initialState: [],
	reducers: {
		// search: (state, action) => {
		// 	console.log(state)
		// 	function trouver(el, payload) {
		// 		let wordExist = false
		// 		const title = el.title
		// 		const long = title.split(" ").length
		// 		// console.log("le split : ", title.split(" "), "la long est : ", long)
		// 		for (let i = 0; i < long; i++) {
		// 			// console.log("le split i : ", title.split(" ")[i], "le payload est : ", payload)
		// 			if (title.split(" ")[i] === payload) {
		// 				console.log("le split i : ", title.split(" ")[i], "le payload est : ", payload)
		// 				wordExist = true
		// 			}
		// 		}
		// 		return wordExist
		// 	}
		// 	const copie = state
		// 	// const newCopie = copie.find(el => console.log("le retour de trouver est : ", trouver(el, action.payload)))
		// 	const newCopie = copie.filter(el => trouver(el, action.payload))
		// 	console.log("la new copie est : ", newCopie)
		// 	for (let i = state.length; i > 0; i--) {
		// 		state.pop();
		// 	}
		// 	state.unshift(...newCopie)
		// },
		setUserEvent: (state, action) => {
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

export const { setUserEvent } = userEventListSlice.actions