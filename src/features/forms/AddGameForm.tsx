'use client'
import { rAddGame } from "@/shared/api/games";
import { GameDTO, GameStatus } from "@/shared/types";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const AddGameForm = ({ close }: { close: () => void }) => {
    const {
        handleSubmit,
        register,
        getValues,
        control,
        formState: { errors },
    } = useForm<GameDTO>();
    const { mutate, isLoading, isError } = useMutation({
        mutationKey: ["addGame"],
        mutationFn: rAddGame,
        onSuccess: (data) => {
            close()
        },
    });
    const onSubmit: SubmitHandler<GameDTO> = (data) => {
        console.log(data)
        mutate({ ...data, event_date: dayjs(data.event_date).format("YYYY-MM-DD") })
    };


    return <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p={10}>
            <TextInput
                error={errors["name_ru"]?.message}
                {...register("name_ru", { required: "Обязательное поле" })}
                placeholder={'Название RU'}
                label={'Название RU'}

            />
            <TextInput
                error={errors["name_kz"]?.message}
                {...register("name_kz", { required: "Обязательное поле" })}
                placeholder={'Название KZ'}
                label={'Название KZ'}
            />
            <Controller
                control={control}
                name="event_date"
                rules={{ required: "Обязательное поле" }}
                render={({ field: { value, onChange } }) =>
                    <DatePickerInput
                        error={errors["event_date"]?.message}
                        lang="RU"
                        w={150}
                        label="Дата"
                        placeholder="Выберите дату"
                        value={value as Date}
                        onChange={onChange}
                    />

                }
            />
            <Controller
                control={control}
                name="status"
                rules={{ required: "Обязательное поле" }}
                render={({ field: { value, onChange } }) =>
                    <Select
                        error={errors["status"]?.message}
                        data={GameStatus}
                        label="Статус"
                        placeholder="Выберите статус"
                        value={value}
                        onChange={onChange}
                    />

                }
            />

            <Button variant="base" disabled={isLoading} type="submit" >Добавить</Button>
        </Stack>
    </form >
}
