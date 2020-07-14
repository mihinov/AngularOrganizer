import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService, Task } from '../shared/tasks.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

    form: FormGroup;
    tasks: Task[] = [];

    constructor(public dateService: DateService,
                private taskService: TaskService) {

    }

    ngOnInit(): void {
        this.dateService.date.pipe(
            switchMap(value => this.taskService.load(value))
        ).subscribe(
            tasks => {
                this.tasks = tasks;
            }
        );

        this.form = new FormGroup({
            title: new FormControl('', Validators.required)
        });
    }

    submit() {
        const {title} = this.form.value;

        const task: Task = {
            title,
            date: this.dateService.date.value.format('DD-MM-YYYY')
        };

        this.taskService.create(task)
            .subscribe(
                taskRes => {
                    console.log('New task:', taskRes);
                    this.tasks.push(taskRes);
                    this.form.reset();
                },
                err => {
                    console.error(err);
                }
            );

        console.log(title);
    }

    remove(task: Task) {
        this.taskService.remove(task).subscribe(
            () => {
                this.tasks = this.tasks.filter(t => t.id !== task.id);
            },
            err => {
                console.error(err);
            }
        );
    }

}
