import type { CrudRepository } from "../interfaces/crudrepository.type.js";

export class BaseService<T, TInput extends object> {
    constructor(
        protected readonly model: CrudRepository<T, TInput>
    ){}

    async getAll(): Promise<T[]> {
        return this.model.getAll();
    }

    async getById(id: string): Promise<T | null> {
        return this.model.getById(id);
    }

    async delete(id: string): Promise<boolean>{
        return this.model.delete(id);
    }

    async create(input: TInput): Promise<boolean> {
        return this.model.create(input);
    }

    async update(
        id: string,
        input: TInput
    ): Promise<boolean> {
        return this.model.update(id, input);
    }

}