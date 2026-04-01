"use client";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const goPage = (path: string) => {
    router.push(path);
  };
  return (
    <>
      <div className="bg-black/80 p-10 w-full  rounded">
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Field>
              <Label htmlFor="nonmbre-usu">Nombre</Label>
              <Input
                id="nonmbre-usu"
                name="nombreusu"
                type="text"
                placeholder="Ingresa el nombre"
              />
            </Field>
            <Field>
              <Label htmlFor="apll">Apellido</Label>
              <Input
                id="apll"
                name="apellidousu"
                type="text"
                placeholder="Ingresa el apellido"
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Field>
              <FieldLabel htmlFor="dia-nac">Dia Nac.</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="dia-nac">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="mes-nac">Mes Nac.</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="mes-nac">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="02">02</SelectItem>
                    <SelectItem value="03">03</SelectItem>
                    <SelectItem value="04">04</SelectItem>
                    <SelectItem value="05">05</SelectItem>
                    <SelectItem value="06">06</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="08">08</SelectItem>
                    <SelectItem value="09">09</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="year-nac">Año Nac.</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="year-nac">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <Label htmlFor="name-1">Correo</Label>
            <Input
              id="name-1"
              name="correo"
              type="text"
              placeholder="Ingresa el correo"
            />
          </Field>
          <Field>
            <Label htmlFor="username-1">Contraseña</Label>
            <Input
              id="username-1"
              name="password"
              type="password"
              placeholder="Ingresa el password"
            />
            {/* defaultValue="@peduarte" */}
          </Field>
          <Field>
            <Label htmlFor="username-1">Repita Contraseña</Label>
            <Input
              id="username-1"
              name="password"
              type="password"
              placeholder="Repita el password"
            />
            {/* defaultValue="@peduarte" */}
          </Field>
        </FieldGroup>
        <div className="pt-2 pb-2 text-right">
          <Button variant="outline" className="cursor-pointer me-2">
            Cancelar
          </Button>
          <Button type="button" className="cursor-pointer">
            Registrarse
          </Button>
        </div>
        <div className="flex items-center justify-center pt-5">
          <Label
            htmlFor="username-5"
            className="cursor-pointer hover:text-gray-400"
            onClick={() => goPage("/login")}
          >
            Iniciar sesion
          </Label>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
