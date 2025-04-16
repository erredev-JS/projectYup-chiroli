import { string, object, ref } from 'yup';


export const formSchema = object({
    name: string().min(3, "*Debe tener más de 3 carácteres"),
    email: string().email("*Debe ser una direccion de correo válida"),
    password: string()
    .required("*El campo es obligatorio")
    .min(8, '*Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, '*Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, '*Debe contener al menos una letra minúscula')
    .matches(/[0-9]/, '*Debe contener al menos un número')
    .matches(/[@$!%*?&]/, '*Debe contener al menos un carácter especial (@$!%*?&)'),
    repeatPassword: string()
    .oneOf([ref("password")], "*No coincide")

})