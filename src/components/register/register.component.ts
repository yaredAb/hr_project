import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataServiceService } from '../../app/data-service.service';
import { Router } from '@angular/router';
import { CompanyData } from '../../type';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  elementData: DataServiceService = inject(DataServiceService)
  public salary = "0"
  public companyData : CompanyData[] = []
  constructor(private router:Router){}
  ngOnInit(): void {
   this.elementData.getCompanies().then((company:CompanyData [])=>{
    this.companyData = company
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
  addElement(){
    // const theData: EmployeeData = {
    //   id: '',
    //   full_name : this.applyForm.value.full_name ?? '',
    //   email: this.applyForm.value.email ?? '',
    //   phone_number: this.applyForm.value.phone_number ?? '',
    //   company: this.applyForm.value.company ?? '',
    //   department: this.applyForm.value.department ?? '',
    //   salary: this.applyForm.value.salary ?? '',
    // }
    this.elementData.SaveData(
      this.applyForm.value.full_name ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.phone_number ?? '',
      this.applyForm.value.company ?? '',
      this.applyForm.value.department ?? '',
      this.applyForm.value.salary ?? '',
    )
    this.router.navigate(['/']);
  }

}
