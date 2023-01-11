import React, { useState, useEffect } from 'react';
import Axios from '../../utils';

function UserList() {
	const [userList, setUserList] = useState([]);
	const [update, setUpdate] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [idAction, setidAction] = useState(null);
	const [activate, setActivate] = useState(false);

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
		localStorage.setItem("popupTitle", "Voulez-vous désactiver ce utilisateur ? ")
		setidAction(id)
		setConfirm(!confirm)
		// console.log("l'id dans desactivate : ", idAction);
		// try {
		// 	Axios.delete(`/users/desactivate-user/${idAction}`)
		// 		.then(response => {
		// 			if (response.status === 200) {
		// 				localStorage.setItem("popupTitle", "Voulez-vous désactiver ce utilisateur ? ")
		// 				setUpdate(!update)
		// 				setConfirm(!confirm)
		// 			}
		// 			console.log("la reponse desactiver est  : ", response.data);
		// 		})
		// } catch (error) {
		// 	console.log("l'erreur de desactivation est : ", error);
		// }
	}

	function activateUser(id) {
		localStorage.setItem("popupTitle", "Voulez-vous activer ce utilisateur ? ")
		setidAction(id)
		setConfirm(!confirm)
	}
	function popupConfirme() {
		console.log("l'id dans activate : ", idAction);
		let request
		if (!activate) {
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
		localStorage.removeItem("popupTitle")
		setidAction(null)
		setConfirm(!confirm)
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
								{element?.role === "organizer" && <button className="ecb showEventList">voir ses evenement</button>}
							</div>
						</div>
					</div>
				))}
			</div>
			{confirm &&
				<div className="blur">
					<div className="confirmPopup">
						<div className='popupHead'> Confirmer </div>
						<div className="title">{localStorage.getItem("popupTitle")}</div>
						<div className="popupButtons">
							<button className="ecb activate popupConfirmButton" onClick={popupConfirme}>Confirmer</button>
							<button className="ecb desactivate popupCancelButton" onClick={popupCancel}>Annuler</button>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

export default UserList;
