import {Component, OnInit} from '@angular/core';
import {Campaign} from '../../../donations/model/campaign.entity';
import {CampaignService} from '../../../donations/services/campaign.service';
import {Donation} from '../../../donations/model/donation.entity';
import {DonationService} from '../../../donations/services/donation.service';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  campaigns: Array<Campaign> = [];
  donations: Array<Donation> = [];

  constructor(private campaignService: CampaignService, private donationService: DonationService) {}

  ngOnInit() {
    forkJoin([this.campaignService.getAll(), this.donationService.getAll()])
      .subscribe(([campaignsData, donationsData]) => {
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
        })
      });
  }
}
