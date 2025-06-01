import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { Button, Input } from "@vkontakte/vkui";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUsers } from "../../context/UserContext";

import { userSchema } from "../../helpers/schema";

import "./styles.scss";

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

  const keys = users[0]
    ? Object.keys(users[0]).filter((key) => key !== "id" && key !== "idNum")
    : ["name", "age", "city", "position", "salary"];

  useEffect(() => {
    if (active) {
      document.body.style.overflow = `hidden`;
    } else document.body.style.overflowY = `auto`;
  }, [active]);

  const submit = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: users[users.length - 1]?.id + 1, ...data }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setUsers((prev) => [newItem, ...prev]);
        reset();
      } else {
        alert("Ошибка при добавлении");
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        handler(false);
      }, 2000);
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
          {keys.map((key: any) => {
            return (
              <div className="modal__row">
                <Input
                  placeholder={key}
                  type={["age", "salary"].includes(key) ? "number" : "text"}
                  className="modal__input"
                  {...register(key, { required: "Обязательное поле" })}
                />
                {errors[key] && (
                  <span className="modal__error">{errors[key]?.message}</span>
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
          <Button onClick={handleCancel} data-testid="cancel-form">Отмена</Button>
        </div>
      </form>
    </div>
  );
};
