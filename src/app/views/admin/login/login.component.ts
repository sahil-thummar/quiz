import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public helper: HelperService) { }
    
    admin_id;
    admin_token;
    
    ngOnInit() {
        
        this.admin_id = localStorage.getItem('admin_id');
        this.admin_token = localStorage.getItem('admin_token');

        const navbar = <HTMLFormElement>document.getElementById('navbar');
        const main = <HTMLFormElement>document.getElementById('main');
        
        navbar.style.display='none';
        main.style.width='100%';

        this.helper.http_method_requester('api/admin/check_auth', {
            admin_id: this.admin_id, admin_token: this.admin_token
        }, false, false, false, (res_data) => {
            if (res_data.success) {
                main.style.width='80%';
                navbar.style.display='block';
                this.helper.router.navigate(['admin/dashboard']);
            } else {               
                this.helper.router.navigate(['admin/login']);
            }
        })
    }

    login(admin) {
        this.helper.http_method_requester('api/admin/login', admin, false, false, false, (res_data) => {
            if (res_data.success == true) {
                localStorage.setItem('admin_id', res_data.admin_data._id);
                localStorage.setItem('admin_token', res_data.admin_data.server_token);
                this.helper.router.navigate(['admin/quizs']);
            }
        })
    }
}