import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../services/helper.service';

@Component({
    selector: 'app-add-edit-quiz',
    templateUrl: './add-edit-quiz.component.html',
    styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {
    
    constructor(private el: ElementRef,public router: Router, public helper: HelperService) {}

    quizid;
    photo;
    quiz;
    
    public formData = new FormData();

    ngOnInit() {       
        this.quizid = this.helper.Router_Id.Quiz_Id;
        if(this.quizid){
            this.helper.http_method_requester('api/quiz/getquiz', {
                quizid: this.quizid
            }, false, false, false, (res_data) => {
                this.quiz = res_data;
            });
        } else {
            this.quiz = {
                Title: '',
                Image:'',
                Video: '',
            };
        }
    }

    update_Image($event){
        const files = $event.target.files || $event.srcElement.files;
        const temp_image = files[0];
        const index = this.helper.Image_type.indexOf(temp_image.type);
        if (index !== -1) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const new_image = new Image();
                new_image.src = e.target.result;
                new_image.onload = () => {
                    this.formData.append('image', temp_image);
                    this.quiz.Image = e.target.result;
                }
            }
            reader.readAsDataURL(temp_image);
        }else{
            alert("Please Enter Valid Image");
        }
    }

    update_video($event){
        const files = $event.target.files || $event.srcElement.files;
        const temp_video = files[0];

        const reader = new FileReader();
        reader.onload = (e: any) => {
                this.formData.append('video', temp_video);
                this.quiz.Video = e.target.result;
        }
        reader.readAsDataURL(temp_video);
    }

    add_quiz(){
        this.helper.http_method_requester('api/quiz/addquiz', this.quiz, false, false, false, (res_data) => {
            this.router.navigate(['admin/quiz']);
        }); 
    }

    update_quiz(){
        if(confirm("Are you sure want to Update?")){
            this.helper.http_method_requester('api/quiz/updatequiz', this.quiz, false, false, false, (res_data) => {
                this.router.navigate(['admin/quiz']);
            });
        }        
    }
}