import { useAuth } from "../../contexts/auth.context";
import { useFormik } from "formik";
import Joi from "joi";
import { emailRegex, passwordRegex } from "../Regex/refgex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .pattern(emailRegex)
          .required()
          .email({ tlds: { allow: false } })
          .label("Email"),
        password: Joi.string()
          .min(5)
          .max(20)
          .required()
          .pattern(passwordRegex)
          .message(
            "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"
          )
          .label("Password"),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path[0];
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await login(values);
        toast.success("login succesfull");
        navigate("/");
      } catch (error) {
        console.log("Authentication Error: Invalid email or password", error);
        toast.error("login unsuccesfull");
      }
    },
  });

  return { form };
};

export default useSignIn;
