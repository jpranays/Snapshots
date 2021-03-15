import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import DialogBox from "./Dialog";
import NavBar from "./NavBar";
import Snapshot from "./Snapshot";
import Post from "./Post";

function Dashboard() {
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
			<NavBar setOpen={setOpen} />
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
							<Post
								_id={_id}
								title={title}
								content={content}
								image={image}
								likes={likes}
								createdAt={createdAt}
								handleDelete={handleDelete}
								handleEdit={handleEdit}
								handleLike={handleLike}
								key={_id}
							/>
						))}
					</div>
				) : (
					<Snapshot />
				)}
			</div>
		</>
	);
}

export default Dashboard;
