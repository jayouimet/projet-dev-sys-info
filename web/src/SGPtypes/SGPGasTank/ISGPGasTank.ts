import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import ISGPGasStation from "@sgp_types/SGPGasStation/ISGPGasStation";
import ISGPGasType from "@sgp_types/SGPGasType/ISGPGasType";

export default interface ISGPGasTank {
  id: string;
  name: string;
  volume: number;
  gas_type?: ISGPGasType;
  gas_station?: ISGPGasStation;
  gas_pumps?: Array<ISGPGasPump>;
}