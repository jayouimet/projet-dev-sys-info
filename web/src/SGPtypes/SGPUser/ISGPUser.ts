export default interface ISGPUser {
  id: string;
  email?: string;
  phone_number?: string;
  name?: string;
  // employee_number: string;
  balance: number;
  /* role {
    id
    name
  }*/
}