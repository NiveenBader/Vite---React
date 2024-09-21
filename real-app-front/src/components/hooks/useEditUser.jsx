import { useFormik } from "formik";
import schemaDataUser from "../common/schemaDataUser";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

function useEditUser() {
  const { id } = useParams();
  const { editLoggedUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
    },
    validate(values) {
      const { error } = schemaDataUser.validate(values, {
        abortEarly: false,
      });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path.join(".");
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await editLoggedUser(id, values);
        toast.success("User Edited Successfully");
        navigate(-1);
      } catch (err) {
        console.error("Error:", err);
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });
  return { form, serverError };
}
export default useEditUser;
