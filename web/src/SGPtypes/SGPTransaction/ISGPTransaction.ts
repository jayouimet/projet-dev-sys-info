import ISGPGasStation from "@sgp_types/SGPGasStation/ISGPGasStation";
import ISGPUser from "@sgp_types/SGPUser/ISGPUser";

export default interface ISGPRole {
  id: string;
  amount: number;
  type: string;
  data: object;
  user?: ISGPUser;
  gas_station?: ISGPGasStation;
}