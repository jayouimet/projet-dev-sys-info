import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";
import ISGPTransaction from "@sgp_types/SGPTransaction/ISGPTransaction";
import ISGPUser from "@sgp_types/SGPUser/ISGPUser";

export default interface ISGPGasStation {
  id: string;
  name: string;
  address: string;
  gas_tanks?: Array<ISGPGasTank>;
  gas_pumps?: Array<ISGPGasPump>;
  users?: Array<ISGPUser>;
  transactions?: Array<ISGPTransaction>;
}