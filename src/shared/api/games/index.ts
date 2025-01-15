import { customFetch } from "@/shared/api";
import { Game, GameDTO } from "@/shared/consts";

export const rAddGame = (body: GameDTO) => {
    return customFetch({ method: "POST", path: "events/", body: { json: body } });
};
export const rEditGame = (body: Game) => {
    return customFetch({ method: "PATCH", path: `events/${body.id}/`, body: { json: body } });
};
export const rDeleteGame = (id: number) => {
    return customFetch({ method: "DELETE", path: `events/${id}/` });
};


export const rGetGames = (): Promise<Game[]> => {
    return customFetch({ method: "GET", path: "get-events" });
};

export const rBuyTicket = (body: any): Promise<any> => {
    return customFetch({ method: "POST", path: "create-ticket/", body: { json: body } });
};





