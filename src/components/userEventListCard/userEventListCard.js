import React from 'react'
import { Link } from 'react-router-dom'

import './userEventListCard.css'

export function UserEventListCard({ id, title, description, handleAllUser, state }) {
	function handleBuy(id) {
		console.log(id);
	}
	// console.log("le state dans card est : ", id, title, description, state)
	return (
		<>
			<div className='elcTitle'><h3> {title} </h3></div>
			<div className='elcDescription'> {description} </div>
			<div className='elcButton'>
				<Link to={`/dashboard/participan-list-of-event/${id}`} className="ecb listUserParticipate" >
					liste des participants à ce évenement
				</Link>
			</div>
		</>
	)
}