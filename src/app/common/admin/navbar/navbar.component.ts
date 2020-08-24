import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    
    constructor(public router: Router, public helper: HelperService) { }
    
    admin_id;
    admin_token;
    
    ngOnInit() {
        
        this.admin_id = localStorage.getItem('admin_id');
        this.admin_token = localStorage.getItem('admin_token');

        const navbar = <HTMLFormElement>document.getElementById('navbar');
        const main = <HTMLFormElement>document.getElementById('main');
        
        navbar.style.display='none';
        main.style.width='100%';

        if(this.admin_id && this.admin_token){            
            this.helper.http_method_requester('api/admin/check_auth', {
                admin_id: this.admin_id, admin_token: this.admin_token
            }, false, false, false, (res_data) => {
                if (res_data.success) {
                    main.style.width='80%';
                    navbar.style.display='block';
                } else {
                    this.router.navigate(['admin/login']);
                }
            })
        } else {
            this.router.navigate(['admin/login']);
        }
    }

    logout() {
        localStorage.setItem('admin_id', "");
        localStorage.setItem('admin_token', "");
        this.router.navigate(['admin/login']);
    }

}