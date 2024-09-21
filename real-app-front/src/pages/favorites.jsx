import Card from "./card";
import { useEffect, useState } from "react";
import PageHeader from "../components/common/pageHeader";
import { getCards } from "../services/cardService";
import { useAuth } from "../contexts/auth.context";
import { useSearch } from "../contexts/search.context";
import usePagination from "../components/hooks/usePagination";
import Pagination from "../components/common/pagination";

function Favorites() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const { search } = useSearch();
  const {
    setCurrentPAge,
    cardPerPage,
    currentPage,
    firstCardIndex,
    lastCardIndex,
  } = usePagination();

  const currentCardsFilterd = cards.filter((card) =>
    card.likes.includes(user?._id)
  );
  const currentCards = currentCardsFilterd.slice(firstCardIndex, lastCardIndex);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error("error fetching cards ", error);
      }
    };
    fetchCards();
  }, []);

  const handleCardRemoval = (cardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card._id !== cardId);

      const totalFilteredCards = updatedCards.filter((card) =>
        card.likes.includes(user._id)
      ).length;
      const totalPages = Math.ceil(totalFilteredCards / cardPerPage);

      if (currentPage > totalPages) {
        setCurrentPAge(totalPages);
      }

      return updatedCards;
    });
  };
  return (
    <div className="container ">
      <PageHeader
        title="Favorite Cards"
        description="Here are your favorite business cards"
      />

      {currentCards.length === 0 && (
        <div>
          <p className="fs-4"> There are no favorite cards you liked </p>
        </div>
      )}

      {currentCards.length > 0 && (
        <div className="d-flex w-70 justify-center m-auto gap-5 mb-5 flex-wrap">
          {currentCards
            .filter((card) =>
              card.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((card) => (
              <Card
                card={card}
                key={card._id}
                onUnlike={handleCardRemoval}
                onDelete={handleCardRemoval}
              />
            ))}
        </div>
      )}
      {currentCards.length > 0 && (
        <Pagination
          totalCards={currentCardsFilterd.length}
          cardsPerPage={cardPerPage}
          setCurrentPAge={setCurrentPAge}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default Favorites;
