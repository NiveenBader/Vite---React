import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import useNewCard from "../components/hooks/useNewCard";
import { toast } from "react-toastify";

function NewCard() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/mycards");
    toast.info("Action Abroted");
  };
  const { form, serverError } = useNewCard();

  return (
    <div className="container">
      <PageHeader
        title="Add a new card"
        description="here you can add your own cards"
      />

      <form
        className="d-flex flex-wrap gap-5 m-5 text-justify "
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
      >
        {serverError && (
          <div className="alert alert-danger ">{serverError}</div>
        )}

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
        <Input
          {...form.getFieldProps("web")}
          type="text"
          label="Web"
          error={form.touched.web && form.errors.web}
        />
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
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary m-4"
          >
            Add Card
          </button>

          <button className="btn btn-danger m-4" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCard;
