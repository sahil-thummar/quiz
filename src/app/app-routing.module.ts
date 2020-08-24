import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './common/admin/navbar/navbar.component';
import { UserResultComponent } from './views/admin/dashboard/dashboard.component';
import { QuizsComponent } from './views/admin/quizs/quizs.component';
import { AddEditQuizComponent } from './views/admin/add-edit-quiz/add-edit-quiz.component';
import { LoginComponent } from './views/admin/login/login.component';

import { QuizComponent } from './views/user/quiz/quiz.component';
import { ResultComponent } from './views/user/result/result.component';

const routes: Routes = [
    { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/dashboard', component: UserResultComponent },
    { path: 'admin/quizs', component: QuizsComponent },
    { path: 'admin/quiz/add-edit-quiz', component: AddEditQuizComponent },
    { path: 'user/result', component: ResultComponent },
    { path: 'user/quiz', component: QuizComponent },    
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }