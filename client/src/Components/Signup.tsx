import React, { useState } from "react";
import { Button, Color, TextField, Typography } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from "@material-ui/lab";
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
	const [message, setMessage] = useState<{
		class: any;
		msg: string;
	}>({
		class: "",
		msg: "",
	});
	function handleChange(e: any) {
		setFormState((prevState) => {
			return { ...prevState!, [e?.target?.name!]: e?.target?.value! };
		});
	}
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			const {
				data: { message },
				status,
			} = await axios.post("/user/signup/", formstate);
			setFormState({
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			if (status === 201) {
				setMessage({
					class: "success",
					msg: message,
				});
			}
		} catch (err) {
			console.log(err);
			setMessage({
				class: "error",
				msg: "Something Went Wrong",
			});
		}
	}

	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "90vh",
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
				onSubmit={handleSubmit}
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
				<div className="messages">
					{message.msg ? (
						<Alert severity={message.class}>{message.msg}</Alert>
					) : null}
				</div>
				<TextField
					variant="outlined"
					label="Username"
					value={formstate?.username}
					name="username"
					onChange={handleChange}
					required
				/>
				<TextField
					variant="outlined"
					label="Email"
					value={formstate?.email}
					name="email"
					onChange={handleChange}
					required
				/>
				<TextField
					variant="outlined"
					label="Password"
					type="password"
					name="password"
					onChange={handleChange}
					value={formstate?.password}
					required
				/>
				<TextField
					variant="outlined"
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					onChange={handleChange}
					value={formstate?.confirmPassword}
					required
				/>
				<Button color="primary" variant="contained" type="submit">
					Register
				</Button>
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
