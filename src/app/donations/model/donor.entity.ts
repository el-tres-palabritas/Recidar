export class Donor {
  id: number;
  firstName: string;
  lastName: string;
  contact: Array<string>;
  totalDonations: number;

   constructor() {
     this.id = 0;
     this.firstName = '';
     this.lastName = '';
     this.contact = [];
     this.totalDonations = 0;
   }
}
