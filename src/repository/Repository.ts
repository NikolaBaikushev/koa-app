
import { Knex } from "knex";

interface Writer<T> {
    create(item: CreateEntity<T>, returning: ReturnColumns<T>): Promise<T>
    update(id: string, item: Partial<T>): Promise<boolean>
    delete(id: string): Promise<boolean>
}

interface Reader<T> {
    find(item: Partial<T>): Promise<T[]>
    findById(id: string | number): Promise<T>
    findOneBy(item: Partial<T>, select: SelectColumns<T>): Promise<T | null>
    getAll(): Promise<T[]>
}

type BaseRepository<T> = Writer<T> & Reader<T>



type StringKeyOf<T> = Extract<keyof T, string>;
type ReturnColumns<T> = StringKeyOf<T> | Array<StringKeyOf<T>> | '*';
type SelectColumns<T> = ReturnColumns<T>;


type CreateEntity<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

export abstract class KnexRepository<T> implements BaseRepository<T> {
    protected abstract tableName: string;
    constructor(protected knex: Knex) { }

    public get qb(): Knex.QueryBuilder {
        return this.knex(this.tableName);
    }

    update(id: string, item: Partial<T>): Promise<boolean> {
        throw new Error("Not implemented")
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Not implemented")
    }

    find(item: Partial<T>): Promise<T[]> {
        throw new Error("Not implemented")
    }

    getAll() {
        return this.qb.select('*').from(this.tableName);
    }

    create(data: CreateEntity<T>, returning: ReturnColumns<T> = '*'
    ): Promise<T> {
        return this.qb.insert(data).returning(returning).then(rows => rows[0]);
    }


    findById(id: string | number): Promise<T> {
        return this.qb.select('*').where({ id }).first();
    }

    findOneBy(item: Partial<T>, select: SelectColumns<T> = "*"): Promise<T | null> {
        return this.qb.select(select).where(item).first() ?? null;
    }
    
}
