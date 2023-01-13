import React, { useRef, useState } from 'react';
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import './eventList.css'
import { EventListCard } from '../../components/eventListCard/eventListCard';
import { setEvent } from '../../redux/eventList';
import Axios from '../../utils';

function EventList() {
	const eventList = useSelector(state => state.eventList)
	const dispatch = useDispatch()
	const [showSort, setShowSort] = React.useState(false)
	const [searchData, setSearchData] = React.useState("")
	const [data, setData] = React.useState(false)
	const [status, setStatus] = useState("");
	const [limit, setLimit] = useState(0);

	const showAll = useRef()
	const showGratis = useRef()
	const showPaying = useRef()
	const [search, setSearch] = React.useState(false)
	React.useEffect(() => {
		// console.log("la repone est ", Axios.get("/events").then((response) => { return response.data }))
		let request = "/events/get-all-events?"
		let separator = ""
		// let add = ""
		if (status === true) {
			request = request + "status=true"
			separator = "&"
		}
		if (status === false) {
			request = request + separator + "status"
			separator = "&"
		}
		// if(status === ""){
		// 	request = request + "status=true"
		// }
		if (searchData) {
			request = request + separator + "search=" + searchData
			separator = "&"
		}
		if (limit !== 0) {
			console.log("je fait la limite : ", limit);
			request = request + separator + "limit=" + limit
			separator = "&"
		}
		console.log("la requette final est : ", request);
		Axios.get(request)
			.then((response) => {
				// setData(response.data)
				console.log("les datas recu sont : ", response.data);
				dispatch(setEvent(response.data))
			})
	}, [data])
	// console.log("la liste des evenement : ", eventList)
	function handleSearch() {
		// console.log(searchData);
		setSearchData(searchData)
		setData(!data)
	}
	function handleCardClick(event) {
		// console.log(event)
	}

	function handleShowAll(e) {
		e.preventDefault()
		showAll.current.classList.add("select")
		showGratis.current.classList.remove("select")
		showPaying.current.classList.remove("select")
		// setSearch(!search)
		setStatus("")
		setData(!data)
	}
	function handleShowGratis(e) {
		e.preventDefault()
		showAll.current.classList.remove("select")
		showGratis.current.classList.add("select")
		showPaying.current.classList.remove("select")
		// setSearch(!search)
		setStatus(false)
		setData(!data)
	}
	function handleShowPaying(e) {
		e.preventDefault()
		showAll.current.classList.remove("select")
		showGratis.current.classList.remove("select")
		showPaying.current.classList.add("select")
		// setSearch(!search)
		setStatus(true)
		setData(!data)
	}
	function handleSubmit(e) {
		e.preventDefault()
		console.log("je soumet")
		setSearchData(searchData)
		setData(!data)
	}
	function handleChange(e) {
		setSearchData(e.target.value)
		if (searchData) {
			setData(!data)
		}
	}
	return (
		<div className="eventList">

			<div className="fixBoxSearch">
				<div className="eventListTitle">Liste des évènements</div>
				<div className="eventListInfo">Rechercher des évènements dans la bare de récherche ou sélectionner un évènements pour voire ses détails </div>
				<div className="searchDiv">
					<div className='inputSearchBox'>
						<form onSubmit={handleSubmit}>
							<input className="" type={"text"} placeholder="Entrer le nom de l'évènement" onChange={handleChange} />
						</form>
						<div className='searchIcon' onClick={handleSearch}>
							<MdSearch />
						</div>
					</div>
					<div className="sortBy">
						<div className="labelInputSpanDiv">Évènements : </div>
						<div className="sortByPayment">
							<button ref={showAll} onClick={handleShowAll} className="showAll select">tous</button>
							<button ref={showPaying} onClick={handleShowPaying} className="paying">payant</button>
							<button ref={showGratis} onClick={handleShowGratis} className="gratis">gratuit</button>
						</div>
					</div>
				</div>
			</div>
			<div className='contentEventList'>
				{eventList ? eventList?.map((event) => (
					// console.log("le status dans grand est : ", event.status),
					<div className='eventListCard' key={event.id} onClick={() => handleCardClick(event.id)} >
						<EventListCard id={event.id}
							title={event.title}
							description={event.description}
							status={event.status}
							price={event.price}
							data={data}
							setData={setData}
						/>
					</div>
				)) : <h1>je pass dans events list</h1>}
			</div>
		</div >
	)
}

export default EventList;