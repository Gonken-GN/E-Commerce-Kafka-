type Create = (input: any) => Promise<{}>;
type Find = (input: any) => Promise<{}>;
type FindById = (id: string) => Promise<{}>;
type Update = (input: any) => Promise<{}>;
type Delete = (id: string) => Promise<{}>;

export type CartRepositoryType = {
    create: Create;
    find: Find;
    findById: FindById;
    update: Update;
    delete: Delete;
};