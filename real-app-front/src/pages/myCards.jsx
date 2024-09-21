import { Link } from "react-router-dom";
import { useSearch } from "../contexts/search.context";
import { getMyCards } from "../services/cardsService";
import { useState, useEffect } from "react";
import Card from "./card";
import { toast } from "react-toastify";
import PageHeader from "../components/common/pageHeader";
import usePagination from "../components/hooks/usePagination";
import Pagination from "../components/common/pagination";
function Mycards() {
  const {
    setCurrentPAge,
    cardPerPage,
    currentPage,
    firstCardIndex,
    lastCardIndex,
  } = usePagination();

  const [cards, setCards] = useState([]);
  const { search } = useSearch();
  const currentCards = cards.slice(firstCardIndex, lastCardIndex);

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const res = await getMyCards();
        setCards(res.data);
      } catch (error) {
        console.error("error fetching cards ", error);
      }
    };
    fetchMyCards();
  }, []);
  const handleDelete = (cardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card._id !== cardId);
      const totalPages = Math.ceil(updatedCards.length / cardPerPage);

      if (currentPage > totalPages) {
        setCurrentPAge(totalPages);
      }
      return updatedCards;
    });
    toast.success("Card Deleted successfully");
  };

  return (
    <div className="container mt-5 ">
      <PageHeader
        title="My Cards"
        description="Here are your own business cards"
      />
      <div className="container d-flex justify-content-end ">
        <Link to={"/newCard"}>
          <i className="bi bi-plus-square align-end plus"></i>
        </Link>
      </div>
      {cards.length > 0 ? (
        <div className="d-flex w-70 justify-center m-auto gap-5 mb-5 flex-wrap h-50">
          {currentCards
            .filter((card) =>
              card.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((card) => (
              <Card
                card={card}
                key={card._id}
                onDelete={handleDelete}
                onUnlike={() => {}}
              />
            ))}
        </div>
      ) : (
        <div>
          <p className="fs-4">
            {" "}
            There are no cards added by you , click on the add button to start
          </p>
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

export default Mycards;
