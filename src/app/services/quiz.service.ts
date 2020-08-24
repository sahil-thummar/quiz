import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable()
export class QuizService {

    constructor(private helper: HelperService) { }

    getAll() {
      this.helper.http_method_requester('api/quiz/addresult', { }, false, false, false, (res_data) => {
          return res_data;
      });
    }

    get(quiz_id) {
        this.helper.http_method_requester('api/result/addresult', {
            _id: quiz_id
        }, false, false, false, (res_data) => {
            return 
        });
    }
}