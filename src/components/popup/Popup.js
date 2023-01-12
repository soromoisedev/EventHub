import React from 'react';

import "./popup.css"

function Popup({ title, description, confirmText, cancelText, confirmFunction, cancelFunction }) {
	return (
		<div className="blur">
			<div className="confirmPopup">
				<div className='popupHead'> {title} </div>
				<div className="titlePopup">{description}</div>
				<div className="popupButtons">
					<button className="ecb activate popupConfirmButton" onClick={confirmFunction}> {confirmText} </button>
					<button className="ecb desactivate popupCancelButton" onClick={cancelFunction}>{cancelText}</button>
				</div>
			</div>
		</div>
	);
}

export default Popup;
