import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
    constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

    handle(request: Request, response: Response): Response {
        const { user_id } = request.headers;

        if (Array.isArray(user_id)) {
            throw new Error("Not a single user!");
        }

        const id: string = user_id as string;

        try {
            const users = this.listAllUsersUseCase.execute({ user_id: id });

            return response.json(users);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { ListAllUsersController };
