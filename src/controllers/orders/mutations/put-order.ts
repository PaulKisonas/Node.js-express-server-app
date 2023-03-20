import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import ForbiddenError from 'errors/forbidden-error';
import { OrderViewModel, OrderDataBody } from '../types';
import orderDataValidationSchema from '../validation-schemas/order-data-validation-schema';
import OrderModel from '../orders-model/index';

const putOrder: RequestHandler<
  { id?: string },
  OrderViewModel | ErrorResponse,
  OrderDataBody,
  {}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();
    const orderToUpdate = await OrderModel.getOrder(id);

    if (req.authUser.role !== 'ADMIN' && req.authUser.userId !== orderToUpdate[0].customerId) {
      throw new ForbiddenError();
    }
    const orderData = orderDataValidationSchema.validateSync(req.body);
    const orderViewModel = await OrderModel.replaceOrder(id, orderData, req.authUser.userId);

    res.status(200).json(orderViewModel);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default putOrder;
