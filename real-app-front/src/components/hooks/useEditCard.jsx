import { useState } from "react";
import schemaDataCard from "../common/schemaDataCard";
import { useFormik } from "formik";
import { editCard } from "../../services/cardsService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function useEditCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serverError, setServerError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
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
        await editCard(id, values);
        toast.success("Card Edited Successfully");
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
export default useEditCard;
