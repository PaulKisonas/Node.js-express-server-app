import config from 'config';
import mysql from 'mysql2/promise';
import OrderNotFoundError from '../order-not-found-error';
import {OrderData, OrderViewModel} from '../types';
import SQL from './sql';

const getOrders = async (): Promise<OrderViewModel[]> => {
    const connection = await mysql.createConnection(config.database);

    const sql = `
  ${SQL.SELECT}
  `;

    const [orders] = await connection.query(sql);

    connection.end();

    return orders as OrderViewModel[];
};

const getOrder = async (id: string): Promise<OrderViewModel[]> => {
    const connection = await mysql.createConnection(config.database);

    const preparedSql = `
  ${SQL.SELECT}
  where o.order_id = ?`;
    const bindings = [id];

    const [orders] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);
    connection.end();

    if (orders.length === 0) throw new OrderNotFoundError(id);

    return orders as OrderViewModel[];
};

const deleteOrder = async (id: string): Promise<void> => {
    const connection = await mysql.createConnection(config.database);
    const preparedSql = `
        DELETE
        from order_items
        WHERE order_id = ?;

        DELETE
        from orders
        WHERE order_id = ?;`;

    const bindings = [id, id];
    await connection.query(preparedSql, bindings);
    connection.end();
};

const createOrder = async (orderData: OrderData, customerId: number): Promise<OrderViewModel> => {
    const connection = await mysql.createConnection(config.database);

    const preparedSql = `
        insert into orders (order_date, customer_id)
        values (?, ?);

        set
            @created_order_id = last_insert_id();

        insert into order_items (order_id, product_id, quantity)
        values ${orderData.orderItems.map(() => '(@created_order_id, ?, ?)').join(',\n')};

        ${SQL.SELECT}
        where o.order_id = @created_order_id;
    `;
    const bindings = [
        new Date(orderData.orderDate),
        customerId,
        ...orderData.orderItems,
    ];

    const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(preparedSql, bindings);
    const [order] = queryResult[queryResult.length - 1] as OrderViewModel[];

    connection.end();

    return order;
};

const replaceOrder = async (orderId: string, orderData: OrderData, customerId: number)
    : Promise<OrderViewModel> => {
    const connection = await mysql.createConnection(config.database);

    const preparedSql = `
        update orders
        set order_date = ?,
            customer_id= ?
        where order_id = ?;

        ${SQL.SELECT}
        where orders.order_id = ?;
    `;

    const bindings = [
        new Date(orderData.orderDate),
        customerId,
        orderId,
    ];

    const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(preparedSql, bindings);
    const [order] = queryResult[queryResult.length - 1] as OrderViewModel[];

    connection.end();

    return order;
};

const OrderModel = {
    getOrders,
    getOrder,
    deleteOrder,
    createOrder,
    replaceOrder,
};

export default OrderModel;
