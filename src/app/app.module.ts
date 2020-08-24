import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NavbarComponent } from './common/admin/navbar/navbar.component';
import { UserResultComponent } from './views/admin/dashboard/dashboard.component';
import { QuizsComponent } from './views/admin/quizs/quizs.component';
import { AddEditQuizComponent } from './views/admin/add-edit-quiz/add-edit-quiz.component';
import { LoginComponent } from './views/admin/login/login.component';
import { HelperService } from './services/helper.service';

import { QuizComponent } from './views/user/quiz/quiz.component';
import { ResultComponent } from './views/user/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserResultComponent,
    ResultComponent,
    QuizsComponent,
    AddEditQuizComponent,
    LoginComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }