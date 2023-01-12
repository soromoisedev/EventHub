import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from '../../utils';
import EditEvent from '../editEvent/editEvent';

import './userEventListCard.css'

export function UserEventListCard({ id, title, description, location, date, nbPlace, status, price, handleAllUser, isPublished, state, update, setUpdate }) {
	// const [update, setUpdate] = useState(false);
	const [edit, setEdit] = useState(false);
	function handleBuy(id) {
		console.log(id);
	}
	function handlePublish(id) {
		try {
			Axios.post(`/events/publish-event/${id}`)
				.then(resp => {
					setUpdate(!update)
				})
		} catch (error) {
			console.log("erreur lors de la publication : ", error)
		}
	}
	useEffect(() => {
		console.log("use effect userevlistCard")
	}, []);
	function handleEdit(id) {
		try {
			Axios.patch(`/events/update-event/${id}`,
				{
				})
				.then(resp => {
					setUpdate(!update)
				})
		} catch (error) {
			console.log("erreur lors de la publication : ", error)
		}
	}
	function editEvent() {
		setEdit(!edit)
	}
	// console.log("le state dans card est : ", id, title, description, state)
	return (
		<>
			<div className='elcTitle'><h3> {title} </h3></div>
			<div className='elcDescription'> {description} </div>
			<div className="frexLine">
				<div className="location">
					<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
						Lieu :
					</span> <span className="colorElement" >{location}</span>
				</div>
				<div className="date">
					<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
						Date :
					</span> <span className="colorElement" >{date.split("T")[0]}</span> <span style={{ fontStyle: "italic", fontWeight: "normal" }} >à </span><span className="colorElement" >{date.split("T")[1]}</span>
				</div>
				<div className="nbPlace">
					<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
						Place :
					</span> <span className="colorElement" >{nbPlace}</span>
				</div>
			</div>
			<div className='elcButton'>
				{!isPublished ?
					<div>
						<button className="ecb" onClick={() => handlePublish(id)}>Publier l'evenement</button>
						<button className="ecb" onClick={() => editEvent()}>Modifier l'evenement</button>
					</div>
					:
					<Link to={`/dashboard/participan-list-of-event/${id}`} className="ecb listUserParticipate" >liste des participants à ce évenement</Link>}
				{price !== 0 && <div className="price">
					Prix : <span className="colorElement"> {price} </span>
				</div>}
			</div>
			{edit &&
				<div className="blur">
					<EditEvent id={id} setEdit={setEdit} update={update} setUpdate={setUpdate} />
				</div>}
		</>
	)
}