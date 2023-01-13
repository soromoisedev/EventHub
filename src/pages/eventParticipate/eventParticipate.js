import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EventBoughtCard } from '../../components/eventBoughtCard/eventBoughtCard'
// import { UserEventListCard } from '../../components/userEventListCard/userEventListCard'
import { setUserEventParticipate } from '../../redux/userEventParticipate'
import Axios from '../../utils'

function EventParticipate() {
	// Liste des évènement auquels l'utilisateur souhaite participer
	// const [eventList, setEventList] = React.useState([{}])
	const eventList = useSelector(state => state.userEventParticipate)
	const dispatch = useDispatch()
	const [updatePage, setUpdatePage] = useState(true)
	React.useEffect(() => {
		// console.log("la repone est ", Axios.get("/events").then((response) => { return response.data }))
		Axios.get("/participation/get-user-participations")
			.then((response) => {
				let data = response.data
				console.log("les datas recu sont : ", data);
				dispatch(setUserEventParticipate(response.data))
				console.log("le useEffect est executé")
			})
	}, [updatePage])
	function handleRemove(id) {
		// console.log("je remove : ", id);
		Axios.post(`/participation/cancel-participation/${id}`)
			.then(response => {
				// console.log("la reponse est : ", response)
				if (response.status === 201) setUpdatePage(!updatePage)
			})
	}
	return (
		<>
			{eventList.length > 0 ?
				<div className="userEventList">
					<div className="title">Liste des évènements pour lesquels vous avez pris un ticket</div>
					<div className="eventList">
						{eventList.map((event, index) => (
							// console.log(event),
							<div className='eventListCard' key={index} >
								<EventBoughtCard id={event.id}
									// let evente = event
									title={event.evente.title}
									description={event.evente.description}
									state={event.evente.status}
									handleRemove={handleRemove}
									nbPlace={event.evente.nbPlace}
									status={event.evente.status}
									price={event.evente.price}
									location={event.evente.location}
									date={event.evente.date}
								/>
							</div>
						))}
					</div>
				</div>
				:
				<div className="EmptyList">
					Aucun ticket pris pour l'instant
				</div>
			}
		</ >

	)
}

export default EventParticipate