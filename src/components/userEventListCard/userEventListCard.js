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
			<div className='elcButton'>
				{!isPublished ? <button className="ecb" onClick={() => handlePublish(id)}>Publier l'evenement</button> : <Link to={`/dashboard/participan-list-of-event/${id}`} className="ecb listUserParticipate" >
					liste des participants à ce évenement
				</Link>}
				{!isPublished && <button className="ecb" onClick={() => editEvent()}>Modifier l'evenement</button>}
			</div>
			{edit &&
				<div className="blur">
					<EditEvent id={id} setEdit={setEdit} />
				</div>}
		</>
	)
}