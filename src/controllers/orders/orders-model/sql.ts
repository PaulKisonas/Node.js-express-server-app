const SELECT = `
  SELECT o.order_id,
         o.order_date,
         u.name,
         p.name,
         oi.quantity,
         p.price
  FROM orders as o
         JOIN users u ON o.customer_id = u.userId
         JOIN order_items oi ON o.order_id = oi.order_id
         JOIN products p ON oi.product_id = p.product_id
`;

const SQL = {
  SELECT,
} as const;

export default SQL;
