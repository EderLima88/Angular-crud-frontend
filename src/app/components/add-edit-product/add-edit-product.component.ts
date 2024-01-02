import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit{
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacao: string = 'Adicionar';

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) { 
    this.form = this.fb.group({
      nome: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
    console.log(this.id);
  }
  ngOnInit(): void {
    if(this.id != 0) {
      this.operacao = 'Editar';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) =>{
    this.loading = false;
    this.form.setValue({
      nome: data.nome,
      description: data.description,
      price: data.price,
      stock: data.stock
      })
    })
  }  

  addProduct() {
    // console.log(this.form.value.nome);
    // console.log(this.form.get('nome'));
  
    const product: Product = {
      nome: this.form.value.nome,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }
  
    if (this.id !== 0) {
      this.loading = true;
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() =>{
        this.loading = false;
        this.toastr.info(`Atualizado com suvesso o produto ${product.nome}`, 'Produto atualizado');
        this.router.navigate(['/']);   
      })

    } else {
    this.loading = true;
    this._productService.saveProduct(product).subscribe(() => {
      this.loading = false;
      this.toastr.success(`Salvo com suvesso o produto ${product.nome}`, 'Produto salvo');
      this.router.navigate(['/']);
    })
    }

    

  }

}
