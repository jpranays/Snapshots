import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Link } from "react-router-dom";
function Signup() {
	const [formstate, setFormState] = useState<{
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
	}>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	function handleChange(e: any) {
		setFormState((prevState) => {
			return { ...prevState!, [e?.target?.name!]: e?.target?.value! };
		});
	}
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "80vh",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<nav
				style={{
					display: "flex",
					width: "100%",
					height: "9vh",
					alignItems: "center",
					position: "fixed",
					top: 0,
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
						to="/login"
						style={{
							textDecoration: "none",
						}}
					>
						<Button variant="contained" color="default">
							Login
						</Button>
					</Link>
				</div>
			</nav>
			<form
				style={{
					padding: 30,
					display: "flex",
					flexDirection: "column",
					gap: 15,
					justifyContent: "center",
					alignItems: "center",
					borderRadius: 15,
					boxShadow: "1px 1px 10px 1px gray",
				}}
				autoComplete="off"
				autoCorrect="off"
			>
				<Typography
					variant="h6"
					style={{
						fontFamily: "sans-serif",
						textTransform: "uppercase",
						fontWeight: "bolder",
					}}
				>
					Register
				</Typography>
				<TextField
					variant="outlined"
					label="Username"
					value={formstate?.username}
					name="username"
					onChange={handleChange}
				/>
				<TextField
					variant="outlined"
					label="Email"
					value={formstate?.email}
					name="email"
					onChange={handleChange}
				/>
				<TextField
					variant="outlined"
					label="Password"
					type="password"
					name="password"
					onChange={handleChange}
					value={formstate?.password}
				/>
				<TextField
					variant="outlined"
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					onChange={handleChange}
					value={formstate?.confirmPassword}
				/>
				<Button color="primary" variant="contained" type="submit">
					Register
				</Button>{" "}
				<small>
					<b>Already have an Account ? </b>
					<b>
						Try <Link to="/login">Login</Link>
					</b>
				</small>
			</form>
		</div>
	);
}

export default Signup;
