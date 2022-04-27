import * as yup from "yup";

const UserSchema = yup.object({
  name: yup
    .string()
    .min(3, "El nombre debe tener mínimo 3 carácteres")
    .max(10, "El nombre debe tener máximo 10 carácteres")
    .required("El nombre es obligatorio"),

  surname: yup
    .string()
    .min(3, "El apellido debe tener mínimo 3 carácteres")
    .max(10, "El apellido debe tener máximo 10 carácteres")
    .required("El apellido es obligatorio"),
});

export { UserSchema };
