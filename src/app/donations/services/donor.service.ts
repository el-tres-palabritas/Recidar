import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Donor} from '../model/donor.entity';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonorService extends BaseService<Donor>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/donors'
  }
}
