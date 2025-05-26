export class Campaign {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  targetItems: Array<string>;
  collectedUnits: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.location = '';
    this.startDate = '';
    this.endDate = '';
    this.targetItems = [];
    this.collectedUnits = 0;
  }

}
