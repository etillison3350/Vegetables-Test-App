import { Component, OnInit } from '@angular/core';

import { VegetablesService } from '../vegetables.service';

import { Vegetable } from '../vegetable';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	vegetables: Vegetable[] = [];

	constructor(private vegetableService: VegetablesService) {}

	ngOnInit() {
		this.vegetableService.getTopVegetables(5).subscribe(vegetables => this.vegetables = vegetables);
	}

}
