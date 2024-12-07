import { Component, inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { DataServiceService } from '../../app/data-service.service';
import { RouterModule } from '@angular/router';
import { CompanyData } from '../../type';


export interface EmployeeData {
  id: string,
  email: string,
  phone_number: string,
  full_name: string,
  company: string,
  department: string,
  salary: string
}

const ELEMENT_DATA: EmployeeData[] = [];

@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public countEmp : number = 0
  public countComp : number = 0
  displayedColumns: string[] = ['position', 'full_name', 'email', 'phone_number', 'company', 'department', 'salary', 'operation'];
  elementData: DataServiceService = inject(DataServiceService)
  public dataSource: EmployeeData[] = []
  
  constructor(){
    this.elementData.getAllData().then((employeeData : EmployeeData[]) =>{
      this.dataSource = employeeData;
      this.countEmp = this.dataSource.length
    })
    this.elementData.getCompanies().then((companyData: CompanyData[]) => {
      this.countComp = companyData.length
    })
  }
  
  
  deleteEmployee(id:string){
    this.elementData.deleteData(id)
    this.dataSource = this.dataSource.filter(item => item.id !== id);
    this.countEmp = this.dataSource.length     
  }

}
