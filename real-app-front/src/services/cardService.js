import httpService from "./httpService";

export async function getCards() {
  const response = await httpService.get("/cards");
  const data = response.data;
  return data;
}

export async function likeCard(cardId) {
  const response = await httpService.patch(`cards/${cardId}`);
  const data = response.data;
  return data;
}
export async function getCard(cardId) {
  const response = await httpService.get(`cards/${cardId}`);
  const data = response.data;
  return data;
}

export async function deleteCard(cardId, bizNumber) {
  const response = await httpService.delete(`cards/${cardId}`, bizNumber);
  return response;
}

export async function getMyCards() {
  const response = await httpService.get("/cards/my-cards");
  return response;
}
export async function addNewCard(data) {
  const response = await httpService.post("/cards", data);
  return response;
}
export async function editCard(cardId, data) {
  const response = await httpService.put(`cards/${cardId}`, data);
  return response;
}

const cardsService = {
  getCards,
  likeCard,
  getCard,
  getMyCards,
  addNewCard,
  editCard,
};

export default cardsService;
