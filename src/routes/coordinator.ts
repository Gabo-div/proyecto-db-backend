import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { coordinatorRepository } from "../dependencies";
import { userRepository } from "../dependencies";
import { authValidator } from "@/utils/authValidator";

const coordinator = new Hono();

coordinator.get("/me", async (c) => {
	const userCoordinator = await authValidator(userRepository, c, "coordinator");

	const coordinatorData = await coordinatorRepository.getCoordinatorByUserId(
		userCoordinator.id.toString(),
	);

	return c.json(coordinatorData);
});

coordinator.get("/:id", async (c) => {
	const id = c.req.param("id");
	const foundCoordinator =
		await coordinatorRepository.getCoordinatorByUserId(id);
	if (!foundCoordinator) {
		throw new HTTPException(404, { message: "Coordinator not found" });
	}

	return c.json(foundCoordinator);
});

export default coordinator;
