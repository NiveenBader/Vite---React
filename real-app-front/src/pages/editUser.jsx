import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/input";
import { toast } from "react-toastify";
import useEditUser from "../components/hooks/useEditUser";

function EditUser() {
  const [onlineUser, setOnlineUser] = useState({});
  const { getLoggedUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { form, serverError } = useEditUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getLoggedUser(id);
        const info = res.data;
        setOnlineUser(info);
        form.setValues({
          name: {
            first: info.name.first || "",
            middle: info.name.middle || "",
            last: info.name.last || "",
          },
          phone: info.phone || "",
          image: {
            url: info.image?.url || "",
            alt: info.image?.alt || "",
          },
          address: {
            state: info.address?.state || "",
            country: info.address?.country || "",
            city: info.address?.city || "",
            street: info.address?.street || "",
            houseNumber: info.address?.houseNumber || "",
            zip: info.address?.zip || "",
          },
        });
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id, getLoggedUser]);
  const handleCancel = () => {
    navigate(-1);
    toast.info("Action Cancelled");
  };
  return (
    <div className="container">
      <form
        onSubmit={form.handleSubmit}
        className="d-flex flex-wrap gap-5 m-5 text-justify"
        noValidate
        autoComplete="off"
      >
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <Input
          {...form.getFieldProps("name.first")}
          type="text"
          label="First Name"
          placeholder="First Name"
          required
          error={form.touched.name?.first && form.errors["name.first"]}
        />
        <Input
          {...form.getFieldProps("name.middle")}
          type="text"
          label="Middle Name"
          placeholder="Middle Name"
          error={form.touched.name?.middle && form.errors["name.middle"]}
        />
        <Input
          {...form.getFieldProps("name.last")}
          type="text"
          label="Last Name"
          placeholder="Last Name"
          required
          error={form.touched.name?.last && form.errors["name.last"]}
        />
        <Input
          {...form.getFieldProps("phone")}
          type="text"
          label="Phone"
          required
          error={form.touched.phone && form.errors.phone}
        />
        <Input
          {...form.getFieldProps("image.url")}
          type="text"
          label="Image url"
          placeholder="Image url"
          required
          error={form.touched.image?.url && form.errors["image.url"]}
        />
        <Input
          {...form.getFieldProps("image.alt")}
          type="text"
          label="Image alt"
          placeholder="Image alt"
          required
          error={form.touched.image?.alt && form.errors["image.alt"]}
        />
        <Input
          {...form.getFieldProps("address.state")}
          type="text"
          label="State"
          placeholder="State"
          error={form.touched.address?.state && form.errors["address.state"]}
        />
        <Input
          {...form.getFieldProps("address.country")}
          type="text"
          label="Country"
          required
          placeholder="Country"
          error={
            form.touched.address?.country && form.errors["address.country"]
          }
        />
        <Input
          {...form.getFieldProps("address.city")}
          type="text"
          label="City"
          required
          placeholder="City"
          error={form.touched.address?.city && form.errors["address.city"]}
        />
        <Input
          {...form.getFieldProps("address.street")}
          type="text"
          label="Street"
          required
          placeholder="Street"
          error={form.touched.address?.street && form.errors["address.street"]}
        />
        <Input
          {...form.getFieldProps("address.houseNumber")}
          type="number"
          label="House Number"
          required
          placeholder="House Number"
          error={
            form.touched.address?.houseNumber &&
            form.errors["address.houseNumber"]
          }
        />
        <Input
          {...form.getFieldProps("address.zip")}
          type="number"
          label="Zip"
          required
          placeholder="Zip"
          error={form.touched.address?.zip && form.errors["address.zip"]}
        />
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!form.isValid}
          >
            Submit Changes
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
