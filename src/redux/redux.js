import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./user";
import { eventListSlice } from "./eventList";
import { userEventListSlice } from "./userEventList";
import { userEventParticipateSlice } from "./userEventParticipate";
import { ticketListSlice } from "./ticketList";


export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		eventList: eventListSlice.reducer,
		userEventList: userEventListSlice.reducer,
		userEventParticipate: userEventParticipateSlice.reducer,
		ticketList: ticketListSlice.reducer,
	},
})