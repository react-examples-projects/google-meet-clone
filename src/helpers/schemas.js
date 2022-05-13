import * as yup from "yup";

const TwilioRoomSchema = yup.object({
  identity: yup
    .string()
    .trim()
    .min(3, "El nombre de usuario debe tener mínimo 3 carácteres")
    .max(100, "El nombre de usuario debe tener máximo 100 carácteres")
    .required("El nombre de usuario es obligatorio"),

  room: yup
    .string()
    .trim()
    .required("El identificador de la sala es obligatorio"),
});

export { UserSchema, UserRegistrationSchema, TwilioRoomSchema };
