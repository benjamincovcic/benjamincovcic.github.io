import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Item } from './item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  modalRef:any;
  @ViewChild('addItem') addItem;
  @ViewChild('editItem') editItem;
  public itemForm: FormGroup;
  public edit=false;


  private headElements=["Name", "Age", "City", "Occupation", "Phone", "E-mail", "Company"];
  public data=[];
  private temp=[];
  public searchName = "";
  public filterQuery = "";
  public sortName=-1;
  public sortAge=-1;
  public sortCity=-1;
  public sortOccupation=-1;
  public sortPhone=-1;
  public sortEmail=-1;
  public sortCompany=-1;
  public fullData=false;
  public editID;
  
  public staticData=[];
  public counter=0;
  
  
  constructor(private dataService: DataService, private modalService: BsModalService, public formBuilder: FormBuilder){
    this.dataService.getPaginationData((err)=>{
      if(err){ 
      alert("Error");
      return;
      }
      console.log("tututut");
      this.data=this.dataService.data;
      this.staticData=this.dataService.data;
      
      console.log(this.data);
      
      
    }, this.counter);
  }
  onInit(){
    
  }
  
  openAddItem() {
    this.edit=false;
    this.setItemForm(new Item() );
    this.modalRef = this.modalService.show(this.addItem, { 'class': 'createArticleModal', 'backdrop': 'static', 'keyboard': false });
  }
  openEditItem(id){
    this.editID=id;
    this.edit=true;
    var newItem:any;
    newItem=this.data[id];
    this.setItemForm(newItem);
    this.modalRef = this.modalService.show(this.editItem, { 'class': 'createArticleModal', 'backdrop': 'static', 'keyboard': false });

  }
  closeModal() {
    this.modalRef.hide();
  }

  submitForm(item){

    if(!this.edit)
    {
      this.data.unshift({
        name:item.name,
        age:item.age,
        city:item.city,
        occupation:item.occupation,
        phone:item.phone,
        email:item.email,
        company:item.company
      })
    }
    else{
      this.data[this.editID]={
        name:item.name,
        age:item.age,
        city:item.city,
        occupation:item.occupation,
        phone:item.phone,
        email:item.email,
        company:item.company
      };
    }
    
    
  }
  setItemForm(item: Item){
    this.itemForm=this.formBuilder.group({
      'name':item.name,
      'age':item.age,
      'city':item.city,
      "occupation":item.occupation,
      'phone':item.phone,
      'email':item.email,
      'company':item.company

    });
  }
  showAllData(){
    this.fullData=true;
    this.dataService.getAllData((err)=>{
      if(err){ 
      alert("Error");
      return;
      }
      console.log("tututut");
      this.data=this.dataService.data;
      this.staticData=this.dataService.data;
      
      console.log(this.data);
      
      
    });
  }
  showLessData(){
    this.fullData=false;
    this.counter=0;
    this.dataService.getPaginationData((err)=>{
      if(err){ 
      alert("Error");
      return;
      }
      console.log("tututut");
      this.data=this.dataService.data;
      this.staticData=this.dataService.data;
      
      console.log(this.data);
      
      
    }, this.counter);
  }
 
  deleteRow(index){
    console.log(index);
    this.data.splice(index,1);
    this.staticData.splice(index,1);
  }
  refresh(event){
    if(this.filterQuery===""){
      this.data=this.staticData;
    }
  }
  filter() {
    if(this.filterQuery===""){
      this.data=this.staticData;
    }
    let temp = [];

    temp = this.data.filter((d) => {
      return d.name.toLowerCase().indexOf(this.filterQuery.toLowerCase()) !== -1  
      || d.city.toLowerCase().indexOf(this.filterQuery.toLocaleLowerCase())!==-1
      || d.age.toString().indexOf(this.filterQuery)!==-1
      || d.occupation.toLowerCase().indexOf(this.filterQuery.toLocaleLowerCase())!==-1
      || d.phone.toLowerCase().indexOf(this.filterQuery.toLocaleLowerCase())!==-1
      || d.email.toLowerCase().indexOf(this.filterQuery.toLocaleLowerCase())!==-1
      || d.company.toLowerCase().indexOf(this.filterQuery.toLocaleLowerCase())!==-1;
    });

    this.data = temp;
  }
  public toInt(num: string) {
    return +num;
}

public sortByWordLength = (a: any) => {
    return a.name.length;
}

public pageUp(){
  this.counter++;
  this.data=[];
  this.dataService.getPaginationData((err)=>{
    if(err){ 
    alert("Error");
    return;
    }
    console.log("tututut");
    this.data=this.dataService.data;
    this.staticData=this.dataService.data;
    
    console.log(this.data);
    
    
  }, this.counter);
}
public pageDown(){
  this.counter--;
  this.data=[];
  this.dataService.getPaginationData((err)=>{
    if(err){ 
    alert("Error");
    return;
    }
    console.log("tututut");
    this.data=this.dataService.data;
    this.staticData=this.dataService.data;
    
    console.log(this.data);
    
    
  }, this.counter);
}
nameSort(){
  if(this.sortName==-1){
    this.sortName=0;
  }
  else if(this.sortName==0){
    this.sortName=1;
  }
  else if(this.sortName==1){
    this.sortName=0;
  }    
}
ageSort(){
  if(this.sortAge==-1){
    this.sortAge=0;
  }
  else if(this.sortAge==0){
    this.sortAge=1;
  }
  else if(this.sortAge==1){
    this.sortAge=0;
  }    
}
citySort(){
  if(this.sortCity==-1){
    this.sortCity=0;
  }
  else if(this.sortCity==0){
    this.sortCity=1;
  }
  else if(this.sortCity==1){
    this.sortCity=0;
  }    
}
occupationSort(){
  if(this.sortOccupation==-1){
    this.sortOccupation=0;
  }
  else if(this.sortOccupation==0){
    this.sortOccupation=1;
  }
  else if(this.sortOccupation==1){
    this.sortOccupation=0;
  }    
}
phoneSort(){
  if(this.sortPhone==-1){
    this.sortPhone=0;
  }
  else if(this.sortPhone==0){
    this.sortPhone=1;
  }
  else if(this.sortPhone==1){
    this.sortPhone=0;
  }    
}
emailSort(){
  if(this.sortEmail==-1){
    this.sortEmail=0;
  }
  else if(this.sortEmail==0){
    this.sortEmail=1;
  }
  else if(this.sortEmail==1){
    this.sortEmail=0;
  }    
}
companySort(){
  if(this.sortCompany==-1){
    this.sortCompany=0;
  }
  else if(this.sortCompany==0){
    this.sortCompany=1;
  }
  else if(this.sortCompany==1){
    this.sortCompany=0;
  }    
}

}
