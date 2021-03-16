import React, { useState, useEffect, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import DialogBox from "./Dialog";
import NavBar from "./NavBar";
import Snapshot from "./Snapshot";
import Post from "./Post";
import { allPosts, deletePost, editPostLike } from "../api";

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
	const posts: {
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
	}[] = useSelector(
		({
			post,
		}:
			| {
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
			  }[]
			| any) => post
	);
	const dispatch = useDispatch();
	const handleLike = useCallback(
		(_id: string) => {
			dispatch(editPostLike(_id));
		},
		[dispatch]
	);
	const handleEdit = useCallback(async (_id: String) => {
		setEditing(true);
		const {
			data: [data],
		} = await axios.get(`/posts/${_id}`, {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("profile")!).token
				}`,
			},
		});
		setCurrentPost(data);
		setOpen(true);
	}, []);
	const handleDelete = useCallback(
		(_id: string) => {
			dispatch(deletePost(_id));
		},
		[dispatch]
	);
	useEffect(() => {
		dispatch(allPosts());
	}, [dispatch]);

	const SetOpen = useCallback(setOpen, [setOpen]);
	const SetEditing = useCallback(setEditing, [setEditing]);

	return (
		<>
			<NavBar setOpen={SetOpen} />
			{open && editing ? (
				<DialogBox
					open={open}
					editing={editing}
					setOpen={SetOpen}
					setEditing={SetEditing}
					currentPost={currentPost}
				/>
			) : open ? (
				<DialogBox open={open} setOpen={SetOpen} />
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
							marginTop: 20,
							gap: 10,
							padding: 10,
							gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
							placeContent: "center",
							placeItems: "center",
							width: "100%",
						}}
					>
						{posts.map(
							({ _id, title, content, image, likes, createdAt, createdBy }) => (
								<Post
									key={_id}
									_id={_id}
									title={title}
									content={content}
									image={image}
									likes={likes}
									createdBy={createdBy}
									createdAt={createdAt}
									handleDelete={handleDelete}
									handleEdit={handleEdit}
									handleLike={handleLike}
								/>
							)
						)}
					</div>
				) : (
					<Snapshot />
				)}
			</div>
		</>
	);
}

export default memo(Dashboard);
