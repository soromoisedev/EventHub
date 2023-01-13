import React from 'react';
import { useEffect, useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';
// import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Axios from '../../utils';
import "./participantListOfEvent.css"

function ParticipantListOfEvent({ set }) {
	const { id } = useParams()
	// console.log("le tout est : ", useSelector(state => state.eventList), "l'id est : ", id);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [status, setStatus] = useState(false);
	const [location, setLocation] = useState("");
	const [price, setPrice] = useState("");
	const [nbPlace, setNbPlace] = useState(0);
	// const [eventDate, setEventDate] = useState("");
	// const [eventHour, setEventHour] = useState("");
	// const { title,
	// 	description,
	// 	date,
	// 	status,
	// 	location,
	// 	price,
	// 	nbPlace } = useSelector(state => state.eventList)?.filter(el => el["id"] === Number(id))[0]
	// let [eventDate, eventHour] = date.split("T")
	const [participant, setParticipant] = useState([])
	useEffect(() => {
		Axios.get("/events/get-all-events")
			.then(res => {
				console.log("la reponse est : ", res.data.filter(el => el["id"] === Number(id))[0], "l'id de la page : ", id)
				const thisEvent = res.data.filter(el => el["id"] === Number(id))[0]
				setTitle(thisEvent.title)
				setDescription(thisEvent.description)
				setDate(thisEvent.date)
				console.log("la date : ", date);
				setStatus(thisEvent.status)
				setLocation(thisEvent.location)
				setPrice(thisEvent.price)
				setNbPlace(thisEvent.nbPlace)
				// setEventDate(date.split("T")[0])
				// setEventHour(date.split("T")[1])
			}).catch(err => {
				console.log("l'erreur de get all event est : ", err)
			})
		Axios.get(`/participation/get-event-participants/${id}`)
			.then((response) => {
				// const data = response.data
				console.log("les datas recu sont : ", response.data);
				console.log("participan event : ", response)
				setParticipant(response.data)
			}).catch(err => {
				console.log("l'erreur de get-event-participants est : ", err)
			})
	}, [])
	return (
		<div className="participantListOfEvent">
			<Link to="/dashboard" className="ecb return"><MdChevronLeft size={25} />  retour</Link>
			<div className="eventDetailParticipanList">
				<div className="title">{title}</div>
				<div className="descriptionParticipanList">{description}</div>
				<div className="frexLineParticipanList">
					<div className="location">
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
							Lieu :
						</span> <span className="colorElement" >{location}</span>
					</div>
					<div className="date">
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
							Date :
						</span>
						<span className="colorElement" >{date.split("T")[0]}</span>
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >à </span>
						<span className="colorElement" >{date.split("T")[1]}</span>
					</div>
					<div className="nbPlace">
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
							Place :
						</span> <span className="colorElement" >{nbPlace}</span>
					</div>
				</div>
				{status && <div className="priceParticipanList">
					Prix : <span className="colorElement"> {price} </span>
				</div>}
			</div>
			{console.log("la longueur est : ", participant)}
			{participant.length !== 0 &&
				<div className="userByList">
					{participant?.map((element, index) => (
						<>
							{element.user &&
								<div className="user" key={index}>
									<div className="username">{element?.user?.username} </div>
									<div className="address">
										<div className="email">Email : <span className="colorElement"> {element?.user?.email}</span></div>
										<div className="phoneNumber">Contact : <span className="colorElement"> {element?.user?.contacts}</span></div>
									</div>
								</div>}
						</>
					))}
				</div>}
			{participant.length !== 0 || <div className="emptyUser">
				Aucun utilisateur n'as souscrit à ce évènement
			</div>
			}
		</div>
	);
}

export default ParticipantListOfEvent;
