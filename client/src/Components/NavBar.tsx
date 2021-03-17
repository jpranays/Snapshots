import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";

function NavBar({ setOpen }: { setOpen?: Function }) {
	const { isLoggedIn } = useSelector(({ user }: any) => user);

	const dispatch = useDispatch();

	function handleLogout() {
		dispatch({ type: "LOGOUT" });
	}

	return (
		<nav
			style={{
				display: "flex",
				width: "100%",
				height: "7vh",
				alignItems: "center",
				position: "sticky",
				top: 0,
				zIndex: 1,
			}}
			className="background"
		>
			<div
				className="header-container"
				style={{
					textAlign: "left",
					marginLeft: "5px",
					marginRight: "auto",
					color: "black",
				}}
			>
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
				{!isLoggedIn && (
					<>
						<Link
							to="/signup"
							style={{
								textDecoration: "none",
							}}
						>
							<Button variant="contained" color="secondary">
								Register
							</Button>
						</Link>
						<Link
							to="/login"
							style={{
								textDecoration: "none",
							}}
						>
							<Button variant="text" color="default">
								Login
							</Button>
						</Link>
					</>
				)}
				{isLoggedIn && (
					<>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => {
								setOpen!(true);
							}}
							title="Create SnapShot !"
						>
							<AddIcon />
						</Button>
						<Button variant="contained" color="default" title="Logout">
							<ExitToAppIcon onClick={handleLogout} />
						</Button>
					</>
				)}
			</div>
		</nav>
	);
}

export default memo(NavBar);
