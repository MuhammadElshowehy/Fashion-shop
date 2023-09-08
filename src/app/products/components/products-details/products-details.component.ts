import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { ProductModel } from 'src/app/product-model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  isLoading: boolean = false;
  productId: number;
  productDetails: any;
  rate: number;
  PopupMessage: string = '';

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.productId = +params.id;
    });
    this.productsService.productDetails(this.productId).subscribe(
      (res: ProductModel) => {
        this.productDetails = res;
        this.rate = this.productDetails.rating.rate;
        this.isLoading = false;
      },
      (error) => {
        this.PopupMessage = this.productsService.handleFetchError(error);
        this.isLoading = false;
      }
    );
  }

  receivedFromPopupComp(data: string) {
    this.PopupMessage = data;
  }
}
