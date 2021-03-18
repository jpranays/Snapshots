import React, { FormEvent, useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addPost, editPost } from "../api/api";

function DialogBox({
	open,
	setOpen,
	editing,
	setEditing,
	currentPost,
}: {
	open: boolean;
	setOpen: Function;
	setEditing?: Function;
	editing?: boolean;
	currentPost?: any;
}) {
	const [formState, setFormState] = useState<{
		title: string;
		content: string;
		image: File | null;
	}>({
		title: "",
		content: "This Was A Really Nice Day !",
		image: null,
	});
	useEffect(() => {
		if (editing) {
			setFormState({
				title: currentPost?.title!,
				content: currentPost?.content!,
				image: null,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const dispatch = useDispatch();
	const [imageSelected, setImageSelected] = useState(false);
	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", formState.title);
		formData.append("content", formState.content);
		formData.append(
			"file",
			formState.image ? formState.image : currentPost?.image
		);
		formData.append("_id", currentPost?._id!);

		if (editing) {
			formData.append("prevImage", currentPost?.image);

			if (formState.image) {
				dispatch(editPost(currentPost?._id!, formState, formData));
			} else {
				formData.append("prevImage", "");
				dispatch(editPost(currentPost?._id!, formState, formData));
			}
			setEditing!(false);
		} else {
			dispatch(addPost(formData));
		}
		setOpen(false);
	}
	return (
		<Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
			<DialogTitle id="form-dialog-title">
				{editing ? "Update SnapShot" : "SnapShot"}
			</DialogTitle>
			<DialogContent>
				<form
					style={{
						display: "flex",
						gap: 15,
						flexDirection: "column",
					}}
					autoComplete="off"
					autoCorrect="off"
					encType="multipart/form-data"
					onSubmit={handleSubmit}
				>
					<TextField
						id="outlined-basic"
						label="Title"
						variant="outlined"
						style={{
							width: "100%",
						}}
						value={formState.title}
						onChange={(e) => {
							setFormState((prevState) => {
								return {
									...prevState,
									title: e.target.value,
								};
							});
						}}
						focused
						required
					/>
					<TextField
						id="outlined-multiline-static"
						label="Content"
						multiline
						rows={4}
						variant="outlined"
						style={{
							width: "100%",
						}}
						value={formState.content}
						onChange={(e) => {
							setFormState((prevState) => {
								return {
									...prevState,
									content: e.target.value,
								};
							});
						}}
						required
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 5,
						}}
					>
						<Button
							variant="outlined"
							component="label"
							color="primary"
							style={{
								width: "50%",
							}}
						>
							{imageSelected ? "Image Selected" : "Upload Image"}
							<input
								type="file"
								hidden
								onChange={(e) => {
									setFormState((prevState) => {
										return {
											...prevState,
											image: e.target.files![0],
										};
									});
									setImageSelected(true);
								}}
								accept="image/*"
							/>
						</Button>
						<Typography>
							{imageSelected ? formState?.image?.name! : null}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
						}}
					>
						<Button
							color="secondary"
							variant="outlined"
							onClick={() => {
								if (editing) {
									setEditing!(false);
								}
								setOpen(false);
							}}
							style={{
								marginRight: "auto",
							}}
							type="button"
						>
							Cancel
						</Button>
						<Button color="primary" variant="contained" type="submit">
							{editing ? "Update" : "Create"}
						</Button>
					</div>
				</form>
			</DialogContent>
			<DialogActions></DialogActions>
		</Dialog>
	);
}

export default memo(DialogBox);
