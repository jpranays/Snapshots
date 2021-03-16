import React from "react";

function Snapshot() {
	return (
		<h2
			style={{
				textAlign: "center",
				marginTop: 200,
				color: "black",
				textShadow: "2px 1px 1px gray",
				userSelect: "none",
			}}
		>
			Create an Awesome{" "}
			<b
				style={{
					color: "gold",
					textShadow: "none",
					WebkitTextFillColor: "gold",
					display: "block",
					fontSize: "30px",
				}}
			>
				!! Snap-Shots !!
			</b>{" "}
		</h2>
	);
}

export default Snapshot;
