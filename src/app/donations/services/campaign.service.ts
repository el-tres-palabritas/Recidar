import { Injectable } from '@angular/core';
import {Campaign} from '../model/campaign.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService extends BaseService<Campaign>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/campaigns'
  }
}
