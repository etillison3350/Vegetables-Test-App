import { Component, OnInit } from '@angular/core';
import { Vegetable } from '../vegetable';
import { VegetablesService } from '../vegetables.service';
import { AuthenticationService } from '../authentication.service';

@Component({
	selector: 'app-vegetables',
	templateUrl: './vegetables.component.html',
	styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {
		
	vegetables: Vegetable[];

	constructor(private auth: AuthenticationService, private vegetableService: VegetablesService) {}

	ngOnInit() {
		this.getVegetables();
	}

	add(vegetableName: string, vegetableColor: string): void {
		this.vegetableService.addVegetable({name: vegetableName, color: vegetableColor, id: -1}).subscribe(vegetable => {
			if (vegetable) this.vegetables.push(vegetable);
		});
	}

	delete(vegetable: Vegetable): void {
		this.vegetableService.deleteVegetable(vegetable).subscribe();
		this.vegetables = this.vegetables.filter(h => h !== vegetable);
	}

	getVegetables(): void {
		this.vegetableService.getVegetables().subscribe(vegetables => this.vegetables = vegetables);
	}

}
