import ISGPUser from "@sgp_types/SGPUser/ISGPUser";

export default interface ISGPRole {
  id: string;
  name: string;
  users: Array<ISGPUser>;
}