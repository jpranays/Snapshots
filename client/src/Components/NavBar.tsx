import { Button } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";

import React from "react";
import { Link } from "react-router-dom";

function NavBar({ setOpen }: { setOpen: Function }) {
	return (
		<nav
			style={{
				display: "flex",
				width: "100%",
				height: "9vh",
				alignItems: "center",
			}}
		>
			<div
				className="header-container"
				style={{
					textAlign: "left",
					marginLeft: "5px",
					marginRight: "auto",
					color: "royalblue",
				}}
			>
				{/* <h4>SnapShot</h4> */}
				<CameraEnhanceOutlinedIcon elevation={3} />
			</div>
			<div
				className="button-container"
				style={{
					display: "flex",
					gap: 15,
					marginRight: 10,
				}}
			>
				<Link
					to="/signup"
					style={{
						textDecoration: "none",
					}}
				>
					<Button variant="contained" color="default">
						Register
					</Button>
				</Link>
				<Link
					to="/login"
					style={{
						textDecoration: "none",
					}}
				>
					<Button variant="contained" color="default">
						Login
					</Button>
				</Link>
				<Button
					variant="outlined"
					color="primary"
					onClick={() => {
						setOpen(true);
					}}
				>
					Create SnapShot
				</Button>
			</div>
		</nav>
	);
}

export default NavBar;
