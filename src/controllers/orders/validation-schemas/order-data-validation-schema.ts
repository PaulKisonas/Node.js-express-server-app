import * as yup from 'yup';
import { OrderData, OrderItemData } from '../types';

const orderDataValidationSchema: yup.ObjectSchema<OrderData> = yup.object({
    orderDate: yup.string()
        .required('order date is required'),

    orderItems: yup.array<OrderItemData>().required(),
}).strict(true);

export default orderDataValidationSchema;
