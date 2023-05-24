import { CartItems, ShippingAddress } from "./Cart";
import { User } from "./User";

export type Order = {
  _id: string;
  orderItems: CartItems[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  user: User;
  createdAt: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
