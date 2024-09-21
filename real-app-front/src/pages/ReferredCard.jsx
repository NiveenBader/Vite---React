import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCard } from "../services/cardsService";
import { useAuth } from "../contexts/auth.context";
import useTools from "../components/hooks/useTools";
import { deleteCard } from "../services/cardsService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ReferredCard() {
  const { id } = useParams();
  const { user } = useAuth();
  const { VITE_GOOGLE_MAPS_API_KEY: KEY } = import.meta.env;
  const [card, setCard] = useState(null);
  const navigate = useNavigate();
  const { handleEdit } = useTools();
  if (!id) {
    return;
  }
  useEffect(() => {
    const fetchOneCard = async () => {
      try {
        const cardData = await getCard(id);
        setCard(cardData);
      } catch (error) {
        console.error("error fetching card ", error);
      }
    };
    fetchOneCard();
  }, [id]);

  const handleDelete = () => {
    const reply = confirm("are you sure you want to delete this card?");
    if (!reply) {
      toast.info("Action Aborted");
      return;
    }
    deleteCard(id);
    navigate(-1);
    toast.success("Deleted successfully");
  };
  return (
    card && (
      <div
        key={card._id}
        className="card card-hover gap-1 hover m-auto p-3 mt-4"
        style={{ maxWidth: 600 }}
      >
        <h1 className="m-auto mb-1">{card.subtitle}</h1>
        <img
          src={card.image.url}
          className="card-img-top h-20 "
          alt={card.image.alt}
          style={{ maxHeight: 350 }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: 30 }}>
            {card.title}
          </h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{ fontSize: 20 }}>
              Email: {card.email}
            </li>
            <li className="list-group-item" style={{ fontSize: 20 }}>
              Phone: {card.phone}
            </li>
            <li className="list-group-item" style={{ fontSize: 20 }}>
              Web: {card.web}
            </li>
            <li className="list-group-item" style={{ fontSize: 20 }}>
              Address: {card.address.street} {card.address.houseNumber} ,{" "}
              {card.address.city} , {card.address.country}
            </li>
            <div className="container mt-2">
              <iframe
                className="container"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                loading="lazy"
                src={`
                https://www.google.com/maps/embed/v1/place?key=${KEY}
                &q=${card?.address.street}+${card?.address.city}+${card?.address.state}
              `}
              />
            </div>
            {user?.isAdmin && (
              <li
                className="list-group-item text-center"
                style={{ fontSize: 20 }}
              >
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(id);
                  }}
                >
                  <i className="bi bi-trash fs-2 m-4 "></i>
                </a>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(id);
                  }}
                >
                  <i className="bi bi-pencil-square fs-2 m-4"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  );
}

export default ReferredCard;
