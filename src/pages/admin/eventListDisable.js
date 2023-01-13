import React, { useState, useEffect } from 'react';
import Axios from '../../utils';

function EventListDisabled() {
	const [eventList, setEventList] = useState([]);
	const [update, setUpdate] = useState(false);
	const [empty, setEmpty] = useState(true);
	useEffect(() => {
		try {
			let isPass = true
			Axios.get("/events/get-desactivate-event")
				.then(response => {
					console.log("la reponse est : ", response.data)
					setEventList(response.data)
					response.data?.map(el => {
						if (el.deletedAt) {
							console.log("je suis dans if")
							isPass = false
							setEmpty(false)
						}
					})
					if (isPass) {
						setEmpty(true)
					}

				})
		} catch (error) {
			console.log("l'erreur dans user list est : ", error);
		}
		return () => {
			// console.log("je quite la liste des utilisateur");
		};
	}, [update]);
	function activateEvent(id) {
		Axios.get(`/events/restore-evente/${id}`)
			.then(resp => {
				setUpdate(!update)
			})
	}
	return (
		<div>
			<div className="userByList">
				{/* {console.log("la longeur est : ", userList)} */}
				<div className="userListTitle">Liste des evenements désactivé de la plate-forme</div>
				{eventList?.map((element, index) => (
					element.deletedAt &&
					<div className="" key={index}>
						<div className="eventDesableCard ">
							<div className="title">{element.title}</div>
							<div className="description">{element.description}</div>
							<div className="frexLine">
								<div className="location">
									<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
										Lieu :
									</span> <span className="colorElement" >{element.location}</span>
								</div>
								<div className="date">
									<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
										Date :
									</span> <span className="colorElement" >{element.date.split("T")[0]}</span> <span style={{ fontStyle: "italic", fontWeight: "normal" }} >à </span><span className="colorElement" >{element.date.split("T")[1]}</span>
								</div>
								<div className="nbPlace">
									<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
										Place :
									</span> <span className="colorElement" >{element.nbPlace}</span>
								</div>
							</div>
							<div className="elcButtonEventDesable">
								{element.status ? <div className="price">
									Prix : <span className="colorElement"> {element.price} </span>
								</div> : <div></div>}
								<button className="ecb desactivate" onClick={() => activateEvent(element.id)} > Réactiver ce évènement </button>
							</div>
						</div >
					</div>
				))}
				{empty && <div className="EmptyList">Aucun évènement n'est désactivé </div>}
			</div>
		</div>
	);
}

export default EventListDisabled;