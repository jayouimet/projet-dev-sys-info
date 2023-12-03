import ISGPRole from "@sgp_types/SGPRole/ISGPRole";
import ISGPTransaction from "@sgp_types/SGPTransaction/ISGPTransaction";

export default interface ISGPUser {
  id?: string;
  email?: string;
  password_hash?: string;
  phone_number?: string;
  name?: string;
  // employee_number: string;
  balance: number;
  role_id?: string;
  role?: ISGPRole;
  transactions?: Array<ISGPTransaction>;
}