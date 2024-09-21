import { useContext, useEffect, useState } from "react";
import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import { getCards } from "../services/cardsService";
import Card from "./card";
import { useSearch } from "../contexts/search.context";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import Pagination from "../components/common/pagination";
import usePagination from "../components/hooks/usePagination";

function Home() {
  const [cards, setCards] = useState([]);
  const { search } = useSearch();
  const { user } = useAuth();

  const {
    setCurrentPAge,
    cardPerPage,
    lastCardIndex,
    firstCardIndex,
    currentPage,
  } = usePagination();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.log("error fetching cards ", error);
      }
    };
    fetchCards();
  }, []);

  const handleDelete = (cardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card._id !== cardId);
      return updatedCards;
    });
  };
  const currentCards = cards.slice(firstCardIndex, lastCardIndex);
  return (
    <div className="container ">
      <PageHeader
        title={<Logo />}
        description="Welcome to the best business cards site  "
      />

      {user && (user.isBusiness || user.isAdmin) && (
        <div className="container d-flex justify-content-end ">
          <Link to={"/newCard"}>
            <i className="bi bi-plus-square align-end plus"></i>
          </Link>
        </div>
      )}
      {cards.length === 0 && (
        <div className="text-center text-primary">
          <div className="spinner-border fs-2" role="status"></div>
        </div>
      )}
      {cards.length > 0 && (
        <div className="d-flex w-70 justify-content-center m-auto gap-5 mb-5 flex-wrap">
          {currentCards
            .filter((card) =>
              card.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((card) => (
              <Card
                card={card}
                key={card._id}
                onUnlike={() => {}}
                onDelete={handleDelete}
              />
            ))}
        </div>
      )}
      {currentCards.length > 0 && (
        <Pagination
          totalCards={cards.length}
          cardsPerPage={cardPerPage}
          setCurrentPAge={setCurrentPAge}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default Home;
