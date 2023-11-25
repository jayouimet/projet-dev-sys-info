import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";

export default interface ISGPGasType {
  id: string;
  name: string;
  price: number;
  gas_tanks?: Array<ISGPGasTank>
}