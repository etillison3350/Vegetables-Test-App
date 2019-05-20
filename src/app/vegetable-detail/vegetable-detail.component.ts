import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VegetablesService } from '../vegetables.service';

import { Vegetable } from '../vegetable';
import { AuthenticationService } from '../authentication.service';

@Component({
	selector: 'app-vegetable-detail',
	templateUrl: './vegetable-detail.component.html',
	styleUrls: ['./vegetable-detail.component.css']
})
export class VegetableDetailComponent implements OnInit {

	vegetable: Vegetable;

	constructor(private auth: AuthenticationService, private route: ActivatedRoute, private vegetableService: VegetablesService, private location: Location) { }

	ngOnInit() {
		const id = +this.route.snapshot.paramMap.get('id');
		this.vegetableService.getVegetable(id).subscribe(vegetable => this.vegetable = vegetable);
	}
	
	save(): void {
		this.vegetableService.updateVegetable(this.vegetable).subscribe(() => this.goBack());
	}
	
	goBack(): void {
		this.location.back();
	}
}
