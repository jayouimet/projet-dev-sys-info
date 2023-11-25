import ISGPGasStation from "@sgp_types/SGPGasStation/ISGPGasStation";
import ISGPRole from "@sgp_types/SGPRole/ISGPRole";
import ISGPTransaction from "@sgp_types/SGPTransaction/ISGPTransaction";

export default interface ISGPUser {
  id: string;
  email?: string;
  phone_number?: string;
  name?: string;
  // employee_number: string;
  balance: number;
  role?: ISGPRole;
  gas_station?: ISGPGasStation;
  transactions?: Array<ISGPTransaction>;
}