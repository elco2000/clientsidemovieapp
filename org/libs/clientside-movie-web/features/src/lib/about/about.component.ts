import { Component, OnInit } from "@angular/core";


@Component({
    selector: 'org-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() {}

    imageErd?: string;
    imageEntiteit?: string;
    imageScenarios?: string;
    imageQuerys?: string;

    ngOnInit(): void {
        this.imageErd = "assets/ERD.png";
        this.imageEntiteit = "assets/Entiteiten.png"
        this.imageScenarios = "assets/Scenarios.png"
        this.imageQuerys = "assets/Querys.png"
    }
}