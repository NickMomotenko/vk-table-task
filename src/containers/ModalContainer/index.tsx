import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { Button, Input } from "@vkontakte/vkui";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUsers } from "../../context/UserContext";

import { userSchema } from "../../helpers/schema";

import "./styles.scss";
import type { User } from "../../helpers/types";

type ModalContainer = {
  active?: boolean;
  handler: Dispatch<SetStateAction<boolean>>;
};

export const ModalContainer: React.FC<ModalContainer> = ({
  active,
  handler,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(userSchema) });

  const [isLoading, setIsLoading] = useState(false);

  const { users, setUsers } = useUsers();

  const keys: string[] = users[0]
    ? Object.keys(users[0]).filter((key) => key !== "id" && key !== "idNum")
    : ["name", "age", "city", "position", "salary"];

  useEffect(() => {
    if (active) {
      document.body.style.overflow = `hidden`;
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const submit = async (data: any) => {
    setIsLoading(true);

    const correctKeys = users[0] ? Object.keys(users[0]) : Object.keys(data);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      if (response.ok) {
        const newItem = await response.json();

        const reorderedItem = Object.fromEntries(
          correctKeys.map((key) => [key, newItem[key]])
        );

        setUsers((prev: User[] | any) => [reorderedItem, ...prev]);
        reset();
      } else {
        alert("Ошибка при добавлении");
      }
    } catch (error) {
      alert("Возможно ты не запустил сервер db или что то пошло не так");
      console.error("Ошибка при отправке:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        handler(false);
      }, 1000);
    }
  };

  const handleCancel = () => {
    handler(false);
    reset();
  };

  return (
    <div className="modal">
      <form className="modal__container" onSubmit={handleSubmit(submit)}>
        <div className="modal__body">
          {keys.map((mapedKey: any, ind) => {
            return (
              <div className="modal__row" key={ind}>
                <Input
                  placeholder={mapedKey}
                  type={
                    ["age", "salary"].includes(mapedKey) ? "number" : "text"
                  }
                  className="modal__input"
                  {...register(mapedKey, { required: "Обязательное поле" })}
                />
                {errors?.[mapedKey as keyof typeof errors]?.message && (
                  <span className="modal__error">
                    {errors?.[mapedKey as keyof typeof errors]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="modal__button">
          <Button
            type="submit"
            style={{ marginRight: 15 }}
            disabled={isLoading}
            data-testid="add-new-user"
          >
            {isLoading ? "Отправляю..." : " Добавить"}
          </Button>
          <Button onClick={handleCancel} data-testid="cancel-form">
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};
