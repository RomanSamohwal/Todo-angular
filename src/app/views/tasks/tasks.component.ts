import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from 'src/app/model/Category';
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category','operations', 'select'];
  // @ts-ignore
  public dataSource: MatTableDataSource<Task> // контейнер - источник данных для таблицы
  private priorities: Priority[] = []; // список приоритетов (для фильтрации задач)
  // ссылки на компоненты таблицы
  // @ts-ignore
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  // текущие задачи для отображения на странице
  // @ts-ignore
  private tasks: Task[];

  @Input('tasks')
  private set setTasks(tasks: Task[]) {// напрямую не присваиваем значения в переменную, только через @Input
    this.tasks = tasks
    this.fillTable()
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>()

  @Output()
  selectCategory = new EventEmitter<Category>(); // нажали на категорию из списка задач

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  // поиск
  private searchTaskText: string = '' // текущее значение для поиска задач
  private selectedStatusFilter: boolean | null = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  private selectedPriorityFilter: Priority | null = null;   // по-умолчанию будут показываться задачи по всем приоритетам

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog, // работа с диалоговым окном
  ) {
  }

  ngOnInit() {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.fillTable();// заполняем таблицы данными (задачи) и всеми метаданными
  }

  ngAfterViewInit() {
    this.addTableObjects()
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  public getPriorityColor(task: Task) : string {

    if (task.completed) {
      return `#F8F9FA`
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  // диалоговое окно подтверждения удаления
  private openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.title}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteTask.emit(task);
      }
    });
  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private fillTable() {

    if (!this.dataSource) {
      return
    }

    this.addTableObjects()
    // @ts-ignore
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'title': {
          return task.title;
        }
      }
    };
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  // диалоговое редактирования для добавления задачи
   openEditTaskDialog(task: Task): void {

    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов

      if (result === 'complete') {
        task.completed = true; // ставим статус задачи как выполненная
        this.updateTask.emit(task);
      }


      if (result === 'activate') {
        task.completed = false; // возвращаем статус задачи как невыполненная
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) { // если нажали ОК и есть результат
        this.updateTask.emit(task);
        return;
      }

    });
  }

  private onSelectCategory(category: any) {
    this.selectCategory.emit(category);
  }

  // фильтрация по статусу
  private onFilterByStatus(value: boolean) {
    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  // фильтрация по названию
  private onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  // фильтрация по приоритету
  private onFilterByPriority(value: Priority) {

    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }
}

