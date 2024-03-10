import {CartRepositoryType} from "../types/repository.type";
import * as Repository from "../repository/cart.repository";

import { createCart} from "./cart.service";

describe("cart.service", () => {
    let repo: CartRepositoryType;
    beforeEach(() => {
        repo = Repository.cartRepository;
    });

    afterEach(() => {
        repo = {} as CartRepositoryType;
    })

    it("should return correct data while creating a cart", async () => {
        const mockCart = {
            title: "Smart phone",
            price: 100,
        };
        jest.spyOn(Repository.cartRepository, "create").mockImplementationOnce(() => Promise.resolve({
            message: "Fake cart created successfully",
            input: mockCart,
        }));
        const res = await createCart(mockCart, repo);
        expect(res).toEqual({
            message: "Fake cart created successfully",
            input: mockCart,
        })
    });
})