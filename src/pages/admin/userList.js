import React, { useState, useEffect } from 'react';
import Popup from '../../components/popup/Popup';
import Axios from '../../utils';

function UserList() {
	const [userList, setUserList] = useState([]);
	const [update, setUpdate] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [idAction, setidAction] = useState(null);
	const [activate, setActivate] = useState(true);

	useEffect(() => {
		try {
			Axios.get("/users/get-all-users")
				.then(response => {
					console.log("la reponse est : ", response.data)
					setUserList(response.data)
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
		<div>
			<div className="userByList">
				{/* {console.log("la longeur est : ", userList)} */}
				<div className="userListTitle">Liste des utilisateur de la plate-forme</div>
				{userList?.map((element, index) => (
					element.role === "superAdmin" ||
					<div className="userCard" key={index}>
						<div className="usernameCard">{element?.username} </div>
						<div className="addressCard">
							<div className="email">Email : <span className="colorElement"> {element?.email}</span></div>
							<div className="phoneNumber">Contact : <span className="colorElement"> {element?.contacts}</span></div>
						</div>
						<div className="roleButton">
							<div className="role">Role : <span className="colorElement">{element?.role === "user" ? "Utilisateur" : "Organisateur"}</span></div>
							<div className="buttons">
								{!element.deletedAt ?
									<button className="ecb desactivate" title='desactiver se compte' onClick={() => desactivateUser(element.id)}>bloquer</button>
									:
									<button className="ecb activate" title='réactiver se compte' onClick={() => activateUser(element.id)}>débloquer</button>}
								{element?.role === "organizer" && <button className="ecb showEventList" onClick={() => orgEventList(element.id)} >voir ses evenement</button>}
							</div>
						</div>
					</div>
				))}
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

export default UserList;
