import React from "react";
import { Button } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function NavBar({ setOpen }: { setOpen: Function }) {
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
					</>
				)}
				{isLoggedIn && (
					<>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setOpen(true);
							}}
						>
							Create SnapShot
						</Button>
						<Button variant="contained" color="default" onClick={handleLogout}>
							Logout
						</Button>
					</>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
