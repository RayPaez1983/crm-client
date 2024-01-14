export type Client = {
  created: string;
  email: string;
  id: string;
  lastname: string;
  name: string;
  order: string;
  phoneNumber: string;
};

export interface NewClient  {
  email: string;
  lastname: string;
  name: string;
  phoneNumber: string;
  password: string;
  order: string;
};

export interface Menu  {
  id:string;
  dishName: string;
  protein: string;
  carbohydrates: string;
  vegetables: string;
  inStock: number;
  price: number;
};

export type OrderState= 'PENDING' | 'COMPLETED' | 'CANCELLED'

export interface OrderGroupInput {
    id: string;
    quantity: number;
  }

export type Order = { 
    order: OrderGroupInput[];
    total: number;
    table: number;
    persons: number;
    client: string;
    state: string;
  }
