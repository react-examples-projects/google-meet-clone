import { Button, Input } from "@geist-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "./helpers/schemas";
import ErrorText from "./Components/TextError";

function App() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const errors = formState.errors;
  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="d-block mb-1">
            Nombre
          </label>
          <Input
            name="name"
            id="name"
            {...register("name")}
          />
          <ErrorText
            className="mt-2"
            text={errors.name?.message}
            isVisible={!!errors.name?.message}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="d-block mb-1">
            Apellido
          </label>
          <Input
            id="surname"
            name="surname"
            {...register("surname")}
          />
          <ErrorText
            className="mt-2"
            text={errors.surname?.message}
            isVisible={!!errors.surname?.message}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="d-block mb-1">
            E-mail
          </label>
          <Input
            id="email"
            name="email"
            htmlType="email"
            {...register("email")}
          />
          <ErrorText
            className="mt-2"
            text={errors.email?.message}
            isVisible={!!errors.email?.message}
          />
        </div>

        <Button htmlType="submit">Ok</Button>
      </form>
    </div>
  );
}

export default App;
