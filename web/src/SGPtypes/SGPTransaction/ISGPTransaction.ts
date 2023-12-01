import ISGPGasStation from "@sgp_types/SGPGasStation/ISGPGasStation";
import ISGPUser from "@sgp_types/SGPUser/ISGPUser";

export default interface ISGPTransaction {
  id: string;
  total: number;
  subtotal: number;
  volume: number;
  taxes: number;
  type: string;
  data: {
    [key: string]: string
  };
  user?: ISGPUser;
  gas_station?: ISGPGasStation;
  unit_price: number;
  created_at: string;
}