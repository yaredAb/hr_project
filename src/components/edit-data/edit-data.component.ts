import { Component, ChangeDetectionStrategy, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataServiceService } from '../../app/data-service.service';
import { EmployeeData } from '../dashboard/dashboard.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyData } from '../../type';

@Component({
  selector: 'app-edit-data',
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule,ReactiveFormsModule, CommonModule],
  templateUrl: './edit-data.component.html',
  styleUrl: './edit-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDataComponent implements OnInit {
route: ActivatedRoute = inject(ActivatedRoute)

employeeData: DataServiceService = inject(DataServiceService)
employee_data: EmployeeData = {
  id: '',
  full_name: '',
  email: '',
  phone_number: '',
  company: '',
  department: '',
  salary: ''
}
employee_id = this.route.snapshot.params['id']
public companyData : CompanyData[] = []
private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
constructor(private router:Router){}
  ngOnInit() : void {    
    this.employeeData.getCompanies().then((company:CompanyData [])=>{
      this.companyData = company
     }) 
    this.employeeData.getSingleData(this.employee_id).then((employeeDta: EmployeeData)=>{
    this.employee_data = employeeDta
    this.cdr.markForCheck();
  })
  }
  applyForm= new FormGroup(
    {
      full_name: new FormControl(''),
      email: new FormControl(''),
      phone_number: new FormControl(''),
      company: new FormControl(''),
      department: new FormControl(''),
      salary: new FormControl('')
    }
  )

  updateData(){
    this.employeeData.UpdateData(
      this.employee_data.id,
      this.applyForm.value.full_name || this.employee_data.full_name,
      this.applyForm.value.email || this.employee_data.email,
      this.applyForm.value.phone_number || this.employee_data.phone_number,
      this.applyForm.value.company || this.employee_data.company,
      this.applyForm.value.department || this.employee_data.department,
      this.applyForm.value.salary || this.employee_data.salary,
    )
    this.router.navigate(['/']);
  }

}
