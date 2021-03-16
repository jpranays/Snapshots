import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import { Delete } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useSelector } from "react-redux";

function Post({
	_id,
	title,
	content,
	likes,
	createdBy,
	createdAt,
	handleEdit,
	handleDelete,
	handleLike,
	image,
}: {
	_id: string;
	title: string;
	content: string;
	likes: number;
	image: any;
	createdBy: {
		_id: string;
		username: string;
	};
	createdAt: Date;
	handleEdit: Function;
	handleDelete: Function;
	handleLike: Function;
}) {
	const useStyles = makeStyles({
		root: {
			maxWidth: 350,
			width: 280,
		},
		media: {
			height: 200,
		},
		avatar: {
			backgroundColor: "#B6B6B6",
		},
	});
	const classes = useStyles();
	const { _id: user_id, isLoggedIn } = useSelector(({ user }: any) => user);

	return (
		<Card
			key={_id}
			className={classes.root}
			elevation={10}
			style={{
				borderRadius: 20,
			}}
		>
			<CardActionArea>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							{createdBy.username[0].toUpperCase()}
						</Avatar>
					}
					title={createdBy.username}
					subheader={new Date(createdAt).toLocaleDateString()}
					action={
						user_id === createdBy._id && (
							<IconButton
								aria-label="settings"
								onClick={() => {
									handleEdit(_id);
								}}
							>
								<EditIcon />
							</IconButton>
						)
					}
					onClick={(e: React.MouseEvent) => {
						e.stopPropagation();
					}}
				/>
				<CardMedia className={classes.media} title={title} image={image} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{content}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<div
					style={{
						display: "flex",
						width: "100%",
					}}
				>
					<IconButton
						aria-label="add to favorites"
						onClick={() => {
							handleLike(_id);
						}}
						disabled={!isLoggedIn ? true : false}
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
					{user_id === createdBy._id && (
						<IconButton
							style={{
								marginLeft: "auto",
							}}
							onClick={() => {
								handleDelete(_id);
							}}
							aria-label="add to favorites"
						>
							<Delete color="error" />
						</IconButton>
					)}
				</div>
			</CardActions>
		</Card>
	);
}

export default Post;
