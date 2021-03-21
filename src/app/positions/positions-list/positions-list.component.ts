import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../position.model';
import { Router } from '@angular/router';
import { PositionsService } from '../positions.service';

@Component({
  selector: 'careers-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.scss']
})
export class PositionsListComponent implements OnInit {
  public positions$: Observable<Position[]>;

  constructor(private positionsService: PositionsService, private router: Router) {}

  ngOnInit() {
    this.positions$ = this.positionsService.getActivePositions$();
  }

  seePosition(id: string) {
    this.router.navigate(['/positions', id]);
  }
}
