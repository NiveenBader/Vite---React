import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getCard } from "../services/cardsService";
import useEditCard from "../components/hooks/useEditCard";
function EditCard() {
  const navigate = useNavigate();
  const [fetchedCard, setfetchedCard] = useState({});
  const { id } = useParams();

  const { form, serverError } = useEditCard();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await getCard(id);
        setfetchedCard(data);
        form.setValues({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          phone: data.phone || "",
          email: data.email || "",

          image: {
            url: data.image?.url || "",
            alt: data.image?.alt || "",
          },
          address: {
            state: data.address?.state || "",
            country: data.address?.country || "",
            city: data.address?.city || "",
            street: data.address?.street || "",
            houseNumber: data.address?.houseNumber || "",
            zip: data.address?.zip || "",
          },
        });
      } catch (error) {
        console.log("error fetching card", error);
        if (error.response?.status === 400) {
          setServerError(error.response.data);
        }
      }
    };
    fetchCard();
  }, [id]);
  const handleCancel = () => {
    navigate(-1);
    toast.info("Action Cancelled");
  };
  return (
    <div className="container">
      <PageHeader title="Edit Card" />
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form
        onSubmit={form.handleSubmit}
        className="d-flex flex-wrap gap-5 m-5 text-justify "
        noValidate
        autoComplete="off"
      >
        <Input
          {...form.getFieldProps("title")}
          type="text"
          label="Title"
          placeholder="Title"
          required
          error={form.touched.title && form.errors.title}
        />
        <Input
          {...form.getFieldProps("subtitle")}
          type="text"
          required
          label="Subtitle"
          placeholder="Subtitle"
          error={form.touched.subtitle && form.errors.subtitle}
        />
        <Input
          {...form.getFieldProps("description")}
          type="text"
          label="Description"
          placeholder="Description"
          required
          error={form.touched.description && form.errors.description}
        />
        <Input
          {...form.getFieldProps("phone")}
          type="text"
          label="Phone"
          required
          error={form.touched.phone && form.errors.phone}
        />
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          placeholder="john@doe.com"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input {...form.getFieldProps("web")} type="text" label="Web" />
        <Input
          {...form.getFieldProps("image.url")}
          type="text"
          label="Image url"
          placeholder="Image url"
          error={form.touched.image?.url && form.errors["image.url"]}
        />
        <Input
          {...form.getFieldProps("image.alt")}
          type="text"
          label="Image alt"
          placeholder="Image alt"
          error={form.touched.image?.alt && form.errors["image.alt"]}
        />
        <Input
          {...form.getFieldProps("address.state")}
          type="text"
          label="state"
          placeholder="state"
          error={form.touched.address?.state && form.errors["address.state"]}
        />
        <Input
          {...form.getFieldProps("address.country")}
          type="text"
          label="country"
          required
          placeholder="country"
          error={
            form.touched.address?.country && form.errors["address.country"]
          }
        />
        <Input
          {...form.getFieldProps("address.city")}
          type="text"
          label="city"
          required
          placeholder="city"
          error={form.touched.address?.city && form.errors["address.city"]}
        />
        <Input
          {...form.getFieldProps("address.street")}
          type="text"
          label="street"
          required
          placeholder="street"
          error={form.touched.address?.street && form.errors["address.street"]}
        />
        <Input
          {...form.getFieldProps("address.houseNumber")}
          type="number"
          label="house number"
          required
          placeholder="house number"
          error={
            form.touched.address?.houseNumber &&
            form.errors["address.houseNumber"]
          }
        />
        <Input
          {...form.getFieldProps("address.zip")}
          type="number"
          label="zip"
          required
          placeholder="zip"
          error={form.touched.address?.zip && form.errors["address.zip"]}
        />

        <div className="my-2 p-3">
          <button type="submit" className="btn btn-success m-3 fs-4">
            Submit
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-danger m-3 fs-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditCard;
