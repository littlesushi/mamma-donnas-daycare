import React from "react";

import "./Announcements.css";

export default function Announcements() {
	return (
		<div className="announcments-div">
			<h2>Make an Announcement</h2>

			<form className="input-form">
				<input
					placeholder="Title"
					type="text"
					className="title-input"
				>
                </input>
			</form>
			<textarea className="text-area" rows={12} />
            <div>
                <button className="btn">Send Announcement</button>
            </div>
		</div>
	);
}
