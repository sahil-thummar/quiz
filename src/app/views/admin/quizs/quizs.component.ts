import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'app-quizs',
    templateUrl: './quizs.component.html',
    styleUrls: ['./quizs.component.css']
})
export class QuizsComponent implements OnInit {
    
    constructor(public helper: HelperService) { }
    
    quizs;
    
    ngOnInit() {
        this.helper.http_method_requester('api/quiz/getquizs', {
        }, false, false, false, (res_data) => {
          this.quizs = res_data;
        });

    }
    deletequiz(id){
        if(confirm("Are you sure want to delete?")){
            this.helper.http_method_requester('api/quiz/deletequiz', {
                quiz_id: id
            }, false, false, false, (res_data) => {
                this.ngOnInit();
            }); 
        }        
    }
}