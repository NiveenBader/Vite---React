import { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignOut() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutFetch = async () => {
      try {
        await logout();
        navigate("/");
        toast.success("sign out succesfull");
      } catch (error) {
        console.log("error logging out ", error);
        toast.error("sign out was unsuccessful");
      }
    };
    logoutFetch();
  }, []);
}

export default SignOut;
