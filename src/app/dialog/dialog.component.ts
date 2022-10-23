import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { InjectFlags } from '@angular/compiler/src/core';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
freshnessList=["Brand New","Second Brand","Third Brand"]
prductForm !: FormGroup;  
actionBtn : String = "Save" ;
constructor(private formBuilder : FormBuilder, private api : ApiService, 
  @Inject(MAT_DIALOG_DATA) public editData : any ,
  private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.prductForm= this.formBuilder.group({
      productName : ['',Validators.required],
      Category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]

    });
    if(this.editData){
      this.actionBtn = "Update" ;
      this.prductForm.controls['productName'].setValue(this.editData.productName);
      this.prductForm.controls['Category'].setValue(this.editData.Category);
      this.prductForm.controls['freshness'].setValue(this.editData.freshness);
      this.prductForm.controls['price'].setValue(this.editData.price);
      this.prductForm.controls['comment'].setValue(this.editData.comment);
      this.prductForm.controls['date'].setValue(this.editData.date);

    }
  }
  addProduct(){
    if (!this.editData){
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
    else{
      if(this.prductForm.valid)
      this.updateProduct()}
  }
  updateProduct(){
    this.api.putProduct(this.prductForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("good job")
        this.prductForm.reset();
        this.dialogRef.close('Update');
      },
      error:()=>{
        alert("oh no oh no oh no no no!!!")
      }
    })

  }
  
}
