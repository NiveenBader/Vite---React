import { useState } from "react";
function usePagination() {
  const [currentPage, setCurrentPAge] = useState(1);
  const [cardPerPage, setCardPerPage] = useState(6);
  const [usersPerPAge, setusersPerPAge] = useState(8);

  const lastCardIndex = currentPage * cardPerPage;
  const firstCardIndex = lastCardIndex - cardPerPage;

  const lastUserIndex = currentPage * usersPerPAge;
  const firstUserIndex = lastUserIndex - usersPerPAge;

  return {
    currentPage,
    setCurrentPAge,
    cardPerPage,
    setCardPerPage,
    lastCardIndex,
    firstCardIndex,
    usersPerPAge,
    lastUserIndex,
    firstUserIndex,
  };
}
export default usePagination;
