import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ReferredUser() {
  const { user } = useAuth();
  const { id } = useParams();

  const { getUserByID, deleteUserByID, editBizUser } = useAuth();
  const { VITE_GOOGLE_MAPS_API_KEY: KEY } = import.meta.env;
  const [refUser, setRefUser] = useState(null);
  const navigate = useNavigate();
  if (!id) {
    return;
  }
  useEffect(() => {
    const fetchOneUser = async () => {
      try {
        const userData = await getUserByID(id);
        setRefUser(userData.data);
      } catch (error) {
        console.error("error fetching user ", error);
      }
    };
    fetchOneUser();
  }, [id]);

  const handleEdit = () => {
    if (user?._id == refUser?._id) {
      navigate(`/user/${user._id}`);
    } else {
      const reply = confirm("are you sure you want to change Biz Unit ?");
      if (!reply) {
        toast.info("Action Aborted");
        return;
      }
      editBizUser(id);
      navigate(-1);
      toast.success("Biz unit changed successfully");
    }
  };
  const handleDelete = () => {
    const reply = confirm("are you sure you want to delete this user?");
    if (!reply) {
      toast.info("Action Aborted");
      return;
    }
    if (refUser.isAdmin) {
      toast.error("Admin User can't be deleted");
      return;
    }
    deleteUserByID(id);
    navigate(-1);
    toast.success("Deleted successfully");
  };

  return refUser ? (
    <div
      key={refUser?._id}
      className="card card-hover gap-1 hover m-auto p-3 mt-4"
      style={{ maxWidth: 600 }}
    >
      <h1 className="m-auto mb-1">
        {refUser?.name?.first} {refUser?.name?.last}
      </h1>
      <img
        src={refUser?.image?.url}
        className="card-img-top h-20 m-auto "
        alt={refUser?.image?.alt}
        style={{ maxHeight: 250, maxWidth: 150 }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: 30 }}>
          {refUser?.title}
        </h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{ fontSize: 20 }}>
            Email: {refUser?.email}
          </li>
          <li className="list-group-item" style={{ fontSize: 20 }}>
            Phone: {refUser?.phone}
          </li>
          <li className="list-group-item" style={{ fontSize: 20 }}>
            User Level :{" "}
            {refUser?.isAdmin
              ? "Admin "
              : refUser?.isBusiness
              ? "Business"
              : "Personal"}
          </li>
          {
            <li className="list-group-item" style={{ fontSize: 20 }}>
              Address: {refUser?.address?.street}{" "}
              {refUser?.address?.houseNumber} , {refUser?.address?.city} ,{" "}
              {refUser?.address?.country}
            </li>
          }
          <div className="container mt-2">
            <iframe
              className="container"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              loading="lazy"
              src={`
                https://www.google.com/maps/embed/v1/place?key=${KEY}
                &q=${refUser?.address?.street}+${refUser?.address?.city}+${refUser?.address?.state}
              `}
            />
          </div>
          <li className="list-group-item text-center" style={{ fontSize: 20 }}>
            {user?._id !== refUser?._id && (
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(id);
                }}
              >
                <i className="bi bi-trash fs-2 m-4 "></i>
              </a>
            )}
            {(user?._id === refUser?._id || user.isAdmin) && (
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(id);
                }}
              >
                <i className="bi bi-pencil-square fs-2 m-4"></i>
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="text-center text-primary">
      <div className="spinner-border fs-2" role="status"></div>
    </div>
  );
}

export default ReferredUser;
