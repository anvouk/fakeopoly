import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css']
})
export class InvalidComponent implements OnInit {
  invalidGameId?: string;
  reason?: string;

  constructor(
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.invalidGameId = params['game'];
      this.reason = params['reason'];
    })
  }
}
