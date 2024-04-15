import axiosPrint from "./axiosPrint";

export const getContacts = async () => {
  const response = await axiosPrint.get("/contacts/");
  return response.data;
};
