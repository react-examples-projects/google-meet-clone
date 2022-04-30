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

  email: yup
    .string()
    .email("El correo debe ser válido")
    .required("El correo es obligatorio"),
});

const UserRegistrationSchema = yup.object({
  email: yup
    .string()
    .email("El correo debe ser válido")
    .required("El correo es obligatorio"),

  fullname: yup
    .string()
    .min(3, "El nombre completo debe tener mínimo 5 carácteres")
    .max(100, "El nombre completo tener máximo 100 carácteres")
    .required("El nombre completo es obligatorio"),

  birthday: yup.string().required("La fecha de nacimiento es obligatoria"),
  phone: yup
    .string()
    .trim()
    .matches(
      /^(0414|0424|0412|0416|0426)[0-9]{7}$/g,
      "Debe proporcionar un télefono válido"
    )

    .min(11, "El teléfono movil debe tener mínimo 10 números")
    .max(11, "El teléfono movil debe tener máximo 10 números")
    .required("El teléfono movil es obligatorio"),

  telephone: yup
    .string()
    .min(11, "El teléfono público debe tener mínimo 11 números")
    .max(11, "El teléfono público debe tener máximo 11 números")
    .trim()
    .required("El teléfono público es obligatorio"),

  genre: yup
    .string()
    .oneOf(["male", "female", "other"])
    .typeError("Género inválido")
    .required("El género es obligatorio"),

  age: yup
    .number()
    .typeError("La edad debe ser válida")
    .min(1, "La edad mínimo debe ser 1")
    .max(100, "La edad máxima debe ser 100")
    .required("La edad es obligatoria"),

  avatar: yup.object({
    file: yup.mixed().required("La imágen de avatar es obligatoria"),
  }),
});

export { UserSchema, UserRegistrationSchema };
