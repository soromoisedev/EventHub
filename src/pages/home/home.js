import React from "react";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import "animate.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import image from "../../images/bghomepage.jpg";

import "./home.css";

function HomePage() {
	return (
		<div className="homepage">
			<div className="presentationBox">
				<div className="presentationImage"></div>
				<div className="presentationText">
					<h1>{<span className="appName animate__animated">EventHub</span>}</h1>
					<p className="animate__bounce">
						La plus grande plateforme d'Evenementiel en ligne !!!
					</p>
					{/* <div className="presentationInfoBox">
						EventHub vous permet d'acheter vos ticket pour les evenements que vous aimez, et cela
						sans vous deplacer de chez vous.
						Il permet également aux organisateurs d'évenement de faire connaître leurs evenement
						à un plus large publique.
					</div> */}
					<div className="presentationBottomButton animate_button">
						<Link to="/eventList" className="myButton">
							Liste des evenements disponible
						</Link>
					</div>
				</div>
			</div>
			<div className="H1">
				<h1>Pourquoi EventHub ??</h1>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="card">
							<div className="card-header">
								<h5 className="card-title">GRAND PUBLIC</h5>
							</div>
							<div className="card-body">
								<p className="card-text animate_text">
									Vous pouvez consultez les évenements à venir, achetez des
									tickets ou participez à des évènements.
								</p>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="card">
							<div className="card-header">
								<h5 className="card-title">ORGANISATEURS</h5>
							</div>
							<div className="card-body">
								<p className="card-text animate_text_2">
									La plateforme idéale pour créer et publiez des évènements, et
									faire du profit. Vous pouvez aussi vous créer une communauté
									autour de vos services.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
