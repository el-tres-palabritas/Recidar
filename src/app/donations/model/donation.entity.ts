export class Donation {
  id: number;
  donorId: number;
  campaignId: number;
  itemType: string;
  quantity: number;
  condition: string;

  constructor() {
    this.id = 0;
    this.donorId = 0;
    this.campaignId = 0;
    this.itemType = '';
    this.quantity = 0;
    this.condition = '';
  }
}
