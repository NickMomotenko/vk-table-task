import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Обязательное поле"),
  age: yup
    .number()
    .typeError("Должно быть числом")
    .positive("Только положительное")
    .integer("Целое число")
    .required("Обязательное поле"),
  city: yup.string().required("Обязательное поле"),
  position: yup.string().required("Обязательное поле"),
  salary: yup
    .number()
    .typeError("Должно быть числом")
    .positive("Только положительное")
    .required("Обязательное поле"),
});
