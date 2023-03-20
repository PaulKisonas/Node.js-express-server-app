import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import { OrderViewModel } from '../types';
import OrderModel from '../orders-model';

const getOrder: RequestHandler<
  { id?: string },
  OrderViewModel[] | ErrorResponse,
  undefined,
  {}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const orderViewModel = await OrderModel.getOrder(id);

    res.json(orderViewModel);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default getOrder;
