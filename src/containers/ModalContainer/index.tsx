import { Button, Input } from "@vkontakte/vkui";
import { useForm } from "react-hook-form";

import "./styles.scss";
import { useEffect } from "react";

export const ModalContainer = ({ active }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const keys = ["name", "age", "city", "position", "salary"];

  useEffect(() => {
    if (active) {
      document.body.style.overflow = `hidden`;
    } else document.body.style.overflowY = `auto`;
  }, [active]);

  const submit = async (data: any) => {

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 10,
        idNum: 5,
        name: "Имя 5",
        age: 24,
        city: "Город 4",
        position: "Профессия 4",
        оклад: 24000,
      }),
    });

    const newItem = await response.json();
    // console.log("Пост добавлен:", data);
  };

  return (
    <div className={active ? "modal modal--active" : "modal"}>
      <form className="modal__container" onSubmit={handleSubmit(submit)}>
        <div className="modal__body">
          {keys.map((key) => {
            return (
              <div className="modal__row">
                <Input
                  placeholder={key}
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
          <Button type="submit" style={{ marginRight: 15 }}>
            Добавить
          </Button>
          <Button>Отмена</Button>
        </div>
      </form>
    </div>
  );
};
