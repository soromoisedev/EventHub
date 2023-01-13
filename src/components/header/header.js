import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MdLogout } from "react-icons/md";

import './header.css'
import logoImage from '../../images/logoEvent.png'
import { setConnect, setSignup, setUsername, setInitialName, setToken, setRole } from "../../redux/user";

function Header() {
	// const [showConnection, setShowConnection] = React.useState(false)
	const username = useSelector(state => state.user.username) /* localStorage.getItem("username") */
	const initialName = localStorage.getItem("initialName")
	const [redirect, setRedirect] = React.useState(true)
	// console.log("initial name est ", initialName);
	const dispatch = useDispatch()

	function handleConnection() {
		// console.log("han connection");
		dispatch(setSignup(false))
		dispatch(setConnect(true))
	}
	function handleSignup() {
		// console.log("hand signup");
		dispatch(setConnect(false))
		dispatch(setSignup(true))
	}
	function handleLogout() {
		setRedirect(true)
		localStorage.removeItem('username')
		localStorage.removeItem('token')
		localStorage.removeItem('initialName')
		localStorage.removeItem('role')
		localStorage.removeItem('email')
		dispatch(setUsername(""))
		dispatch(setInitialName(""))
		dispatch(setToken(""))
		dispatch(setRole(""))
	}
	return (
		<div className="header">
			<Link to="/" className="headerLogo">
				<img className="logoimg" src={logoImage} alt="logo du site" ></img>
				<div className="logotext">E-vent Hub</div>
			</Link>
			<Link to="/eventList" className='authButton EventList'> Liste des évènements</Link>
			{username && <Link to="/dashboard/" className='authButton'> Dashboard</Link>}
			{!username ? <div className="headerButtons">
				<div className="authButton" onClick={handleConnection} >Se Connecter</div>
				<div className="authButton" onClick={handleSignup} >Créer un compte</div>
			</div>
				:
				<div className="circleLogout">
					<div className="userCircle">{initialName} </div>
					<div className="logout">
						<MdLogout onClick={handleLogout} className="logout" color="white" size={25} cursor="pointer" title="cliquer ici pour se déconnecter" />
					</div>
				</div>}
		</div>
	)
}

export default Header;