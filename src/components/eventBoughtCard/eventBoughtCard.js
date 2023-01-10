import React from 'react'
import { Link } from 'react-router-dom'

import './eventBoughtCard.css'

export function EventBoughtCard({ id, title, description, status, price, handleRemove }) {
	// console.log("le state dans card est : ", id, title, description, state)
	console.log("le id : ", id);
	return (
		<>
			<div className='elcTitle'><h3> {title} </h3></div>
			<div className='elcDescription'> {description} </div>
			<div className='elcButton'>  {/* event card button : ecb */}
				{status && <div className="price">
					Prix : <span className="colorElement"> {price} </span>
				</div>}
				<button className="ecb removeTicket" onClick={() => handleRemove(id)} >Supprimer</button>
			</div>
		</>
	)
}