import { useState } from "react";

export const useModal = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  return { isModalActive, setIsModalActive };
};
