
import { notifications } from "@mantine/notifications";

export const showErrorNotification = ({
    title,
    message,
}: {
    title: string;
    message: string;
}) => {
    notifications.show({
        title,
        message,
        color: "red.6",
    });
};
export const showSuccessNotification = ({
    title,
    message,
}: {
    title: string;
    message: string;
}) => {
    notifications.show({
        title,
        message,
        color: "green.6",
    });
};
