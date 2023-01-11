import React from 'react';
import Axios from '../../utils';
// import { MdAdd, MdEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
// import { Link, Redirect } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setUserEvent } from '../../redux/userEventList';
import { UserEventListCard } from '../../components/userEventListCard/userEventListCard';

function EventCreateByUser({ wantCreateTask }) {
	// Liste des evenement crée par un organisateur
	const dispatch = useDispatch()
	const userEventList = useSelector(state => state.userEventList)

	function handleAllUser(id) {
		// console.log("le handle")
		// /participation/get-user-participations
		Axios.get(`/participation/get-event-participants/${id}`)
			.then((response) => {
				const data = response.data
				console.log("les datas recu sont : ", data);
				console.log(response)
			})
	}
	React.useEffect(() => {
		// console.log("la repone est ", Axios.get("/events").then((response) => { return response.data }))
		Axios.get("/events/get-organizer-events")
			.then((response) => {
				const data = response.data
				console.log("les datas recu sont : ", data);
				dispatch(setUserEvent(response.data))
			})
	}, [wantCreateTask])
	return (
		<>
			{userEventList.length > 0 ?
				<div className="userEventList">
					<div className="title">Liste des evennements que vous avez publié</div>
					<div className='elcButton allUser'>  {/* event card button : ecb */}
						{/* <button className="ecb listAllUserParticipate" onClick={handleAllUser} >liste des participants à tout les évenements</button> */}
					</div>
					<div className="eventList">
						{userEventList.map((event) => (
							<div className='eventListCard' key={event.id} >
								<UserEventListCard id={event.id}
									title={event.title}
									description={event.description}
									state={event.status}
									handleAllUser={handleAllUser}
								/>
							</div>
						))}
					</div>
				</div> :
				<div className="EmptyList">
					Aucun evenement publié pour le moment
				</div>}
		</>
	);
}

export default EventCreateByUser;