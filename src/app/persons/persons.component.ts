import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DbServiceService, Person} from '../db-service.service';
import {ModalWindowComponent} from '../modals/modal-window/modal-window.component';
import {RefDirective} from './ref.directive';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})

// Компонент отображает список сотрудников
export class PersonsComponent implements OnInit {

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective;

  // isNotification и text переменные для уведомления
  // для изменения видимости и текста уведомления соответсвенно
  isNotification = false;
  text: string;
  photo = 'https://image.flaticon.com/icons/svg/848/848043.svg';
  personsArr: Person[] = [];

  // dbServices для работы с запросами
  // resolver для работы с модальным окном
  constructor(private dbServices: DbServiceService,
              private resolver: ComponentFactoryResolver) { }


  ngOnInit(): void {
    this.getPersons();
  }

  // onShow... используеся для отображения модального окна с разным функционалом
  onShowEditPerson(person: Person): void{
    const eventHandler = this.showModal( 'Редактирование сотрудника', 'Редактировать', person, 'edit');
    eventHandler.subscribe(value => this.onEditPerson(value));
  }

  onShowAddPerson(): void{
    const eventHandler = this.
    showModal( 'Добавление сотрудника', 'Добавить', { firstName: '', lastName: ''}, 'add');
    eventHandler.subscribe((value) => this.onAddPerson(value));
  }

  onShowDeletePerson(person: Person): void{
    const eventHandler = this.showModal( 'Удаление сотрудника', 'Удалить', person, 'delete');
    eventHandler.subscribe((value) => this.onDeletePerson(value));
  }

  getPersons(): void{
    this.dbServices.getPersons()
      .subscribe(response => { this.personsArr = response; },
        error => { this.onNotify(this.dbServices.errorHandler(error)); });
  }

  onEditPerson(person: Person): void {
    this.dbServices.editPerson(person)
      .subscribe(response => {
        this.personsArr = this.personsArr.map(item => item.id === person.id ?  person : item );
        this.onNotify('Изменения сохранены');
        },
        error => { this.onNotify(this.dbServices.errorHandler(error)); }
      );
    this.closeModal();
  }

  onAddPerson(newPerson: Person): void {
    this.dbServices.addPerson(newPerson)
      .subscribe(response => {
          this.personsArr.push(response);
          this.onNotify('Добавлен новый сотрудник');
        },
        error => { this.onNotify(this.dbServices.errorHandler(error)); }
      );
    this.closeModal();
  }

  onDeletePerson(person: Person): void {
    this.dbServices.deletePerson(person.id)
      .subscribe(response => {
          this.personsArr = this.personsArr.filter(item => item.id !== person.id);
          this.onNotify('Сотрудник удалён');
        },
        error => { this.onNotify(this.dbServices.errorHandler(error)); }
      );
    this.closeModal();
  }

  // onNotify отображает уведомление
  onNotify(text: string, delay: number = 3000): void{
    this.text = text;
    this.isNotification = true;
    setTimeout(() => { this.isNotification = false; }, delay);
  }

  // showModal отображение модалки
  // принимает заголовок, текст одной кнопки, объект сотрудника и тип
  // есть 3 типа: 'delete', 'add', 'edit'
  showModal( title: string, button: string, person: Person, type: string): any{
    const modalFactory = this.resolver.resolveComponentFactory(ModalWindowComponent);
    this.refDir.containerRef.clear();
    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.title = title;
    component.instance.buttonText = button;
    component.instance.person = person;
    component.instance.isClose.subscribe(() => this.closeModal());
    component.instance.type = type;
    if (type === 'delete'){
      component.instance.onDisable();
    } else {component.instance.onEnable(); }
    return  component.instance.outPerson;
  }

  closeModal(){
    this.refDir.containerRef.clear();
  }

}
