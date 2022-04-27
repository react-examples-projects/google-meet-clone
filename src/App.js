import { Button, Input } from "@geist-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "./helpers/schemas";

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
            placeholder="Carlos"
            name="name"
            id="name"
            {...register("name", { required: true, minLength: 3 })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="d-block mb-1">
            Apellido
          </label>
          <Input
            placeholder="Carlos"
            id="surname"
            name="surname"
            {...register("surname", { required: true })}
          />
        </div>

        <Button htmlType="submit">Ok</Button>
      </form>
    </div>
  );
}

export default App;
