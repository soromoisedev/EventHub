import React from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

// import './connection.css'
import { setConnect, setInitialName, setRole, setSignup } from '../../redux/user';
import { getInitialName, setToken, setUsername } from '../../redux/user';

export default function Connection() {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const requiredField = "Ce champ est réquis !"
	const emailErrorRef = React.useRef()
	const passwordErrorRef = React.useRef()
	const conError = React.useRef()

	const dispatch = useDispatch()
	function goSignup() {
		// console.log("han sign dabs sign");
		dispatch(setConnect(false))
		dispatch(setSignup(true))
	}

	function handleCloseAuth(e) {
		e.preventDefault()
		dispatch(setConnect(false))
	}
	function handleChangeEmail(event) {
		// console.log("j'efface");
		setEmail(event.target.value);
		emailErrorRef.current.innerHTML = "";
		conError.current.innerText = ''
	}
	function handleChangePassword(event) {
		// console.log("j'efface");
		setPassword(event.target.value);
		passwordErrorRef.current.innerHTML = "";
		conError.current.innerText = localStorage.getItem("conMessage")
		localStorage.removeItem("conMessage")
	}
	function handleSubmit(event) {
		// console.log("je soumett")
		event.preventDefault()
		let containEmail = 0
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
		console.log(email, password)
		try {
			axios.post("http://localhost:4000/connexion", {
				email: email,
				password: password
			}
			).then(response => {
				// event.preventDefault()
				const data = response.data
				console.log("la data est : ", response);
				dispatch(setUsername(data.user.username))
				// dispatch(setUsername("SORO COLO MOISE"))
				localStorage.setItem("username", data.user.username)
				dispatch(setInitialName(getInitialName(data.user.username)))
				localStorage.setItem("initialName", getInitialName(data.user.username))
				localStorage.setItem("email", data.user.email)
				localStorage.setItem("role", data.user.role)
				dispatch(setRole(data.user.role))
				dispatch(setToken(data.access_token))
				localStorage.setItem("token", data.access_token)
				dispatch(setConnect(false))
				// console.log("le token est : ", response.data.access_token);
				// console.log("reponse axios est : ", response)
			})
				.catch(error => {
					console.log("erreur axios est : ", error)
					if (error.response.status === 401) {
						conError.current.innerHTML = error.response.data.message
					}
					if (error.response.status === 404) {
						conError.current.innerHTML = error.response.data.message
					}
					return
				})
		} catch (err) {
			console.log("L'erreur est : ", err, "le message est ", err.response.data.message);
		}
	}
	return (
		<div className="authBox">
			<div className='authHead'>
				Connectez vous ici
			</div>
			<div ref={conError} className="conError" > { } </div>
			<form className='authFrom' onSubmit={(event) => handleSubmit(event)}>
				<div className="authBody">
					<label className="labelInput">
						<span className="labelInputSpan" >E-mail</span>
						<input type="text" required name="email" placeholder="Entrer votre nom e-mail ici" value={email} onChange={handleChangeEmail} />
						<div ref={emailErrorRef} className='errorMessage'></div>
					</label>
					<label className="labelInput">
						<span className="labelInputSpan" >Mot de passe</span>
						<input type="password" required name="password" placeholder='Entrer votre mot de passe' value={password} onChange={handleChangePassword} />
						<div ref={passwordErrorRef} className='errorMessage'></div>
					</label>
				</div>
				<div className="buttonParent" >
					<input type="submit" value="Fermer" className="myButton validateButton CloseButton" onClick={handleCloseAuth} />
					<input type="submit" value="Se Connecter" className="myButton validateButton SubmitButton" onClick={handleSubmit} />
				</div>
			</form>
			<div className='authFoot'>
				<span>Vous n'avez pas de compte? </span>
				<span className='footerBoxLink' onClick={goSignup} >créez-en ici</span>
			</div>
		</div>
	);
}