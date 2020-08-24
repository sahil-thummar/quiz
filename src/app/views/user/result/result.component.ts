import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    constructor(public helper: HelperService) { }

    results;
    addedit_result_title;
    title;

    ngOnInit() {
        this.helper.http_method_requester('api/result/getresult', {}, false, false, false, (res_data) => {
            this.results = res_data;
        });
    }
    
    add_result_title(result_title) {
        this.helper.http_method_requester('api/result/addresult', { result_title: result_title }, false, false, false, (res_data) => {
            this.ngOnInit();
        });
    }


    edit_result(id) {
        this.addedit_result_title = id;
    }

    update_result_title(id) {
        this.helper.http_method_requester('api/result/addresult', { _id: id, result_title: this.title }, false, false, false, (res_data) => {
            this.addedit_result_title = '';
            this.ngOnInit();
        });
    }
    
    change_title(event) {
        this.title = event.target.value;
    }
}