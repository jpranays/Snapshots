export const postReducer = (
	Posts: {
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
	}[] = [],
	action: {
		type: string;
		payload: any[] | any;
	}
) => {
	switch (action.type) {
		case "FETCH":
			return [...action.payload];
		case "ADD":
			return [...Posts, action.payload];
		case "EDIT":
			return [
				...Posts.map((post) =>
					post._id === action.payload._id
						? {
								...post,
								title: action.payload.title,
								content: action.payload.content,
								image: action.payload.myImage,
						  }
						: post
				),
			];
		case "DELETE":
			return [
				...Posts.filter((post) => (post._id === action.payload ? false : true)),
			];
		case "LIKE":
			return [
				...Posts.map((post) => {
					if (post._id === action.payload) {
						return {
							...post,
							likes: post.likes + 1,
						};
					}
					return post;
				}),
			];
		default:
			return Posts;
	}
};
