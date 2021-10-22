import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from './model/Task'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo-angular';
  tasks: Task[] = []

  constructor(private dataHandler: DataHandlerService,//фасад для работы с данными
  ) {
  }

  ngOnInit() {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }
}
