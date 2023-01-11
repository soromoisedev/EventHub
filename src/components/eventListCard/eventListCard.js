import React, { useState, useEffect } from 'react'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import showBuyButton from '../../myFunction'
import { setTicketList } from '../../redux/ticketList'
import { setConnect } from '../../redux/user'
import Axios from '../../utils'

import './eventListCard.css'

export function EventListCard({ id, title, description, status, price }) {
	// console.log("le state est : ", state);
	const [bought, setBought] = React.useState(false)
	// const [ticketList, setTicketList] = useState([]);
	const dispatch = useDispatch()
	const ticketList = useSelector(state => state.ticketList)
	console.log("en bas use selector : ", ticketList)
	console.log("data ticket : ", ticketList, "la longueu est : ", ticketList.length);

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
		} catch (error) {

		}
	}, [])

	// for (let i = 0; i < ticketList.length; i++) {
	// 	console.log("le el est : ", ticketList[i]);
	// 	if (ticketList[i].eventId === id) {
	// 		setBought(true)
	// 	}
	// }
	// console.log("le state dans card est : ", id, title, description, state)
	return (
		<>
			<div className='elcTitle'><h3> {title} </h3></div>
			<div className='elcDescription'> {description} </div>
			<div className='elcButton'>  {/* event card button : ecb */}
				{showBuyButton() && !bought && status && <button className="ecb buyButton" title='Achetter un ticket pour ce concert' onClick={(event) => handleBuy(event, id)} ><MdOutlineAccountBalanceWallet size={25} />achetter</button>}
				{showBuyButton() && bought && <button className="ecb bought" title='Achetter un ticket pour ce concert' onClick={(event) => handleBuy(event, id)} >ticket pris</button>}
				{showBuyButton() && !bought && !status && <button className="ecb participer" title='participer à ce concert' onClick={(event) => handleBuy(event, id)} >participer</button>}
				<Link to={`/eventDetail/${id}`} className="ecb infoButton">details</Link>
			</div>
			{status && <div className="price">
				Prix : <span className="colorElement"> {price} </span>
			</div>}
		</>
	)
}