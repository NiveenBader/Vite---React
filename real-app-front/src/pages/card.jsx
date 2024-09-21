import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { likeCard } from "../services/cardService";
import useTools from "../components/hooks/useTools";
import { deleteCard } from "../services/cardService";
import { toast } from "react-toastify";

function Card({
  card: {
    _id,
    bizNumber,
    image: { url, alt },
    title,
    subtitle,
    likes,
    description,
    phone,
    user_id,
  },
  onUnlike,
  onDelete,
}) {
  const { user } = useAuth();
  const onlineUser = user;

  const { handleClicked, handleEdit } = useTools();

  const [like, setLike] = useState(user ? likes.includes(user._id) : false);

  const handleLiked = () => {
    const fetchLike = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await likeCard(_id, user.token);
        setLike((prevLike) => !prevLike);
        if (like) {
          onUnlike(_id);
          toast.success("Card removed from Favorites");
        } else {
          toast.success("Added to Favorites");
        }

        return response;
      } catch (error) {
        console.error("error retrieving like/unlike status ", error);
      }
    };
    fetchLike();
  };
  const handleDelete = () => {
    const reply = confirm("are you sure you want to delete this card?");
    if (!reply) {
      toast.info("Action Aborted");
      return;
    }
    deleteCard(_id, bizNumber);
    onDelete(_id);
    toast.success("Card Deleted Successfully");
  };

  return (
    <div
      onClick={() => {
        handleClicked(_id);
      }}
      key={_id}
      className="card card-hover gap-1 hover border-3 "
      style={{ maxWidth: 400, height: 500 }}
    >
      <img src={url} className="card-img-top h-50 " alt={alt} />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: 23 }}>
          {title}
        </h5>
        <p className="card-text" style={{ fontSize: 15 }}>
          {subtitle}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item " style={{ fontSize: 15 }}>
          {description}
        </li>
        <li className="list-group-item d-flex justify-content-evenly ">
          {user && (user_id === onlineUser._id || onlineUser.isAdmin) ? (
            <>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(_id);
                }}
              >
                <i className="bi bi-trash fs-2"></i>
              </a>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(_id);
                }}
              >
                <i className="bi bi-pencil-square fs-2"></i>
              </a>
            </>
          ) : (
            ""
          )}
          <a
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={`tel:${phone}`}
          >
            <i className="bi bi-telephone-forward fs-2"></i>
          </a>

          {user ? (
            <i
              className={`bi fs-2 bi-heart${like ? "-fill text-danger" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleLiked();
              }}
            ></i>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
}

export default Card;
