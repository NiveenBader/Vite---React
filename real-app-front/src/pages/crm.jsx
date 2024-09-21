import { useState, useEffect } from "react";
import { useSearch } from "../contexts/search.context";
import { getCards } from "../services/cardsService";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/common/pagination";
import usePagination from "../components/hooks/usePagination";

function Crm() {
  const navigate = useNavigate();
  const { allUsers, user } = useAuth();
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(true);
  const { search } = useSearch();
  const {
    setCurrentPAge,
    cardPerPage,
    lastCardIndex,
    firstCardIndex,
    usersPerPAge,
    lastUserIndex,
    firstUserIndex,
    currentPage,
  } = usePagination();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const dataCards = await getCards();
        setCards(dataCards);
        const dataUsers = await allUsers();
        setUsers(dataUsers.data);
      } catch (error) {
        console.error("error fetching data ", error);
      }
    };
    fetchCards();
  }, [user._id]);

  const handleNavigate = (id) => {
    navigate(`/referredCard/${id}`);
  };
  const handleNavigateUser = (id) => {
    navigate(`/referredUser/${id}`);
  };
  const handleToggle = (isCards) => {
    if (show !== isCards) setShow(isCards);
  };
  const currentCards = cards.slice(firstCardIndex, lastCardIndex);
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);

  return (
    <div className="container-sm mt-2 d-flex flex-column justify-content-center align-items-center ">
      <div className="text-center m-4">
        <button
          onClick={() => handleToggle(true)}
          className={`btn rounded-pill px-3 fs-4 m-2 ${
            show ? "btn-primary" : "btn-secondary"
          }`}
          type="button"
        >
          Cards
        </button>
        <button
          onClick={() => handleToggle(false)}
          className={`btn rounded-pill px-3 fs-4 m-2 ${
            !show ? "btn-primary" : "btn-secondary"
          }`}
          type="button"
        >
          Users
        </button>
      </div>
      {cards.length === 0 && (
        <div className="text-center text-primary">
          <div className="spinner-border fs-2" role="status"></div>
        </div>
      )}

      <table className="table table-striped  table-hover ">
        <thead></thead>
        <tbody className={show ? "" : "d-none"}>
          {currentCards
            .filter((card) => card.title.includes(search))
            .map((card) => {
              const formattedDate = new Date(
                card.createdAt
              ).toLocaleDateString();
              return (
                <tr
                  key={card._id}
                  onClick={() => {
                    handleNavigate(card._id);
                  }}
                >
                  <td>{card.title}</td>
                  <td>{card.email}</td>
                  <td>{card.phone}</td>
                  <td>{formattedDate}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {show && currentCards.length > 0 ? (
        <Pagination
          totalCards={cards.length}
          cardsPerPage={cardPerPage}
          setCurrentPAge={setCurrentPAge}
          currentPage={currentPage}
        />
      ) : (
        ""
      )}
      <table className="table table-striped table-hover ">
        <thead></thead>
        <tbody className={show ? "d-none" : ""}>
          {currentUsers
            .filter((User) => User.name.first.includes(search))
            .map((User) => (
              <tr
                key={User._id}
                onClick={() => {
                  handleNavigateUser(User._id);
                }}
              >
                <td>{`${User.name.first} ${User.name.last}`}</td>
                <td>{User.email}</td>
                <td>{User.phone}</td>
                <td>
                  {User.isAdmin
                    ? "Admin "
                    : User.isBusiness
                    ? "Business"
                    : "Personal"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {show ? (
        ""
      ) : (
        <Pagination
          totalCards={users.length}
          cardsPerPage={usersPerPAge}
          setCurrentPAge={setCurrentPAge}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
export default Crm;
