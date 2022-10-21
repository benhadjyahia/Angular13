import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
freshnessList=["Brand New","Second Brand","Third Brand"]
prductForm !: FormGroup;  
constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.prductForm= this.formBuilder.group({
      productName : ['',Validators.required],
      Category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]

    })
  }
  addProduct(){
    if (this.prductForm.valid){
      this.api.postProduct(this.prductForm.value).subscribe({
        next:(res)=>{
          alert("product added successefully")
          this.prductForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("errore while adding product")
        }
        
      })
    }
  }

}
