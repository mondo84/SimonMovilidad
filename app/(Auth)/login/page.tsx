"use client";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  loginSchema,
  LoginFormValues,
} from "@/modules/auth/schemas/login.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import GenericModal from "@/app/components/GenericModal/GenericModal";
import { useEffect, useRef, useState } from "react";
import TitlePage from "@/app/components/TitlePage/TitlePage";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSpinner } from "@/providers/spinner-provider";

const LoginPage = () => {
  const inputReference = useRef<HTMLInputElement>(null);
  const { hide, show } = useSpinner();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [getModalCtrl, setModalCtrl] = useState<{ open: boolean }>({
    open: false,
  });
  const [{ message }, setMsj] = useState<{ message: string }>({
    message: "",
  });

  useEffect(() => {
    inputReference.current?.focus();
  }, []);

  useEffect(() => {
    if (!getModalCtrl.open) {
      inputReference.current?.focus();
    }
  }, [getModalCtrl.open]);

  const goPage = (path: string) => {
    router.push(path);
  };

  const stringClass = "text-red-500 size-15";

  const onSubmit = async (data: LoginFormValues) => {
    show();

    const result = await signIn("userCredentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      const erroObj = JSON.parse(result?.error);
      setModalCtrl({ open: true });
      setMsj({ message: erroObj?.message ?? "" });
      hide();
      return;
    }

    // ==== Success Auth
    setMsj({ message: "" });
    setModalCtrl({ open: false });
    goPage("/home");
    hide();
  };

  const modalClose = () => {
    inputReference.current?.focus();
    setModalCtrl({ open: false });
  };

  return (
    <>
      <div className="bg-black/80 p-10 w-full  rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TitlePage
            title="Inicio de Sesion"
            styleConfig={{
              fontSize: "40px",
              paddingBottom: "45px",
              textAlign: "center",
              color: "#e5e5e5",
            }}
          />
          <FieldGroup className="gap-4">
            <Field className="gap-1">
              <Label htmlFor="name-1">
                {errors.username?.message ? (
                  <span className="text-red-400 text-sm">
                    {errors.username?.message}
                  </span>
                ) : (
                  "Usuario"
                )}
              </Label>
              {/* <Input
                id="name-1"
                type="text"
                placeholder="Ingresa el usuario"
                className="bg-red-900 rounded-none"
                {...register("username")}
              /> */}
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    id="username"
                    placeholder="Ingresa el usuario"
                    className="bg-red-900 rounded-none"
                    {...field} // incluye value, onChange, onBlur, name
                    ref={inputReference}
                  />
                )}
              />
            </Field>

            <Field className="gap-1">
              <Label htmlFor="passeord-id">
                {errors.password?.message ? (
                  <span className="text-red-400 text-sm">
                    {errors.password?.message}
                  </span>
                ) : (
                  "Contraseña"
                )}
              </Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="passeord-id"
                    type="password"
                    placeholder="Ingresa el password"
                    {...field}
                    className="bg-red-900 rounded-none"
                  />
                )}
              />
            </Field>
          </FieldGroup>
          <div className="pt-2 pb-2 text-right">
            <Button
              variant="outline"
              className="cursor-pointer me-2 rounded-none"
            >
              Cancelar
            </Button>
            <Button type="submit" className="cursor-pointer rounded-none">
              Iniciar Sesion
            </Button>
          </div>
          <div className="flex items-center justify-center pt-5">
            <Label
              htmlFor="username-5"
              className="cursor-pointer hover:text-gray-400"
              onClick={() => goPage("/register")}
            >
              Registrarse
            </Label>
          </div>
        </form>
      </div>
      <GenericModal
        open={getModalCtrl.open}
        onOpenChange={() => modalClose()}
        message={message}
        icon={<ExclamationTriangleIcon className={stringClass} />}
      />
    </>
  );
};

export default LoginPage;
