import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Donation} from '../model/donation.entity';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonationService extends BaseService<Donation> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/donations';
  }
}
