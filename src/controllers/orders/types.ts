export type OrderViewModel = {
    orderId: number,
    orderDate: string,
    customerId: number
};

export type OrderItemViewModel = {
    orderItemId: number,

    orderId: number,

    productId: number,

    quantity: number
};

export type ProductViewModel = {
    productId: number,
    name: string,
    price: number
};

export type ProductData = Omit<ProductViewModel, 'productId'>;

export type OrderItemData = Omit<OrderItemViewModel, 'orderItemId' | 'orderId'>;

export type OrderData = Omit<OrderViewModel, 'orderId' | 'customerId'> & {
    orderItems: OrderItemData[]
};

export type OrderDataBody = PartialRecursive<OrderData>;
