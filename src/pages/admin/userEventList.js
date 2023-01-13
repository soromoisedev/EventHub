import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../../components/popup/Popup';
import Axios from '../../utils';

function UserEventList() {
	const [name, setName] = React.useState("")
	const [contact, setContact] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [role, setRole] = React.useState("")
	const [userEventList, setUserEventList] = useState([]);
	const [update, setUpdate] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [idAction, setidAction] = useState(null);
	const [activate, setActivate] = useState(true);
	const [id, setId] = useState(localStorage.getItem("userId"));

	useEffect(() => {
		try {
			Axios.get(`/users/get-one-user${id}`)
				.then(response => {
					console.log("la reponse user est : ", response.data)
					const data = response.data
					setName(data.username)
					setContact(data.contacts)
					setEmail(data.email)
					setRole(data.role)
					// setUserEventList(response.data)
				})
			Axios.get(`/events/get-event-by-admin/${id}`)
				.then(resp => {
					console.log("la reponse event by user est : ", resp);
					setUserEventList(resp.data)
				})
		} catch (error) {
			console.log("l'erreur dans user list est : ", error);
		}
		return () => {
			// console.log("je quite la liste des utilisateur");
		};
	}, [update]);

	function desactivateUser(id) {
		// localStorage.setItem("popupTitle", "Voulez-vous désactiver ce utilisateur ? ")
		setActivate(false)
		setidAction(id)
		setConfirm(!confirm)
	}

	function activateUser(id) {
		// localStorage.setItem("popupTitle", "Voulez-vous activer ce utilisateur ? ")
		setActivate(true)
		setidAction(id)
		setConfirm(!confirm)
	}
	function popupConfirme() {
		console.log("l'id dans activate : ", idAction);
		let request
		if (activate) {
			request = `/users/restore-user/${idAction}`
		} else {
			request = `/users/desactivate-user/${idAction}`
		}
		try {
			Axios.get(request)
				.then(response => {
					if (response.status === 200) {
						setUpdate(!update)
						setConfirm(!confirm)
					}
					// console.log("la reponse des : ", response);
				})
		} catch (error) {
			console.log("l'erreur de activation est : ", error);
		}
	}
	function popupCancel() {
		// localStorage.removeItem("popupTitle")
		setidAction(null)
		setConfirm(!confirm)
	}
	function orgEventList(id) {
		console.log("orgEventList : ", id);
		Axios.get(`/events/get-event-by-admin/${id}`)
			.then(resp => {
				console.log("la reponse est : ", resp);
			})
	}
	return (
		<div className="userEventList">
			<div className="userByList">
				{console.log("la longeur est : ", userEventList, "la long : ", userEventList.length)}
				<div className="userListTitle">Liste des evenements publié par :</div>
				<div className="userCard">
					<div className="usernameCard">{name} </div>
					<div className="addressCard">
						<div className="email">Email : <span className="colorElement"> {email}</span></div>
						<div className="number">Contact : <span className="colorElement"> {contact}</span></div>
						<div className="role">Role : <span className="colorElement">{role === "user" ? "Utilisateur" : "Organisateur"}</span></div>
					</div>
				</div>
				{/* {!userList.length === 0 || <div className="useListPL">{userList?.map((element, index) => (
					element.role === "superAdmin" ||
					<div></div>
				))}</div>}
				{userList.length === 0 && <div className="EmptyList"> Ce utilisateur n'a publié aucun evenement </div>
				} */}
			</div>
			{confirm &&
				<Popup
					title={"Confirmer"}
					description={!activate ? "Voulez-vous désactiver ce utilisateur ?" : "Voulez-vous réactiver ce utilisateur ?"}
					confirmText="Confirmer"
					cancelText="Annuler"
					confirmFunction={popupConfirme}
					cancelFunction={popupCancel}
				/>
			}
		</div>
	);
}

export default UserEventList;
