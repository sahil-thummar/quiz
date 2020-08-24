import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class HelperService {
    
    BASE_URL: string = 'http://localhost:8000/';
    
    Router_Id: any = {
        Quiz_Id: '',
    };

    Image_type: any = [ 
        "image/jpg", 
        "image/jpeg", 
        "image/png"
    ]

    constructor(public router: Router,public active_route: ActivatedRoute, public http: HttpClient){

    }
    
    http_method_requester(api_name, parameter, loader, success_message, error_message, response) {
        this.http.post(this.BASE_URL + api_name, parameter).pipe(map((res)=>Object(res))).subscribe((res_data) => {
            response(res_data);
        }, (error) => {
            console.log(error)
        });
    }

    static toBool(val) {
        if (val === undefined || val === null || val === '' || val === 'false' || val === 'False') {
            return false;
        } else {
            return true;
        }
    }

    static shuffle(array) {
        let currentIndex = array.length, temp, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }
    
    static extend(out) {
        out = out || {};

        for (let i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue;
            }

            for (const key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key];
                }
            }
        }
        return out;
    }
}
