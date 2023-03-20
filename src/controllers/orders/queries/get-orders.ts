import { RequestHandler } from 'express';
import OrderModel from '../orders-model';
import { OrderViewModel } from '../types';

const getOrders: RequestHandler<
  {},
  OrderViewModel[],
  undefined,
  {}
> = async (req, res) => {
  const orderViewModelArray = await OrderModel.getOrders();
  res.json(orderViewModelArray);
};

export default getOrders;
