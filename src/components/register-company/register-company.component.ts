import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataServiceService } from '../../app/data-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-company',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.css'
})
export class RegisterCompanyComponent {
  constructor(private router:Router){}
  theData: DataServiceService = inject(DataServiceService)
  applyForm= new FormGroup(
    {
      company_name: new FormControl(''),
      department: new FormControl([]),
    }
  )

  theText = ''
  departments:string[] = []
  
  onKeyDown(event: KeyboardEvent){
    if(event.key === ','){
      event.preventDefault()
      const trimmedText = this.theText.trim()
      if(trimmedText){
        this.departments.push(trimmedText)
        this.theText = ''
      }
    }
  }
  addCompany(){
    this.theData.SaveCompany(
      this.applyForm.value.company_name ?? '',
      this.departments ?? []
    )
    this.router.navigate(['/register']);
  }
}
