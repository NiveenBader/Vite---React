import Joi from "joi";
import { useFormik } from "formik";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import { useAuth } from "../contexts/auth.context";
import { Navigate, useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../components/Regex/refgex";
import { toast } from "react-toastify";
import useSignIn from "../components/hooks/useSignIn";

function SignIn() {
  const { user } = useAuth();
  const { form } = useSignIn();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <PageHeader title="Sign In" description="Sign in with your account" />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          placeholder="john@doe.com"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          error={form.touched.password && form.errors.password}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
