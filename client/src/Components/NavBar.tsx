import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";

function NavBar({
	setOpen,
	register,
	login,
}: {
	setOpen?: Function;
	register?: boolean;
	login?: boolean;
}) {
	const { isLoggedIn } = useSelector(({ user }: any) => user);

	const history = useHistory();

	const dispatch = useDispatch();

	function handleLogout() {
		dispatch({ type: "LOGOUT" });
	}

	return (
		<>
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
						display: "flex",
						alignItems: "center",
						marginLeft: "15px",
						marginRight: "auto",
						color: "black",
						transform: "scale(2)",
						cursor: "pointer",
					}}
				>
					<CameraEnhanceOutlinedIcon
						elevation={3}
						onClick={() => {
							history.push("/");
						}}
					/>
				</div>
				<div
					className="button-container"
					style={{
						display: "flex",
						gap: 15,
						marginRight: 10,
					}}
				>
					{register && (
						<>
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
					{login && (
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
					)}
					{!login && !register && (
						<>
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
									<Button
										variant="contained"
										color="default"
										title="Logout"
										onClick={handleLogout}
									>
										<ExitToAppIcon />
									</Button>
								</>
							)}
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
						</>
					)}
				</div>
			</nav>
		</>
	);
}

export default memo(NavBar);
