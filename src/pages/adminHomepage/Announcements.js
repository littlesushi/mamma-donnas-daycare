import React from "react";

import { useState, useEffect } from "react";

import "./Announcements.css";

import { projectFirestore } from "../../firebase/config";

export default function Announcements() {
	const [title, setTitle] = useState(null);
	const [body, setBody] = useState(null);

	const handleSubmit = (e) =>{

		//Prevent page from refreshing when submit button is clicked
		e.preventDefault()

		if(title && body && title !== "" && body != ""){

			console.log("Submitting announcment");

			//Get current date for announcement
			const today = new Date();
			const dd = String(today.getDate()).padStart(2, '0');
			const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			const yyyy = today.getFullYear();

			//Send announcement to firestore.
			projectFirestore.collection("Announcements").add({title: title, body: body, date: (mm + '/' + dd + '/' + yyyy), timeStamp: Date.now()})
		}

		//Clear entry boxes after clicking the submit button
		document.getElementById("announcement-title-form").reset();
		setBody("");
	}

	return (
		<div className="announcments-div">
			<h2>Make an Announcement</h2>

			<form className="input-form" id="announcement-title-form">
				<input
					placeholder="Announcement Title"
					type="text"
					className="title-input"
					onChange={(e) => setTitle(e.target.value)}
				></input>
			</form>

			<textarea
				className="text-area"
				id="announcement-body-text"
				placeholder="Announcement Body"
				rows={12}
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<div>
				<button className="btn" onClick={e => handleSubmit(e)}>Send Announcement</button>
			</div>
		</div>
	);
}
