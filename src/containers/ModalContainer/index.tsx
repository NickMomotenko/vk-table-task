import { useState } from "react";
import "./styles.scss";
import { Button, Input } from "@vkontakte/vkui";
import { useForm } from "react-hook-form";

const ModalContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [active, setActive] = useState(false);

  const keys = ["name", "age", "city", "position", "salary"];

  const submit = (data) => {
    console.log(data);

    // const response = await fetch("http://localhost:3000/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: 4,
    //     title: "a title 4",
    //     views: 50,
    //     likes: 100,
    //     dislikes: 4,
    //     description: "text",
    //   }),
    // });

    // setActive(false);
    // const data = await response.json();
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

export default ModalContainer;
