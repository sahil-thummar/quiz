import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class UserResultComponent implements OnInit {

    constructor(public helper: HelperService) { }

    results;

    ngOnInit() {
        this.helper.http_method_requester('api/result/getresult', {}, false, false, false, (res_data) => {
            this.results = res_data;
        });
    }
}