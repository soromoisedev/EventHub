import React from "react";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

import './home.css'

function HomePage() {
	return (
		<div className="homepage">
			<div className="presentationBox">
				<div className="presentationImage" >
				</div>
				<div className='presentationText'>
					<h1>{<span className="appName">EventHub</span>}, plateforme d'evenement en ligne</h1>
					<div className="presentationInfoBox">
						EventHub vous permet d'acheter vos ticket pour les evenements que vous aimez, et cela
						sans vous deplacer de chez vous.
						Il permet également aux organisateurs d'évenement de faire connaître leurs evenement
						à un plus large publique.
					</div>
					<div className="presentationBottomButton">
						<Link to="/eventList" className="myButton" >Liste des evenements disponible</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage