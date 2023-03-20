import express from 'express';
import jwtTokenMiddleware from 'middlewares/jwt-token-middleware';
import getOrders from './queries/get-orders';
import getOrder from './queries/get-order';
import createOrder from './mutations/create-order';
import deleteOrder from './mutations/delete-order';
import putOrder from './mutations/put-order';

const ordersController = express.Router();

ordersController.get('/', getOrders);
ordersController.get('/:id', getOrder);

ordersController.post('/', jwtTokenMiddleware, createOrder);
ordersController.put('/:id', jwtTokenMiddleware, putOrder);
ordersController.delete('/:id', jwtTokenMiddleware, deleteOrder);

export default ordersController;
