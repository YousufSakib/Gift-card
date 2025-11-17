import card from "./card/card";
import client from "./client/client";
import order from "./order/order";
import user from "./user/user";

export const services = (app) => {
  app.configure(user);
  app.configure(card);
  app.configure(order);
  app.configure(client);
};
