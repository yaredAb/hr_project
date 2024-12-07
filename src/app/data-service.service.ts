import { Injectable } from '@angular/core';
import { EmployeeData } from '../components/dashboard/dashboard.component';
import { CompanyData} from '../type';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  url = 'http://localhost:3000/employee'
  async getAllData() : Promise<EmployeeData[]> {
    const data = await fetch(this.url)
    console.log(data)
    return await data.json() || []
  }
  async getCompanies() : Promise<CompanyData[]>{
    const company_url = "http://localhost:3000/company"
    const data = await fetch(company_url)
    return await data.json() || []
  }
  async SaveData(full_name:string,email:string, phone_number:string, company:string, department:string, salary: string){
    
    const data = {full_name, email, phone_number, company, department, salary}

    const response = await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to save data: ${response.statusText}`);
    }

    console.log('Data saved successfully:', await response.json());
  }

  async SaveCompany(company_name:string,department:string[]){
    const company_url = "http://localhost:3000/company"
    const data = {name:company_name, department:department}

    try{
      const response = await fetch(company_url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    if (!response.ok) {
      throw new Error(`Failed to save data: ${response.statusText}`);
    }

    console.log('Data saved successfully:', await response.json());
    }
    catch(e){
      console.log(e)
    }
  }


  async UpdateData(id:string, full_name:string,email:string, phone_number:string, company:string, department:string, salary: string){
    
    const data = {full_name, email, phone_number, company, department, salary}

    const response = await fetch(`${this.url}/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to save data: ${response.statusText}`);
    }

    console.log('Data saved successfully:', await response.json());
  }

  async getSingleData(id: string) : Promise<EmployeeData>{
    const data = await fetch(`${this.url}/${id}`)
    console.log("id"+id)
    return data.json()
  }

  async deleteData(id: string){
    const deleteUrl = `${this.url}/${id}`
    const response = await fetch(deleteUrl,{
      method: 'DELETE'
    })
    if(!response.ok){
      throw new Error('can\'t delete the file')
    }
    console.log("deleted")
  }
}
