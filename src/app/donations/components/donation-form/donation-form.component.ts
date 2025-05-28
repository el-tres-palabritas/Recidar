import {Component, Input, OnInit} from '@angular/core';
import {Donor} from '../../model/donor.entity';
import {Donation} from '../../model/donation.entity';
import {Campaign} from '../../model/campaign.entity';
import {FormControl, FormGroup} from '@angular/forms';
import {DonationService} from '../../services/donation.service';
import {Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ThanksDialogComponent} from '../thanks-dialog/thanks-dialog.component';

@Component({
  selector: 'app-donation-form',
  standalone: false,
  templateUrl: './donation-form.component.html',
  styleUrl: './donation-form.component.css'
})
export class DonationFormComponent implements OnInit {
  @Input() donors: Array<Donor> = [];
  @Input() donations: Array<Donation> = [];
  @Input() campaigns: Array<Campaign> = [];
  selectedItems?: Array<string> = [];
  donationForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    campaign: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    condition: new FormControl('', [Validators.required])
  })

  constructor(private donationService: DonationService, private thanksDialog: MatDialog) { }

  onSubmit() {
    // Add validators for 'id' field to confirm all objects are loaded
    this.donationForm.get('id')?.setValidators([Validators.required, Validators.min(1), Validators.max(this.donors.length)]);
    this.donationForm.get('id')?.updateValueAndValidity();
    if (this.donationForm.invalid) {
      this.donationForm.markAllAsTouched();
      console.log('Invalid Form');
      console.log(this.donors.length);
      return;
    }
    this.donationService.create({
      donorId: this.donationForm.get('id')?.value,
      campaignId: this.donationForm.get('campaign')?.value,
      itemType: this.donationForm.get('type')?.value,
      quantity: this.donationForm.get('quantity')?.value,
      condition: this.donationForm.get('condition')?.value
    }).subscribe(data => {
      console.log("Donation created successfully: ", data)
    });
    this.thanksDialog.open(ThanksDialogComponent)
  }

  ngOnInit() {
    this.donationForm.get('campaign')?.valueChanges
      .subscribe(campaignId => {
        if (campaignId) {
          this.selectedItems = this.campaigns.find(c => c.id === campaignId)?.targetItems;
          console.log(this.selectedItems)
        }
      })
  }
}
