import ISGPUser from "@sgp_types/SGPUser/ISGPUser";

export default interface ISGPTransaction {
  id?: string;
  total: number;
  subtotal: number;
  volume: number;
  taxes: number;
  type: string;
  data: {
    [key: string]: string
  };
  user?: ISGPUser;
  unit_price: number;
  created_at?: string;
  user_id?: string;
}