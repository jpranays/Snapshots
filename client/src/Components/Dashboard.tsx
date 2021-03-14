import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import { Delete } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import CardActionArea from "@material-ui/core/CardActionArea";
import CameraEnhanceOutlinedIcon from "@material-ui/icons/CameraEnhanceOutlined";

import DialogBox from "./Dialog";

function Dashboard() {
	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
		avatar: {
			backgroundColor: red[500],
		},
	});
	const classes = useStyles();

	const [open, setOpen] = useState<boolean>(false);
	const [currentPost, setCurrentPost] = useState<{
		_id: string;
		title: string;
		content: string;
		likes: number;
		image: any;
		createdAt: Date;
	}>();
	const [editing, setEditing] = useState(false);
	const posts = useSelector(
		(
			state: {
				_id: string;
				title: string;
				content: string;
				likes: number;
				image: any;
				createdAt: Date;
			}[]
		) => state
	);
	const dispatch = useDispatch();

	async function handleLike(_id: String) {
		await axios.post("/posts/updatepostlike", { _id });
		dispatch({ type: "LIKE", payload: _id });
	}
	async function handleEdit(_id: String) {
		setEditing(true);
		const {
			data: [data],
		} = await axios.get(`/posts/${_id}`);
		setCurrentPost(data);
		setOpen(true);
	}
	async function handleDelete(_id: String) {
		await axios.post("/posts/deletepost", { _id });
		dispatch({ type: "DELETE", payload: _id });
	}
	useEffect(() => {
		(async () => {
			let { data } = await axios.get("/posts/");
			dispatch({ type: "FETCH", payload: data });
		})();
	}, [dispatch]);

	return (
		<>
			{open && editing ? (
				<DialogBox
					open={open}
					editing={editing}
					setOpen={setOpen}
					setEditing={setEditing}
					_id={currentPost?._id!}
					title={currentPost?.title!}
					content={currentPost?.content!}
					image={currentPost?.image}
				/>
			) : open ? (
				<DialogBox open={open} setOpen={setOpen} />
			) : null}
			<div
				style={{
					width: "100%",
				}}
			>
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
						<Button variant="contained" color="primary">
							Sign Up
						</Button>
						<Button variant="contained" color="default">
							Login
						</Button>
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

				{posts.length ? (
					<div
						style={{
							display: "grid",
							gap: 10,
							padding: 10,
							gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
							placeContent: "center",
							placeItems: "center",
							width: "100%",
						}}
					>
						{posts.map(({ _id, title, content, image, likes, createdAt }) => (
							<Card key={_id} className={classes.root} elevation={3}>
								<CardActionArea>
									<CardHeader
										avatar={
											<Avatar aria-label="recipe" className={classes.avatar}>
												R
											</Avatar>
										}
										title="Shrimp and Chorizo Paella"
										subheader={new Date(createdAt).toLocaleString()}
										action={
											<IconButton
												aria-label="settings"
												onClick={() => {
													handleEdit(_id);
												}}
											>
												<EditIcon />
											</IconButton>
										}
										onClick={(e: React.MouseEvent) => {
											e.stopPropagation();
										}}
									/>
									<CardMedia
										className={classes.media}
										title="Paella dish"
										image={image}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{title}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{content}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<IconButton
										aria-label="add to favorites"
										onClick={() => {
											handleLike(_id);
										}}
									>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
											style={{
												marginRight: 5,
											}}
										>
											{likes}
										</Typography>
										<FavoriteIcon color="primary" />
									</IconButton>
									<IconButton
										onClick={() => {
											handleDelete(_id);
										}}
										aria-label="add to favorites"
									>
										<Delete />
									</IconButton>
								</CardActions>
							</Card>
						))}
					</div>
				) : (
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
						<h2
							style={{
								color: "royalblue",
								textShadow: "none",
								WebkitTextStroke: "1px royalblue",
								WebkitTextFillColor: "transparent",
							}}
						>
							!! Snap-Shots !!
						</h2>{" "}
					</h2>
				)}
			</div>
		</>
	);
}

export default Dashboard;
