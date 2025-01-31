import { customFetch } from "@/shared/api";
import { Game, GameDTO } from "@/shared/consts";
import { AdminTicket, Ticket } from "@/shared/types";

export const rAddGame = (body: GameDTO) => {
    return customFetch({ method: "POST", path: "events/", body: { json: body } });
};
export const rEditGame = (body: Game) => {
    return customFetch({ method: "PATCH", path: `events/${body.id}/`, body: { json: body } });
};
export const rDeleteGame = (id: number) => {
    return customFetch({ method: "DELETE", path: `events/${id}/` });
};
export const rGetGame = (id: number) => {
    return customFetch({ method: "GET", path: `events/${id}/` });
};

export const rGetGameExcel = (id: number): Promise<Blob> => {
    return customFetch({ method: "GET", path: `export-tickets/`, query: { EVENT_ID: id }, returnType: 'blob' });
};
export const rGetGames = (): Promise<Game[]> => {
    return customFetch({ method: "GET", path: "get-events" });
};

export const rBuyTicket = (body: { data: any }): Promise<any> => {
    return customFetch({ method: "POST", path: "create-ticket/", body: { json: body.data } });
};

export const rCreateAdminTicket = (body: { data: any }): Promise<AdminTicket> => {
    return customFetch({ method: "POST", path: "tickets/", body: { json: body.data } });
};
export const rCreateAdminSub = (body: { data: any }): Promise<AdminTicket> => {
    return customFetch({ method: "POST", path: "aboniments/", body: { json: body.data } });
};
export const rGetTickets = (order: string | null): Promise<Ticket[]> => {
    return customFetch({ method: "GET", path: "get-ticket/", query: { ORDER: order } });
};
export const rGetSub = (order: string | null): Promise<Ticket[]> => {
    return customFetch({ method: "GET", path: "get-aboniment/", query: { ORDER: order } });
};

export const rGetTicketsByUser = (): Promise<Ticket[]> => {
    return customFetch({ method: "GET", path: "get-tickets-by-user/" });
};

export const rGetSubByUser = (): Promise<Ticket> => {
    return customFetch({ method: "GET", path: "get-aboniment-by-user/" });
};



export const rGetTicketsCount = (gameId: number): Promise<{ message: string }> => {
    return customFetch({ method: "GET", path: "get-tickets-count/", query: { EVENT_ID: gameId } });
};
export const rGetSubscriptionCount = (): Promise<{ message: string }> => {
    return customFetch({ method: "GET", path: "get-aboniment-count/" });
};

export const rGetUserTicketLimit = (gameId: number): Promise<{ message: string }> => {
    return customFetch({ method: "GET", path: "event-limit/", query: { EVENT_ID: gameId } });
};






