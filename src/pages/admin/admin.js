import React, { useRef } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { Link, Redirect } from 'react-router-dom';
import EditUser from '../../components/editUser/editUser';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './admin.css'
import { useSelector } from 'react-redux';
import UserList from './userList';
import EventListDisabled from './eventListDisable';
import UserEventList from './userEventList';

function Admin() {
	const [wantEditUser, setWantEditUser] = React.useState(false)
	const userButton = useRef()
	const orgButton = useRef()
	function handleEditUser() {
		setWantEditUser(true)
	}
	function handleShowUser() {
		userButton.current.classList.add("dashButtonActive")
		orgButton.current.classList.remove("dashButtonActive")
	}
	function handleShowOrg() {
		userButton.current.classList.remove("dashButtonActive")
		orgButton.current.classList.add("dashButtonActive")
	}
	return (
		<div className="adminDash">
			{!useSelector(state => state.user.username) && <Redirect to={"/eventList"} />}
			{localStorage.getItem("username") &&
				<Router>
					<>
						<div className="DTitle"><span style={{ fontStyle: "italic" }} >Dashboard de </span>{localStorage.getItem('username').toUpperCase()} </div>
						<div className="topButtons">
							<button className="ecb editPersonnalInfo  dashTopButton" onClick={handleEditUser} >Modifier vos informations personnelles <MdEdit size={25} /> </button>
							{/* <button ref={userButton} className="ecb createNewEvent dashButtonActive" onClick={handleShowUser} > Liste des utilisateurs <MdAdd size={25} /> </button> */}
							<Link ref={userButton} to={"/dashboard"} className="ecb dashTopButton dashButtonActive" onClick={handleShowUser} > Liste des utilisateurs </Link>
							<Link ref={orgButton} to={"/dashboard/event-disable"} className="ecb dashTopButton" onClick={handleShowOrg} > Liste des évènements désactivés</Link>
							{/* {<Link to={"/dashboard/"} className="ecb createNewEvent dashTopButton" onClick={"handleChangePageInDash"} > Liste des evenements publié </Link>} */}
						</div>
					</>
					<>
						<Switch>
							<Route exact path={"/dashboard"}>
								<UserList />
							</Route>
							<Route path={"/dashboard/event-disable"}>
								<EventListDisabled />
							</Route>
							<Route path={"/dashboard/user-event-list/:id"}>
								<UserEventList />
							</Route>
						</Switch>
					</>
					{wantEditUser && <div className="blur"><EditUser setWantEditUser={setWantEditUser} /></div>}
				</Router>
			}
		</div>
	);
}

export default Admin;