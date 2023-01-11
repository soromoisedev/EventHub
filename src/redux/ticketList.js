import { createSlice } from "@reduxjs/toolkit";

export const ticketListSlice = createSlice({
	name: "ticketList",
	initialState: [],
	reducers: {
		setTicketList: (state, action) => {
			for (let i = state.length; i > 0; i--) {
				state.pop();
			}
			action.payload.forEach(element => {
				state.push(element)
			});
		}
	}
})

export const { setTicketList } = ticketListSlice.actions