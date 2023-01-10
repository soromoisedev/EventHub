import React from 'react'
import { useDispatch } from 'react-redux';

import { getInitialName, setInitialName, setUsername } from '../../redux/user';
import Axios from '../../utils';

export default function EditUser({ setWantEditUser }) {
	const [name, setName] = React.useState(localStorage.getItem("username"))
	const [email, setEmail] = React.useState(localStorage.getItem("email"))
	// console.log("l'email est : ", email);
	const [password, setPassword] = React.useState("")
	const [passwordRetry, setPasswordRetry] = React.useState("")
	// const [redirect, setRedirect] = React.useState(false)
	const requiredField = "Ce champ est réquis !"
	const nameErrorRef = React.useRef()
	const emailErrorRef = React.useRef()
	const passwordErrorRef = React.useRef()
	const passwordRetryErrorRef = React.useRef()
	// const organizerRef = React.useRef()
	// const userRef = React.useRef()
	// const [role, setRole] = React.useState("user")

	const dispatch = useDispatch()

	// function handleCloseAuth(e) {
	// 	e.preventDefault()
	// 	dispatch(setSignup(false))
	// }
	function handleChangeName(event) {
		setName(event.target.value);
		nameErrorRef.current.innerHTML = "";
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
	// function handleChangeAcountType(event) {
	// 	setRole(event.target.value)
	// }
	function handleCloseEditUser(event) {
		event.preventDefault()
		setWantEditUser(false)
	}
	function handleSubmit(event) {
		event.preventDefault()
		let containEmail = 0;
		if (!name) {
			nameErrorRef.current.innerHTML = requiredField
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
			Axios.patch("/users/update-user-info", {
				username: name,
				// email: email,
				// password: password,
				// role: localStorage.getItem("role")
			}
			).then(response => {
				const data = response.data
				console.log("le status est : ", response)
				if (response.status === 200) {
					console.log("le status est 200")
					dispatch(setUsername(data.username))
					localStorage.setItem("username", data.username)
					dispatch(setInitialName(getInitialName(data.username)))
					localStorage.setItem("initialName", getInitialName(data.username))
					setWantEditUser(false)
				}
				console.log("reponse axios est : ", response)
			})
				.catch(error => {
					console.log("erreur axios est : ", error)
					return
				})
		} catch (err) {
			console.log("L'erreur est : ", err);
		}
	}
	// console.log(organizerRef)
	return (
		// auth = authentification
		<div className="authBox">
			<div className='authHead'>
				Modifier vos information personnels
			</div>
			<form className='authFrom' >
				<div className="authBody">
					<label className="labelInput">
						<span className="labelInputSpan" >Nom et Prénom</span>
						<input type="text" required name="name" placeholder='Enter votre nom et votre prénom' value={name} onChange={handleChangeName} />
						<div ref={nameErrorRef} className='errorMessage'></div>
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
				</div>
				<div className="buttonParent" >
					<input type="submit" value="Fermer" className="myButton validateButton CloseButton" onClick={handleCloseEditUser} />
					<input type="submit" value="Enregister" className="myButton validateButton SubmitButton" onClick={handleSubmit} />
					{/* {redirect ? <Redirect to={"/login"} /> : null} */}
				</div>
			</form>
		</div>
	);
}