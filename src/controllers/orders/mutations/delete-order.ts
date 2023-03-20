import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import ForbiddenError from 'errors/forbidden-error';
import { OrderViewModel } from '../types';
import OrderModel from '../orders-model';

const deleteOrder: RequestHandler<
  { id?: string },
  OrderViewModel[] | ErrorResponse,
  {},
  {}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();
    const orderViewModel = await OrderModel.getOrder(id);

    if (req.authUser.role !== 'ADMIN' && req.authUser.userId !== orderViewModel[0].customerId) {
      throw new ForbiddenError();
    }

    await OrderModel.deleteOrder(id);

    res.status(200).json(orderViewModel);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default deleteOrder;
