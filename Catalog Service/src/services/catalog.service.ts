import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalotService {
  private repository: ICatalogRepository;
  constructor(repository: ICatalogRepository) {
    this.repository = repository;   
  }
  createProduct(input: any) {}

  updateProduct(input: any) {}

  getProducts(limit: number, offset: number) {}
  getProduct(id: number) {}

  deleteProduct(id: number) {}
}
