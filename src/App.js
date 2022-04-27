import { Button, Grid, Input, Text } from "@geist-ui/core";
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
    <Grid.Container className="full-vp">
      <Grid xs={24} sm={12} md={10} lg={10} xl={10}>
        <div className="container mt-5">
          <div className="container-form-register">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Registrarse</h2>
              <div className="mb-3">
                <label htmlFor="name" className="d-block mb-1">
                  Nombre
                </label>
                <Input
                  name="name"
                  id="name"
                  {...register("name")}
                  width="100%"
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
                  width="100%"
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
                  width="100%"
                  {...register("email")}
                />
                <ErrorText
                  className="mt-2"
                  text={errors.email?.message}
                  isVisible={!!errors.email?.message}
                />
              </div>

              <Button htmlType="submit" width="100%">
                Ok
              </Button>
            </form>
          </div>
        </div>
      </Grid>

      <Grid xs={0} sm={12} md={14} lg={14} xl={14} className="bg-register">
        <div className="container container-hero">
          <Text h1>Unete a la comunidad virtual más grande</Text>
          <Text className="mb-4" p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit sint
            voluptas illum expedita placeat distinctio, ratione assumenda
            numquam sunt! Omnis!
          </Text>
          <Button className="me-2">Comunidad</Button>
          <Button type="success">Productos</Button>
        </div>
      </Grid>
    </Grid.Container>
  );
}

export default App;
