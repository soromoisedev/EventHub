import React, { useState, useEffect } from 'react';
import Axios from '../../utils';

function UserList() {
	const [userList, setUserList] = useState([]);
	const [update, setUpdate] = useState(false);
	useEffect(() => {
		try {
			Axios.get("/users/get-all-users")
				.then(response => {
					// console.log("la reponse est : ", response.data)
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
		console.log("l'id dans desactivate : ", id);
		try {
			// Axios.delete(`/users/desactivate-user/${id}`)
			Axios.get(`/users/restore-user/${id}`)
				.then(response => {
					if (response.status === 200) {
						setUpdate(!update)
					}
					// console.log("la reponse des : ", response);
				})
		} catch (error) {
			console.log("l'erreur de desactivation est : ", error);
		}
	}
	// desactivateUser(4)
	// desactivateUser(9)
	// desactivateUser(7)
	// desactivateUser(2)

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
								<button className="ecb desactivate" title='desactiver se compte' onClick={() => desactivateUser(element.id)}>bloquer</button>
								{element?.role === "organizer" && <button className="ecb showEventList">voir ses evenement</button>}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default UserList;
