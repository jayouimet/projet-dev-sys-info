import ISGPUser from "@sgp_types/SGPUser/ISGPUser";

export default class SGPUser implements ISGPUser {
  id?: string;
  email?: string;
  phone_number?: string;
  balance: number;
  name?: string;

  constructor(user: ISGPUser) {
    this.id = user.id;
    this.email = user.email;
    this.phone_number = user.phone_number;
    this.balance = user.balance;
    this.name = user.name;
  }
}