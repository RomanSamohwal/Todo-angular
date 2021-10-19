import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // @ts-ignore
  tasks: Task[];


  constructor(private dataHandlerService: DataHandlerService) {
  }

  toggleTaskCompleted(task: Task) {
     task.completed = !task.completed
  }

  ngOnInit(): void {
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks)
  }
}
