import ServerSetupError from 'errors/server-setup-error';
import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import OrderModel from '../orders-model';
import { OrderDataBody, OrderViewModel } from '../types';
import orderDataValidationSchema from '../validation-schemas/order-data-validation-schema';

const createOrder: RequestHandler<
  {},
  OrderViewModel | ErrorResponse,
  OrderDataBody,
  {}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();
    const orderData = orderDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const orderViewModel = await OrderModel.createOrder(orderData, req.authUser.userId);
    res.status(201).json(orderViewModel);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default createOrder;
