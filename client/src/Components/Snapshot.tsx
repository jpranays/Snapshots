import React from "react";

function Snapshot() {
	return (
		<h2
			style={{
				textAlign: "center",
				marginTop: 200,
				color: "black",
				textShadow: "2px 1px 1px black",
				WebkitTextStroke: "1px black",
				WebkitTextFillColor: "transparent",
				userSelect: "none",
			}}
		>
			Create an Awesome{" "}
			<b
				style={{
					color: "royalblue",
					textShadow: "none",
					WebkitTextStroke: "1px royalblue",
					WebkitTextFillColor: "transparent",
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
