import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(id: number, data: Product): Promise<Product>;
  delete(id: any);
  find(): Promise<Product[]>;
  findOne(id: number): Promise<Product>;    
}
