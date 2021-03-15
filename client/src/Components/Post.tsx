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

function Post({
	_id,
	title,
	content,
	likes,
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
	createdAt: Date;
	handleEdit: Function;
	handleDelete: Function;
	handleLike: Function;
}) {
	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 200,
		},
		avatar: {
			backgroundColor: red[500],
		},
	});
	const classes = useStyles();
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
				</div>
			</CardActions>
		</Card>
	);
}

export default Post;
