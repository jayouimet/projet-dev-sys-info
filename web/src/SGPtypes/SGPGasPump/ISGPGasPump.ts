import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";

export default interface ISGPGasPump {
  id: string;
  name: string;
  gas_tank?: ISGPGasTank
}