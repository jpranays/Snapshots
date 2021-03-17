import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, TextField, Typography } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Alert } from "@material-ui/lab";

import { signUP } from "../api";
import axios from "axios";
import NavBar from "./NavBar";

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
	const [loading, setLoading] = useState<boolean>(false);
	const [OTP, setOTP] = useState<string>("");
	const [OTPSent, setOTPSent] = useState<boolean>(false);
	const dispatch = useDispatch();
	function handleChange(e: any) {
		setFormState((prevState) => {
			return { ...prevState!, [e?.target?.name!]: e?.target?.value! };
		});
	}
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		dispatch(signUP(formstate, setMessage, setLoading, setOTPSent));
	}
	const handleVerification = async () => {
		setLoading(true);
		setMessage(() => {
			return {
				class: "",
				msg: "",
			};
		});
		try {
			let {
				data: { message },
				status,
			} = await axios.post("/user/verifyuser", {
				username: formstate.username,
				email: formstate.email,
				password: formstate.password,
				OTP,
			});

			if (status === 201) {
				setLoading(false);
				setMessage({
					class: "success",
					msg: message,
				});
				setFormState({
					confirmPassword: "",
					email: "",
					password: "",
					username: "",
				});
				setOTP("");
				setOTPSent(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
			setMessage({
				class: "error",
				msg: "something went wrong",
			});
		}
	};
	return (
		<>
			<NavBar register={true} />
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
						height: "max-content",
						gap: 10,
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
					<div className="messages" style={{ width: "100%" }}>
						{loading ? (
							<Alert
								severity="info"
								style={{ width: "100%", fontWeight: "bold" }}
							>
								Loading
							</Alert>
						) : null}
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
					{OTPSent && (
						<TextField
							variant="outlined"
							label="OTP"
							type="text"
							name="otp"
							onChange={(e) => {
								setOTP(e.target.value);
							}}
							value={OTP}
							required
						/>
					)}
					{OTPSent ? (
						<>
							<Button
								color="primary"
								variant="contained"
								onClick={handleVerification}
								disabled={loading}
							>
								Verify
							</Button>
							<Button onClick={handleSubmit} disabled={loading}>
								Send Again
							</Button>
						</>
					) : (
						<Button
							color="primary"
							variant="contained"
							type="submit"
							disabled={loading}
						>
							Register
						</Button>
					)}
					<small>
						<>Already have an Account ? </>
						<>
							<b>
								<Link to="/login">Login</Link>
							</b>
						</>
					</small>
				</form>
			</div>
		</>
	);
}

export default memo(Signup);
