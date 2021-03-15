import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";

function Login() {
	const [formstate, setFormState] = useState<{
		username: string;
		password: string;
	}>({
		username: "",
		password: "",
	});
	const [message, setMessage] = useState<{
		class: any;
		msg: string;
	}>({
		class: "",
		msg: "",
	});
	const history = useHistory();
	const dispatch = useDispatch();
	function handleChange(e: any) {
		setFormState((prevState) => {
			return { ...prevState!, [e?.target?.name!]: e?.target?.value! };
		});
	}
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			const {
				data: { token, username, _id },
				status,
			} = await axios.post("/user/signin/", formstate);
			setFormState({
				username: "",
				password: "",
			});
			if (status === 200) {
				dispatch({
					type: "AUTH",
					payload: { token, username, _id, isLoggedIn: true },
				});
				history.push("/");
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
						to="/signup"
						style={{
							textDecoration: "none",
						}}
					>
						<Button variant="contained" color="default">
							Register
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
					Login
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
				/>

				<TextField
					variant="outlined"
					label="Password"
					type="password"
					name="password"
					onChange={handleChange}
					value={formstate?.password}
				/>

				<Button color="primary" variant="contained" type="submit">
					Login
				</Button>
				<small>
					<b>No Account ? </b>
					<b>
						Try <Link to="/signup">Register</Link>
					</b>
				</small>
			</form>
		</div>
	);
}

export default Login;
