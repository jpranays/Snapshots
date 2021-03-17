import React, { memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { Button, TextField, Typography } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Alert } from "@material-ui/lab";

import { signIN } from "../api";
import NavBar from "./NavBar";

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
		dispatch(signIN(formstate, setFormState, setMessage, history));
	}
	return (
		<>
			<NavBar login={true} />
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "90vh",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
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

					<Button color="primary" variant="contained" type="submit">
						Login
					</Button>
					<small>
						<>No Account ? </>
						Try{" "}
						<b>
							<Link to="/signup">Register</Link>
						</b>
					</small>
				</form>
			</div>
		</>
	);
}

export default memo(Login);
