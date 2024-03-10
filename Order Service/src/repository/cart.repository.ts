import {CartRepositoryType} from "../types/repository.type";



const createCart = async (input: any): Promise<{}> => {
    return Promise.resolve({
        message: "Fake cart created successfully",
        input,
    });
}

const getCart = async (input: any): Promise<{}> => {
    return Promise.resolve({
        message: "Fake carts fetched successfully",
    });
}
const getCartById = async (id: string): Promise<{}> => {
    return Promise.resolve({
        message: "Fake cart fetched successfully",
        id: "fakeId",
    });
}
const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({});
}
const deleteCart = async (id: string): Promise<{}> => {
    return Promise.resolve({});
}
export const cartRepository: CartRepositoryType = {
    create: createCart,
    find: getCart,
    findById: getCartById,
    update: updateCart,
    delete: deleteCart,
};