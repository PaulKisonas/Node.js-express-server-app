import NotFoundError from 'errors/not-found-error';

class OrderNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Order with id '${id}' was not found`);
  }
}

export default OrderNotFoundError;
