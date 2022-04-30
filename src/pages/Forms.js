import { Text, Input, Grid, Select, Button, Image } from "@geist-ui/core";
import { useState, useRef } from "react";
import { imageToBase64, isValidImgFile } from "../helpers/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserRegistrationSchema } from "../helpers/schemas";
import ErrorText from "../Components/TextError";

export default function Forms() {
  const formRef = useRef(null);
  const inputFileRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UserRegistrationSchema) });

  const onSelectAvatar = () => {
    inputFileRef.current?.click();
  };

  const onChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (isValidImgFile(file)) {
      const src = await imageToBase64(file);
      setImgSrc(src);
    } else {
      setImgSrc(null);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mt-5 mb-3">
      <form
        id="form-register-users"
        ref={formRef}
        onSubmit={handleSubmit(onsubmit)}
      >
        <Text h2 className="mb-3">
          Registro
        </Text>

        <Text p className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          similique voluptate dolores alias incidunt est quasi in illo
          asperiores laudantium.
        </Text>

        <div className="mb-3">
          <label htmlFor="email" className="d-block mb-2 text-muted">
            Correo Eléctronico
          </label>
          <Input
            {...register("email")}
            htmlType="email"
            id="email"
            name="email"
            placeholder="your-email@gmail.com"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.email?.message}
            isVisible={!!errors.email?.message}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fullname" className="d-block mb-2 text-muted">
            Nombre Completo
          </label>
          <Input
            {...register("fullname")}
            id="fullname"
            name="fullname"
            placeholder="Juan Mendoza Perez"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.fullname?.message}
            isVisible={!!errors.fullname?.message}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birthday" className="d-block mb-2 text-muted">
            Fecha de Nacimiento
          </label>
          <Input
            {...register("birthday")}
            htmlType="date"
            id="birthday"
            name="birthday"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.birthday?.message}
            isVisible={!!errors.birthday?.message}
          />
        </div>

        <div className="mb-3">
          <Grid.Container gap={1}>
            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <label htmlFor="phone" className="d-block mb-2 text-muted">
                  Número Telefónico Personal
                </label>
                <Input
                  {...register("phone")}
                  htmlType="tel"
                  id="phone"
                  name="phone"
                  width="100%"
                />
                <ErrorText
                  className="mt-2"
                  text={errors.phone?.message}
                  isVisible={!!errors.phone?.message}
                />
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <label htmlFor="telephone" className="d-block mb-2 text-muted">
                  Número Telefónico Público
                </label>
                <Input
                  {...register("telephone")}
                  htmlType="tel"
                  id="telephone"
                  name="telephone"
                  width="100%"
                />
                <ErrorText
                  className="mt-2"
                  text={errors.telephone?.message}
                  isVisible={!!errors.telephone?.message}
                />
              </div>
            </Grid>
          </Grid.Container>
        </div>

        <div className="mb-3">
          <Grid.Container gap={1}>
            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <label htmlFor="genre" className="d-block mb-2 text-muted">
                  Género
                </label>
                <Select
                  {...register("genre")}
                  id="genre"
                  name="genre"
                  getPopupContainer={() => formRef.current}
                  width="100%"
                >
                  <Select.Option value="male">Hombre</Select.Option>
                  <Select.Option value="female">Mujer</Select.Option>
                  <Select.Option value="other">Otro</Select.Option>
                </Select>
                <ErrorText
                  className="mt-2"
                  text={errors.genre?.message}
                  isVisible={!!errors.genre?.message}
                />
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <label htmlFor="age" className="d-block mb-2 text-muted">
                  Edad
                </label>
                <Input
                  {...register("age")}
                  htmlType="number"
                  min={1}
                  max={100}
                  id="age"
                  name="age"
                  width="100%"
                />
                <ErrorText
                  className="mt-2"
                  text={errors.age?.message}
                  isVisible={!!errors.age?.message}
                />
              </div>
            </Grid>
          </Grid.Container>
        </div>

        <div className="mb-3">
          <Grid.Container gap={1}>
            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="w-100">
                <label htmlFor="avatar" className="d-block mb-2 text-muted">
                  Imágen de Perfil
                </label>
                <Button onClick={onSelectAvatar} width="100%">
                  Subir imágen
                </Button>
                <Input
                  {...register("avatar")}
                  htmlType="file"
                  id="avatar"
                  name="avatar"
                  width="100%"
                  className="d-none"
                  ref={inputFileRef}
                  onChange={onChangeAvatar}
                  accept=".jpg, .png, .jpeg, .svg, .webp"
                />
                <ErrorText
                  className="mt-2"
                  text={errors.avatar?.message}
                  isVisible={!!errors.avatar?.message}
                />
              </div>
            </Grid>

            <Grid xs={24} sm={12} md={12} lg={12} xl={12}>
              <Image
                width="100%"
                height="100%"
                src={imgSrc || "./images/avatar_placeholder.png"}
                style={{ maxHeight: "300px" }}
              />
            </Grid>
          </Grid.Container>
        </div>

        <Button type="success" htmlType="submit" width="100%">
          Registrar
        </Button>
      </form>
    </div>
  );
}
