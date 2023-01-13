import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from '../popup/Popup';

import './eventBoughtCard.css'

export function EventBoughtCard({ id, title, description, status, price, handleRemove }) {
	// console.log("le state dans card est : ", id, title, description, state)
	const [confirm, setConfirm] = useState(false);
	console.log("le id : ", id);
	const ID = id
	function popupCancel() {
		setConfirm(!confirm)
	}
	function popupConfirm() {
		handleRemove(ID)
		setConfirm(!confirm)
	}
	return (
		<>
			<div className='elcTitle'><h3> {title} </h3></div>
			<div className='elcDescription'> {description} </div>
			<div className='elcButton'>  {/* event card button : ecb */}
				<button className="ecb removeTicket" onClick={() => setConfirm(true)} >Supprimer</button>
				{status && <div className="price">
					Prix : <span className="colorElement"> {price} </span>
				</div>}

			</div>
			{confirm &&
				<Popup
					title={"Confirmer"}
					description={`Voulez-vous supprimer le ticket pour : ' ${title} ' ?`}
					confirmText="Confirmer"
					cancelText="Annuler"
					confirmFunction={popupConfirm}
					cancelFunction={popupCancel}
				/>
			}
		</>
	)
}