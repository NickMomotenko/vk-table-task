import { Button } from "@vkontakte/vkui";

import "./styles.scss";

export const AddUsers = ({ onAddClick }) => {
  return (
    <div className="add-block">
      <Button onClick={() => onAddClick(true)}>Добавить</Button>
    </div>
  );
};
