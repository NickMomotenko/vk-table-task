import { useState } from "react";

export const useModal = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  return { isModalActive, setIsModalActive };
};
