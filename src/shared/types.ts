export const GameStatus = ['Активный', 'Неактивный', 'Завершен']
export type GameDTO = Omit<Game, "id" | "created_at">
export type Game = {
    id: number; // Assuming `id` is a unique identifier, often a number
    name_kz: string; // Assuming `name_kz` is a string (Kazakh name)
    name_ru: string; // Assuming `name_ru` is a string (Russian name)
    event_date: Date | string// Can be a string (ISO format) or a Date object
    created_at: string  // Can be a string (ISO format) or a Date object
    status: string  // Depending on the status type (string, boolean, or enum)
};

