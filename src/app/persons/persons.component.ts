import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DbServiceService, Person} from '../db-service.service';
import {ModalWindowComponent} from '../modals/modal-window/modal-window.component';
import {RefDirective} from './ref.directive';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})

export class PersonsComponent implements OnInit {

  isNotification = false;
  photo = 'https://image.flaticon.com/icons/svg/848/848043.svg';

  personsArr: Person[] = [];

  text: string;

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective;

  constructor(private dbServices: DbServiceService,
              private resolver: ComponentFactoryResolver) { }


  ngOnInit(): void {
    this.getPersons();
  }

  onShowEditPerson(person: Person){
    const eventHandler = this.showModal( 'Редактирование сотрудника', 'Редактировать', person, 'edit');
    eventHandler.subscribe(value => this.onEditPerson(value));
  }

  onShowAddPerson(){
    const eventHandler = this.
    showModal( 'Добавление сотрудника', 'Добавить', { firstName: '', lastName: ''}, 'add');
    eventHandler.subscribe((value) => this.onAddPerson(value));
  }

  onShowDeletePerson(person: Person){
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

  onNotify(text: string, delay: number = 3000): void{
    this.text = text;
    this.isNotification = true;
    setTimeout(() => { this.isNotification = false; }, delay);
  }

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
