import { Button } from "@vkontakte/vkui";

import "./styles.scss";

type AddUsersProps = {
  onAddClick?: (active: boolean) => void;
};

export const AddUsers: React.FC<AddUsersProps> = ({ onAddClick }) => {
  return (
    <div className="add-block">
      <Button onClick={() => onAddClick && onAddClick(true)}>Добавить</Button>
    </div>
  );
};
