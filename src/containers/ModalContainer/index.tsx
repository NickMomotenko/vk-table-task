import { type Dispatch, type SetStateAction } from "react";

import { Button, Input } from "@vkontakte/vkui";

import "./styles.scss";
import { useUserForm } from "../../hooks/useUserForm";

type ModalContainer = {
  active?: boolean | any;
  handler: Dispatch<SetStateAction<boolean>>;
};

export const ModalContainer: React.FC<ModalContainer> = ({
  active,
  handler,
}) => {
  const {
    register,
    handleSubmit,
    submit,
    errors,
    isLoading,
    handleCancel,
    keys,
  } = useUserForm({
    active,
    onClose: () => handler(false),
  });

  return (
    <div className="modal">
      <form className="modal__container" onSubmit={handleSubmit(submit)}>
        <div className="modal__body">
          {keys.map((key, ind) => (
            <div className="modal__row" key={ind}>
              <Input
                placeholder={key}
                type={["age", "salary"].includes(key) ? "number" : "text"}
                className="modal__input"
                {...register(key, { required: "Обязательное поле" })}
              />
              {errors?.[key]?.message && (
                <span className="modal__error">{errors[key]?.message}</span>
              )}
            </div>
          ))}
        </div>
        <div className="modal__button">
          <Button
            type="submit"
            style={{ marginRight: 15 }}
            disabled={isLoading}
            data-testid="add-new-user"
          >
            {isLoading ? "Отправляю..." : "Добавить"}
          </Button>
          <Button onClick={handleCancel} disabled={isLoading} data-testid="cancel-form">
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};
