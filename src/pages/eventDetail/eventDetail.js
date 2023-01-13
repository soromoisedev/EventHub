import React from 'react'
import { MdChevronLeft, MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Axios from '../../utils'

import { setConnect } from '../../redux/user'
import './eventDetail.css'
import showBuyButton from '../../myFunction'

export function EventDetail() {
	const { id } = useParams()
	// console.log("l'id est : ", id);
	// const result = useSelector(state => state.eventList)
	const { title, description, date, status, location, price, nbPlace } = useSelector(state => state.eventList)?.filter(el => el["id"] === Number(id))[0]
	const [bought, setBought] = React.useState(false)
	const dispatch = useDispatch()
	const role = useSelector(state => state.user.role)
	let [eventDate, eventHour] = date.split("T")
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
					// console.log("l'erreur catch est : ", err.response.status);
					localStorage.setItem("conMessage", "Vous devez être connecté pour pouvoir achetter un ticket !")
					dispatch(setConnect(true))
					return
				})
		} catch (error) {
			console.log("l'erreur est : ", error);
			console.log("l'erreur de de add : ", error.response.status)
		}
	}
	return (
		<div className="eventDetail">
			<button className="returnEventDetailButton" ><Link to="/eventList" className="returnEventDetail" defaultValue={"la val def"} ><MdChevronLeft size={25} />  retour</Link></button>
			<div className="eventDetailCard">
				<div className="title">{title}</div>
				<div className="description">{description}</div>
				<div className="frexLine">
					<div className="location">
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
							Lieu :
						</span> <span className="colorElement" >{location}</span>
					</div>
					<div className="date">
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
							Date :
						</span> <span className="colorElement" >{eventDate}</span> <span style={{ fontStyle: "italic", fontWeight: "normal" }} >à </span><span className="colorElement" >{eventHour}</span>
					</div>
					<div className="nbPlace">
						<span style={{ fontStyle: "italic", fontWeight: "normal" }} >
							Place :
						</span> <span className="colorElement" >{nbPlace}</span>
					</div>
				</div>
				{status && <div className="price">
					Prix : <span className="colorElement"> {price} </span>
				</div>}
				<div className="buttonEventDetail">
					{(role === "user" || !role) && !bought && status && <div className="buyButton" onClick={(event) => handleBuy(event, id)}>achetter <MdOutlineAccountBalanceWallet size={25} /> </div>}
					{(role === "user" || !role) && !bought && !status && <div className="ecb participer" title='participer à ce concert' onClick={(event) => handleBuy(event, id)}>participer</div>}
					{(role === "user" || !role) && bought && <div className="ecb bought" title='Achetter un ticket pour ce concert' onClick={(event) => handleBuy(event, id)} >ticket pris</div>}
					{/* {role === "superAdmin" && <button className="ecb desactivate blockEvent" onClick={() => handleDesactivateEvent(id)} >bloquer l'évènement</button>} */}
				</div>
			</div >
		</div>
	)
}