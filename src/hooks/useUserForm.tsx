import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useUsers } from "../context/UserContext";

import { userSchema } from "../helpers/schema";

export const useUserForm = ({
  active,
  onClose,
}: {
  active: boolean;
  onClose: () => void;
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

  const submit = async (data: any) => {
    setIsLoading(true);
    const correctKeys = users[0] ? Object.keys(users[0]) : Object.keys(data);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newItem = await response.json();
        const reorderedItem = Object.fromEntries(
          correctKeys.map((key) => [key, newItem[key]])
        );
        setUsers((prev: any[]) => [reorderedItem, ...prev]);
        reset();
      } else {
        alert("Ошибка при добавлении");
      }
    } catch (error) {
      alert("Сервер не доступен или ошибка сети");
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 1000);
    }
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return {
    register,
    handleSubmit,
    submit,
    errors,
    isLoading,
    handleCancel,
    keys,
  };
};
