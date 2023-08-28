import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

interface imageSnippet {
  file: File;
  imageAsDataURL: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: undefined,
  };

  isEditing = false; // Add a flag to indicate if in editing mode
  imagePreviews: Array<imageSnippet> = [];
  productIdToUpdate: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.productIdToUpdate = params['id'];
        this.getProductById();
      }
    });
  }  
  
  getProductById(): void {
    if (!this.productIdToUpdate) {
      return;
    }

    this.productService.getProductById(this.productIdToUpdate).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  onImagesSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if(!this.product.imageFiles) this.product.imageFiles = [];
      this.product.imageFiles.push(file); // Store the selected files in the product object

      // Read the image files and set the image previews
      // this.imagePreviews = [];
      // for (const file of this.product.imageFiles) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push({
            file: file,
            imageAsDataURL:reader.result
          });
        };
        reader.readAsDataURL(file);
      // }
    }
  }

  saveProduct(): void {
    if (this.isEditing) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct(): void {
    this.productService.createProductWithImage(this.product).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
        // Reset the form after successful creation
        this.product = { name: '', description: '', price: undefined };
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(): void {
    if (!this.productIdToUpdate) {
      return;
    }

    this.productService
      .updateProductWithImage(this.productIdToUpdate, this.product)
      .subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          // Navigate back to the catalog or perform any other action after successful update
          this.router.navigate(['/catalog']);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
  }
  
  deleteImage(imageUrl: string): void {
    if (!this.product.id) return;
    // Send a request to the backend API to delete the image
    this.productService.deleteImage(this.product.id, imageUrl).subscribe(
      () => {
        // Remove the image URL from the product's images array
        this.product.images = this.product.images?.filter(img => img !== imageUrl);
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }
  
  deleteNewImage(imagePreview: imageSnippet): void {
    this.imagePreviews = this.imagePreviews.filter(img => img !== imagePreview);
    this.product.imageFiles = this.product.imageFiles?.filter(img => img !== imagePreview.file);
  }
}
