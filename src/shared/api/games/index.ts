import { customFetch } from "@/shared/api";
import { Game, GameDTO } from "@/shared/consts";
import { Ticket } from "@/shared/types";

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

export const rBuyTicket = (body: { data: any, locale: string }): Promise<any> => {
    return customFetch({ method: "POST", path: "create-ticket/", body: { json: body.data }, query: { locale: body.locale } });
};

export const rGetTicket = (order: string | null): Promise<Ticket> => {
    return customFetch({ method: "GET", path: "get-ticket/", query: { ORDER: order } });
};

export const rGetTicketsCount = (gameId: number): Promise<{ message: string }> => {
    return customFetch({ method: "GET", path: "get-tickets-count/", query: { EVENT_ID: gameId } });
};





