import { useFormik } from "formik";
import Joi from "joi";
import { addNewCard } from "../../services/cardService";
import { emailRegex, phoneRegex, webRegex } from "../Regex/refgex";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import schemaDataCard from "../common/schemaDataCard";

const useNewCard = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
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
      const { error } = schemaDataCard.validate(values, { abortEarly: false });
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
        await addNewCard({ ...values });
        navigate("/mycards");
        toast.success("A New business card has been created");
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error("Error Creating new card");
          setServerError(err.response.data);
        }
      }
    },
  });
  return { form, serverError };
};
export default useNewCard;
