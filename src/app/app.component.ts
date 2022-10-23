import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { Action } from 'rxjs/internal/scheduler/Action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular13';
  displayedColumns: string[] = ['productName', 'Category', 'freshness', 'price','comment','date','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api:ApiService){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val =>{
      if(val==='Save'){
        this.getAllProducts()
      }
    });
  }
  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
       this.dataSource= new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort= this.sort;

      },
      error:()=>{
        alert('oups')
      }
    })


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val =>{
      if(val==='Update'){
        this.getAllProducts()
      }
    });
  }
  deletProduct(id : number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("deleted with succussfuly")
        this.getAllProducts();
      },
      error:()=>{
        alert("error in delete")
      }
    })
  }
}
