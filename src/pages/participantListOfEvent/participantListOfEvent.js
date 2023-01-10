import React from 'react';
import { useEffect, useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Axios from '../../utils';
import "./participantListOfEvent.css"

function ParticipantListOfEvent() {
	const { id } = useParams()
	// console.log("le tout est : ", useSelector(state => state.eventList), "l'id est : ", id);
	const { title,
		description,
		date,
		status,
		location,
		price,
		nbPlace } = useSelector(state => state.eventList)?.filter(el => el["id"] === Number(id))[0]
	let [eventDate, eventHour] = date.split("T")
	const [participant, setParticipant] = useState([{}])
	useEffect(() => {
		Axios.get(`/participation/get-event-participants/${id}`)
			.then((response) => {
				// const data = response.data
				// console.log("les datas recu sont : ", response.data);
				// console.log(response.data)
				setParticipant(response.data)
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
						<span className="colorElement" >{eventDate}</span>
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >à </span>
						<span className="colorElement" >{eventHour}</span>
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
			{participant.length === 0 ? <div className="userByList">
				{participant.map((element, index) => (
					<>
						<div className="user" key={index}>
							<div className="username">{element?.user?.username} </div>
							<div className="address">
								<div className="email">Email : <span className="colorElement"> {element?.user?.email}</span></div>
								<div className="phoneNumber">Contact : <span className="colorElement"> {element?.user?.contacts}</span></div>
							</div>
						</div>
					</>
				))}
			</div>
				:
				<div className="emptyUser">
					Aucun utilisateur n'as souscrit à ce evenement
				</div>
			}
		</div>
	);
}

export default ParticipantListOfEvent;
