import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import ISGPGasType from "@sgp_types/SGPGasType/ISGPGasType";

export default interface ISGPGasTank {
  id?: string;
  name: string;
  volume: number;
  gas_type_id?: string;
  gas_type?: ISGPGasType;
  gas_pumps?: Array<ISGPGasPump>;
}