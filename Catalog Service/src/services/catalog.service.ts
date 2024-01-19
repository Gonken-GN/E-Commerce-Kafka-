import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalotService {
  private repository: ICatalogRepository;
  constructor(repository: ICatalogRepository) {
    this.repository = repository;   
  }
  async createProduct(input: any) {
    const data = await  this.repository.create(input);
    return data;
  }

  updateProduct(input: any) {}

  getProducts(limit: number, offset: number) {}
  getProduct(id: number) {}

  deleteProduct(id: number) {}
}
