import { useState } from "react";
import { Input } from "../Input/Input"
import { formSchema } from "../../schemas/formSchema";
import { Button } from "../Button/Button";
import styles from "./Form.module.css"
import Swal from "sweetalert2";

export const Form = () => {

    const initialValues = {
      name: "",
      email: "",
      password: "",
      repeatPassword: ""
  }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value

        }))
        if(name !== "repeatPassword") {
          try{
              await formSchema.validateAt(name, {...formValues, [name]: value})
  
              setFormErrors((prevErrors) => {
                  const newErrors = {...prevErrors}
                  delete newErrors[name]
                  return newErrors
  
              })
          }catch (err: any) {
              setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  [name]: err.message
              }))
          }

        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          await formSchema.validate(formValues, { abortEarly: false });
          setFormErrors({});
          console.log("Formulario válido:", formValues);
          // Podés enviar los datos a un backend, etc.

          Swal.fire({
            title: "Datos Enviados",
            text: "Has sido doxeado!",
            icon: "success"
          });
          setFormValues(initialValues)
        } catch (err: any) {
          if (err.inner) {
            const newErrors: Record<string, string> = {};
            err.inner.forEach((error: any) => {
              if (error.path) newErrors[error.path] = error.message;
            });
            setFormErrors(newErrors);
          }
        }
      };
  return (
    <div>
      <div className={styles.formContainer}>
          <h3 >Formulario Manejo de Errores</h3>
          <form action="" onSubmit={handleSubmit} className={styles.formInputs}>
          <Input name="name" type="text" value={formValues.name} label="Name" handleChange={handleChange} error={formErrors.name}></Input>

          <Input name="email" type="email" value={formValues.email} label="Email" handleChange={handleChange} error={formErrors.email}></Input>

          <Input name="password" type="password" value={formValues.password} label="Password" handleChange={handleChange} error={formErrors.password}></Input>

          <Input name="repeatPassword" type="password" value={formValues.repeatPassword} label="Repeat Password" handleChange={handleChange} error={formErrors.repeatPassword}></Input>

          <div className={styles.containerButton}>
            <Button></Button>
          </div>
          </form>
      </div>
    </div>
  )
}
