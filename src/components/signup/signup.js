import React from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import './signup.css'
import { setConnect, setSignup } from '../../redux/user';

// ######################

// #####################

export default function SignUp() {
	const [name, setName] = React.useState("")
	const [contact, setContact] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [passwordRetry, setPasswordRetry] = React.useState("")
	const [redirect, setRedirect] = React.useState(false)
	const requiredField = "Ce champ est réquis !"
	const nameErrorRef = React.useRef()
	const contactErrorRef = React.useRef()
	const emailErrorRef = React.useRef()
	const passwordErrorRef = React.useRef()
	const passwordRetryErrorRef = React.useRef()
	const [role, setRole] = React.useState("user")

	const dispatch = useDispatch()
	function goConnection() {
		// console.log("han sign dabs sign");
		dispatch(setSignup(false))
		dispatch(setConnect(true))
	}

	function handleCloseAuth(e) {
		e.preventDefault()
		dispatch(setSignup(false))
	}
	function handleChangeName(event) {
		setName(event.target.value);
		nameErrorRef.current.innerHTML = "";
	}
	function handleChangeContact(e) {
		setContact(e.target.value)
		contactErrorRef.current.innerHTML = ""
	}
	function handleChangeEmail(event) {
		setEmail(event.target.value);
		emailErrorRef.current.innerHTML = "";
	}
	function handleChangePassword(event) {
		setPassword(event.target.value);
		passwordErrorRef.current.innerHTML = "";
	}
	function handleChangePasswordRetry(event) {
		setPasswordRetry(event.target.value);
		passwordRetryErrorRef.current.innerHTML = "";
	}
	function handleChangeAcountType(event) {
		setRole(event.target.value)
	}
	function handleSubmit(event) {
		console.log("role", role)
		// console.log("role value", role.current.value)
		event.preventDefault()
		let containEmail = 0;
		if (!name) {
			nameErrorRef.current.innerHTML = requiredField
			return
		}
		if (!contact) {
			contactErrorRef.current.innerHTML = requiredField
			return
		}
		if (!email) {
			emailErrorRef.current.innerHTML = requiredField
			return
		}
		for (let i = 0; i < email.length; i++) {  // verifie si le format d'email est correct
			const element = email[i];
			if (element === ".") {
				containEmail += 1;
			}
			if (element === "@") {
				containEmail += 1;
			}
		}
		if (containEmail < 2) {
			emailErrorRef.current.innerHTML = "Vous devez saisir un email correct"
			return
		}
		if (!password) {
			passwordErrorRef.current.innerHTML = requiredField
			return
		}
		if (!passwordRetry) {
			passwordRetryErrorRef.current.innerHTML = requiredField
			return
		}
		if (password !== passwordRetry) {
			passwordRetryErrorRef.current.innerHTML = "Le mot de passe saisie ne correspon pas !"
			return
		}
		try {
			if (role === "user") {
				axios.post("http://localhost:4000/user/register", {
					username: name,
					email: email,
					contacts: contact,
					password: password,
				}
				).then(response => {
					localStorage.setItem("conMessage", "Compte crée avec succes, connectez-vous ...")
					goConnection()
					console.log("reponse axios est : ", response)
				})
					.catch(error => {
						console.log("erreur axios est : ", error)
						return
					})
			} else {
				axios.post("http://localhost:4000/organizer/register", {
					username: name,
					email: email,
					contacts: contact,
					password: password,
				}
				).then(response => {
					goConnection()
					console.log("reponse axios est : ", response)
				})
					.catch(error => {
						console.log("erreur axios est : ", error)
						return
					})
			}
		} catch (err) {
			console.log("L'erreur est : ", err);
		}
	}
	return (
		// auth = authentification
		<div className="authBox">
			<div className='authHead'>
				Inscrivez-vous ici
			</div>
			<form className='authFrom' >
				<div className="authBody">
					<label className="labelInput">
						<span className="labelInputSpan" >Nom et Prénom</span>
						<input type="text" required name="name" placeholder='Enter votre nom et votre prénom' value={name} onChange={handleChangeName} />
						<div ref={nameErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >Contact</span>
						<input type="tel" required name="contact" placeholder='Entrer votre numéro de téléphone' value={contact} onChange={handleChangeContact} />
						<div ref={contactErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >E-mail</span>
						<input type="mail" required name="email" placeholder='Entrer votre e-mail' value={email} onChange={handleChangeEmail} />
						<div ref={emailErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >Mot de passe</span>
						<input type="password" required name="password" placeholder='Entrer votre mot de passe' value={password} onChange={handleChangePassword} />
						<div ref={passwordErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >Confirmer</span>
						<input type="password" required placeholder='Réssaisire le mot de passe' name="passwordRetry" value={passwordRetry} onChange={handleChangePasswordRetry} />
						<div ref={passwordRetryErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >Créer un compte en tant que :</span>
						<select className='acountType' onChange={handleChangeAcountType} >
							<option value="user" defaultValue>Utilisateur</option>
							<option value="organizer">Organisateur</option>
						</select>
					</label>
				</div>
				<div className="buttonParent" >
					<input type="submit" value="Fermer" className="myButton validateButton CloseButton" onClick={handleCloseAuth} />
					<input type="submit" value="S'inscrire" className="myButton validateButton SubmitButton" onClick={handleSubmit} />
					{redirect ? <Redirect to={"/login"} /> : null}
				</div>
			</form>
			<div className='authFoot'>
				<span>Vous avez déja un compte? </span>
				<span className='footerBoxLink' onClick={goConnection} >connectez-vous ici</span>
			</div>
		</div>
	);
}