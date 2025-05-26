import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: false,
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent implements OnInit {
  invalidUrl: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.invalidUrl = '';
  }
  ngOnInit() {
    this.route.snapshot.url.forEach((url) => {
      this.invalidUrl += `${url.path}/`;
    });
    this.invalidUrl = this.invalidUrl.slice(0, -1);
  }

  onHomeButton() {
    this.router.navigate(['home']).then();
  }
}
