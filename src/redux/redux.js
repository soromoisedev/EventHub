import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./user";
import { eventListSlice } from "./eventList";
import { userEventListSlice } from "./userEventList";
import { userEventParticipateSlice } from "./userEventParticipate";


export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		eventList: eventListSlice.reducer,
		userEventList: userEventListSlice.reducer,
		userEventParticipate: userEventParticipateSlice.reducer
	},
})