import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css'],
    providers: [QuizService]
})
export class QuizComponent implements OnInit {
    
    quizs: any[];
    quiz: any;
    mode = 'quiz';
    quizName: string;
    
    config: any = {
        'allowBack': true,
        'allowReview': true,
        'autoMove': false,
        'duration': 300,
        'pageSize': 1,
        'requiredAll': false,
        'richText': false,
        'shuffleQuestions': false,
        'shuffleOptions': false,
        'showClock': false,
        'showPager': true,
        'theme': 'none'
    };

    pager = {
        index: 0,
        size: 1,
        count: 1
    };
    timer: any = null;
    startTime: Date;
    endTime: Date;
    ellapsedTime = '00:00';
    duration = '';

    constructor(private quizService: QuizService) { }

    ngOnInit() {
        this.quiz = this.quizService.getAll();
        this.quizName = this.quizs[0]._id;
        this.quiz = this.quizService.get(this.quizName);
        this.pager.count = this.quiz.questions.length;
        this.startTime = new Date();
        this.ellapsedTime = '00:00';
        this.timer = setInterval(() => { this.tick(); }, 1000);
        this.duration = this.parseTime(this.config.duration);
        this.mode = 'quiz';
    }

    tick() {
        const now = new Date();
        const diff = (now.getTime() - this.startTime.getTime()) / 1000;
        if (diff >= this.config.duration) {
            this.onSubmit();
        }
        this.ellapsedTime = this.parseTime(diff);
    }

    parseTime(totalSeconds: number) {
        let mins: string | number = Math.floor(totalSeconds / 60);
        let secs: string | number = Math.round(totalSeconds % 60);
        mins = (mins < 10 ? '0' : '') + mins;
        secs = (secs < 10 ? '0' : '') + secs;
        return `${mins}:${secs}`;
    }

    get filteredQuestions() {
        return (this.quiz.questions) ? this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
    }

    goTo(index: number) {
        if (index >= 0 && index < this.pager.count) {
            this.pager.index = index;
            this.mode = 'quiz';
        }
    }

    isAnswered(question) {
        return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
    };

    isCorrect(question) {
        return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
    };

    onSubmit() {
        let answers = [];
        this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
        this.mode = 'result';
    }
}