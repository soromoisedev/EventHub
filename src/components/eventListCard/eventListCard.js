import React, { useEffect, useState } from 'react'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import showBuyButton from '../../myFunction'
import { setTicketList } from '../../redux/ticketList'
import { setConnect } from '../../redux/user'
import Axios from '../../utils'
import Popup from '../popup/Popup'

import './eventListCard.css'

export function EventListCard({ id, title, description, status, price, orgName, data, setData }) {
	// console.log("le state est : ", state);
	const [bought, setBought] = React.useState(false)
	// const [ticketList, setTicketList] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const dispatch = useDispatch()
	const ticketList = useSelector(state => state.ticketList)
	const role = useSelector(state => state.user.role)
	const [desId, setdesId] = useState(0);

	function handleBuy(event, id) {
		try {
			Axios.post("/participation/add-new-participation", { eventId: id })
				.then(response => {
					// console.log("la reponse de add-new-participation est :", response);
					if (bought) {
						setBought(false)
					} else {
						setBought(true)
					}
				})
				.catch(err => {
					console.log("l'erreur catch est : ", err.response.status);
					localStorage.setItem("conMessage", "Vous devez être connecté pour pouvoir achetter un ticket !")
					dispatch(setConnect(true))
					return
				})
		} catch (error) {
			console.log("l'erreur est : ", error);
			console.log("l'erreur de de add : ", error.response.status)
		}
	}
	useEffect(() => {
		console.log("execution du ue effect");
		try {
			if (role === "user") {
				Axios.get("/participation/get-user-participations")
					.then((response) => {
						let data = response.data
						// console.log("les datas recu sont : ", data, "data ticket : ", ticketList);
						// setTicketList(data)
						dispatch(setTicketList(data))
						// localStorage.setItem("ticketList", JSON.parse(JSON.stringify(data)))
						// console.log("les datas recu sont 2222 : ", data);
						for (let i = 0; i < ticketList.length; i++) {
							// console.log("le el est : ", localStorage.getItem("ticketList")[i]);
							if (ticketList[i].eventId === id) {
								setBought(true)
								break
							}
						}
					})
			}
		} catch (error) {

		}
	}, [])

	function handleDesactivateEvent() {
		try {
			Axios.delete(`/events/desactivate-event/${desId}`)
				.then(resp => {
					console.log("la reponse de desactivation de l'évènement est : ", resp);
					setData(!data)
				})
		} catch (error) {
			console.log("l'erreur de desactivation de l'évènement est : ", error);
		}
	}

	function showDesactivatePopup(id) {
		setdesId(id)
		setConfirm(true)
	}
	function popupCancel() {
		setConfirm(false)
	}
	return (
		<>
			<div className='elcTitle'><h3> {title} </h3></div>
			<div className='elcDescription'> {description} </div>
			<div className='elcButton'>  {/* event card button : ecb */}
				<div className="orgName"> {orgName} </div>
				<>
					{role === "superAdmin" && <button className="ecb desactivate blockEvent" onClick={() => showDesactivatePopup(id)} >bloquer l'évènement</button>}
					{showBuyButton() && !bought && status && <button className="ecb buyButton" title='Achetter un ticket pour ce concert' onClick={(event) => handleBuy(event, id)} ><MdOutlineAccountBalanceWallet size={25} />acheter</button>}
					{showBuyButton() && bought && <button className="ecb bought" title='Achetter un ticket pour ce concert' onClick={(event) => handleBuy(event, id)} >ticket pris</button>}
					{showBuyButton() && !bought && !status && <button className="ecb participer" title='participer à ce concert' onClick={(event) => handleBuy(event, id)} >participer</button>}
					<Link to={`/eventDetail/${id}`} className="ecb infoButton">détails</Link>
				</>

			</div>
			{status && <div className="price">
				Prix : <span className="colorElement"> {price} </span>
			</div>}

			{confirm &&
				<Popup
					title={"Confirmer"}
					description={"Voulez-vous désactiver ce évènement ?"}
					confirmText="Confirmer"
					cancelText="Annuler"
					confirmFunction={handleDesactivateEvent}
					cancelFunction={popupCancel}
				/>
			}
		</>
	)
}