import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '@shared/interface/product.int';
import { UniversalService } from '../universal/universal.service';

@Injectable()
export class ProductWebService {

  private baseUrl = null;

  constructor(private httpClient: HttpClient, private universalService: UniversalService) {
    this.baseUrl = `${this.universalService.getApiUrl()}/product`;
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}`, product).pipe(share());
  }

  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${product.reference}`, product).pipe(share());
  }

  delete(reference: string) {
    return this.httpClient.delete<Product>(`${this.baseUrl}/${reference}`).pipe(share());
  }

  get(reference: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${reference}`).pipe(share());
  }

  list(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${this.baseUrl}/list`).pipe(share());
  }
}
