import {Component, Input, OnInit} from '@angular/core';
import {Donor} from '../../model/donor.entity';
import {DonorService} from '../../services/donor.service';
import {Donation} from '../../model/donation.entity';
import {Campaign} from '../../model/campaign.entity';
import {DonationService} from '../../services/donation.service';
import {CampaignService} from '../../services/campaign.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-donate-page',
  standalone: false,
  templateUrl: './donate-page.component.html',
  styleUrl: './donate-page.component.css'
})
export class DonatePageComponent implements OnInit {
  donors: Array<Donor> = [];
  donations: Array<Donation> = [];
  campaigns: Array<Campaign> = [];

  constructor(private donorService: DonorService, private donationService: DonationService, private campaignService: CampaignService) { }
  ngOnInit() {
    forkJoin([this.donorService.getAll(), this.donationService.getAll(), this.campaignService.getAll()])
      .subscribe(([donorsData, donationsData, campaignsData]) => {
        this.donors = donorsData;
        this.donations = donationsData;
        this.campaigns = campaignsData.map(campaign => ({
          ...campaign,
          collectedUnits: 0
        }));
        const campaignsMap = new Map<number, Campaign>();
        this.campaigns.forEach(campaign => {
          campaignsMap.set(campaign.id, campaign);
        });
        this.donations.forEach(donation => {
          const campaign = campaignsMap.get(donation.campaignId);
          if (campaign) {
            campaign.collectedUnits += donation.quantity;
          }
        });
      });
  }
}
