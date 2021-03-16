import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const token = req.get("Authorization")?.split(" ")[1];

		let decodedData: any = jwt.verify(token!, "test");

		req._id = decodedData?._id!;
		req.username = decodedData?.username!;
		console.log(req._id, req.username);

		next();
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		console.log(err);

		res.status(err.statusCode).json(err.message);
	}
};
