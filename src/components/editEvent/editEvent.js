import React, { useEffect } from 'react';
import axios from 'axios';

// import './createEvent.css'
import { useSelector } from 'react-redux';
import Axios from '../../utils';

function EditEvent({ id, setEdit, update, setUpdate }) {
	const [label, setLabel] = React.useState("")
	const [description, setDescription] = React.useState("")
	const [date, setDate] = React.useState("")
	const [nbrPlace, setNbrPlace] = React.useState(0)
	const [eventPrice, setEventPrice] = React.useState(0)
	const [location, setLocation] = React.useState("")
	const [status, setStatus] = React.useState(true)
	const labelErrorRef = React.useRef()
	const descriptionlErrorRef = React.useRef()
	const dateErrorRef = React.useRef()
	const nbrPlaceErrorRef = React.useRef()
	const payingButton = React.useRef()
	const gratisButton = React.useRef()
	const eventPriceRef = React.useRef()
	const eventPriceErrorRef = React.useRef()
	const locationErrorRef = React.useRef()
	const requiredField = "Ce champ est réquis !"


	function handleChangeLabel(event) {
		setLabel(event.target.value);
		labelErrorRef.current.innerHTML = "";
	}
	function handleChangeDescription(event) {
		setDescription(event.target.value);
		descriptionlErrorRef.current.innerHTML = "";
	}
	function handleChangeDate(event) {
		setDate(event.target.value);
		// console.log("landle change de date : ", date);
		dateErrorRef.current.innerHTML = "";
	}
	function handlePaying(e) {
		e.preventDefault()
		payingButton.current.classList.add("select")
		gratisButton.current.classList.remove("select")
		setStatus(true)
		eventPriceRef.current.disabled = false
	}
	function handleGratis(e) {
		e.preventDefault()
		payingButton.current.classList.remove("select")
		gratisButton.current.classList.add("select")
		setStatus(false)
		eventPriceRef.current.disabled = true
	}
	function handleNbrPlace(e) {
		setNbrPlace(e.target.value)
		nbrPlaceErrorRef.current.innerHTML = ""
	}
	function handlePrice(e) {
		setEventPrice(e.target.value)
		eventPriceErrorRef.current.innerHTML = ""
	}
	function handleCancel(e) {
		e.preventDefault()
		setUpdate(!update)
		setEdit(false)
	}
	function handleChangeLocation(event) {
		setLocation(event.target.value)
		locationErrorRef.current.innerHTML = ""
	}
	async function handleSubmit(event) {
		event.preventDefault()
		let lieldFull = true
		if (!label) {
			labelErrorRef.current.innerHTML = requiredField
			lieldFull = false
		}
		if (!description) {
			descriptionlErrorRef.current.innerHTML = requiredField
			lieldFull = false
		}
		if (!date) {
			dateErrorRef.current.innerHTML = requiredField
			lieldFull = false
		}
		if (!nbrPlace || nbrPlace <= 0) {
			nbrPlaceErrorRef.current.innerHTML = "le nombre de place doit-être supperieur à 0"
			lieldFull = false
		}
		if (status && (!eventPrice || eventPrice <= 0)) {
			eventPriceErrorRef.current.innerHTML = "le prix d'un évènement payant doit-être supperieur à 0"
			lieldFull = false
		}
		if (!location) {
			locationErrorRef.current.innerHTML = requiredField
			lieldFull = false
		}
		if (!lieldFull) {
			return
		}
		try {
			await Axios.patch(`/events/update-event/${id}`, {
				title: label,
				description: description,
				location: location,
				date: date,
				price: status ? eventPrice : 0,
				nbPlace: nbrPlace,
				status: status,
			}).then(resp => {
				setUpdate(!update)
				setEdit(false)
			})

		} catch (err) {
			console.log("L'erreur est : ", err);
			return
		}
	}
	useEffect(() => {
		try {
			Axios.get(`/events/get-one/${id}`)
				.then(resp => {
					const data = resp.data
					setLabel(data.title)
					setDescription(data.description)
					setDate(data.date)
					setLocation(data.location)
					setEventPrice(data.price)
					setNbrPlace(data.nbPlace)
					setStatus(data.status)
					if (data.status) {
						payingButton.current.classList.add("select")
						gratisButton.current.classList.remove("select")
						setStatus(true)
						eventPriceRef.current.disabled = false
					} else {
						payingButton.current.classList.remove("select")
						gratisButton.current.classList.add("select")
						setStatus(false)
						eventPriceRef.current.disabled = true
					}
					console.log("la reponse est : ", resp)
				})
		} catch (error) {
			console.log("Erreur de recuperation des information de l'évènement, l'erreur est : ", error)
		}
	}, []);
	return (
		<div className="createEventBox">
			<div className='createEventHead'>
				Modification de l'évènement
			</div>
			<form className='createEventFrom' >
				<div className="createEventBody">
					<label className="labelInput">
						<span className="labelInputSpan" >titre</span>
						<input className="newEventLabel" type="text" required name="label" placeholder="Enter le libélé de l'évènement ici" value={label} onChange={handleChangeLabel} />
						<div ref={labelErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >lieu</span>
						<input className="newEventLabel" type="text" required name="label" placeholder="Saisir le lieu où se tiendra l'évènement" value={location} onChange={handleChangeLocation} />
						<div ref={locationErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >Description</span>
						<textarea className="descriptionNewEvent" type="text" required name="description" placeholder="Saisir une description de l'évènement ..." value={description} onChange={handleChangeDescription}>soro</textarea>
						<div ref={descriptionlErrorRef} className='errorMessage'></div>
					</label>
					<div className="dateStatusNbrPlace">
						<label className="labelInput">
							<span className="labelInputSpan" >La date et l'heur de l'évènement</span>
							<input type={"datetime-local"} required name="date" placeholder="Entrer la date et l'heur de l'évènement" value={date} onChange={handleChangeDate} />
							<div ref={dateErrorRef} className='errorMessage'></div>
						</label>
						<label className="labelInput">
							<span className="labelInputSpan" >Le nombre de place</span>
							<input type="number" min={0} required name="nbrplace" value={nbrPlace} onChange={handleNbrPlace} />
							<div ref={nbrPlaceErrorRef} className='errorMessage'></div>
						</label>
					</div>
					<div className="dateStatusNbrPlace">
						<label className="labelInput ">
							<span className="labelInputSpan" >l'évènement est-il gratuit ou payant ?</span>
							<div className="payment">
								<button ref={payingButton} className="paying select" onClick={handlePaying} >payant</button>
								<button ref={gratisButton} className="gratis" onClick={handleGratis} >gratuit</button>
							</div>
						</label>
						<label className="labelInput">
							<span className="labelInputSpan" >Prix du ticket</span>
							<input ref={eventPriceRef} type="number" min={0} required name="nbrplace" value={eventPrice} onChange={handlePrice} />
							<div ref={eventPriceErrorRef} className='errorMessage'></div>
						</label>
					</div>
				</div>
				<div className="buttonParent" >
					<button id="saveEventButton" className='myButton aSubmitButton CloseButton' onClick={handleCancel} >Annuler</button>
					<button id="saveEventButton" className='myButton aSubmitButton validateButton' onClick={handleSubmit} > Enregister </button>
				</div>
			</form>
		</div>
	);
}

export default EditEvent;
