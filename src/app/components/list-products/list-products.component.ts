import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{
  listProductos: Product[] = []
  loading: boolean = false; 

  constructor(private _productService: ProductService, private toastr: ToastrService){
  }

  ngOnInit(): void{
    this.getListProducts();
}

  getListProducts(){
      this.loading = true;

      this._productService.getListProdutos().subscribe((data) => {
        this.listProductos = data; 
       this.loading = false;       
      })
  }

  deleteProduct(id: number) {
    this.loading =true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning("Produto deletado", "DELETADO",{timeOut: 3000});
    })
  }
}
