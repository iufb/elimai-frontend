import { customFetch } from "@/shared/api";
import { GameDTO } from "@/shared/types";

export const rAddGame = (body: GameDTO) => {
    return customFetch({ method: "POST", path: "events/", body: { json: body } });
};


