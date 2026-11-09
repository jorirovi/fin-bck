export interface crudRepository<T, TInput extends object> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    create(input: TInput): Promise<boolean>;
    update(id: string, input:TInput): Promise<boolean>;
}

export type SqlValue =
    | string
    | number
    | boolean
    | Date
    | Buffer
    | null; 