import React from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreateEvent from '../../components/createEvent/createEvent';
import EditUser from '../../components/editUser/editUser';
// import { EventListCard } from '../../components/eventListCard/eventListCard';
// import { UserEventListCard } from '../../components/userEventListCard/userEventListCard';
// import { setUserEvent } from '../../redux/userEventList';
// import Axios from '../../utils';
import EventParticipate from '../eventParticipate/eventParticipate';
import EventCreateByUser from '../eventCreateByUser/eventCreateByUser';
import './dashboard.css'
import ParticipantListOfEvent from '../participantListOfEvent/participantListOfEvent';

function Dashboard() {
	const [wantCreateTask, setWantCreateTask] = React.useState(false)
	const [wantEditUser, setWantEditUser] = React.useState(false)
	const [dashHome, setDashHome] = React.useState(true)
	// const userEventList = useSelector(state => state.userEventList)
	// console.log("la liste des évènement : ", Boolean(userEventList))
	// console.log("Dans le dash")
	function handleCreateTask() {
		setWantCreateTask(true)
	}
	function handleEditUser() {
		setWantEditUser(true)
	}
	function handleChangePageInDash() {
		setDashHome(!dashHome)
	}
	// let data
	return (
		<>
			{!useSelector(state => state.user.username) && <Redirect to={"/eventList"} />}
			<Router>
				<div className="dashboard" >
					{localStorage.getItem("username") &&
						<>
							<div className="DTitle"><span style={{ fontStyle: "italic" }} >Dashboard de </span>{localStorage.getItem('username').toUpperCase()} </div>
							<div className="topButtons">
								<button className="ecb editPersonnalInfo  dashTopButton" onClick={handleEditUser} >Modifier vos informations personnelles <MdEdit size={25} /> </button>
								{localStorage.getItem("role") === "organizer" && <button className="ecb createNewEvent  bashTopButton" onClick={handleCreateTask} > Créer un nouvel évènement <MdAdd size={25} /> </button>}
								{/* {localStorage.getItem("role") === "organizer" && dashHome && <Link to={"/dashboard/eventParticipate"} className="ecb createNewEvent dashTopButton" onClick={handleChangePageInDash} > Liste des evenements pour lesquels vous avez pris un ticket </Link>} */}
								{localStorage.getItem("role") === "organizer" && !dashHome && <Link to={"/dashboard/"} className="ecb createNewEvent dashTopButton" onClick={handleChangePageInDash} > Liste des evenements publié </Link>}
							</div>
							<Switch>
								<Route exact path={"/dashboard/"}>
									{localStorage.getItem("role") === "organizer" ? <>
										<EventCreateByUser wantCreateTask={wantCreateTask} />
									</>
										:
										<EventParticipate />}
								</Route>
								<Route path={"/dashboard/eventParticipate"}>
									<div className="eventParticipate">
										<EventParticipate />
									</div>
								</Route>
								<Route path={"/dashboard/participan-list-of-event/:id"}>
									<>
										<ParticipantListOfEvent />
									</>
								</Route>
							</Switch>
							{wantCreateTask && <div className="blur"><CreateEvent setWantCreateTask={setWantCreateTask} /></div>}
							{wantEditUser && <div className="blur"><EditUser setWantEditUser={setWantEditUser} /></div>}
						</>}
				</div >
			</Router>

		</>
	);
}

export default Dashboard;
