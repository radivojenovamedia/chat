import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import {
  Filter,
  FindOne,
  QueryBuilder,
  ResponseFilter,
} from './interface/database.interface';
import { UpdateResult } from 'typeorm';

@Injectable()
export class DatabaseService<T, R> {
  private _repository: Repository<T>;
  set repository(repo: Repository<T>) {
    this._repository = repo;
  }
  get repository() {
    return this._repository;
  }
  create(query: T) {
    const data = this.repository.create(query);
    return this.repository.save(data);
  }
  findAll() {
    return this.repository.find();
  }
  async update(query: QueryBuilder) {
    return this.queryBuilder(query).getManyAndCount();
  }
  findOne(query: FindOne[]) {
    return new Promise<T>((resolve, reject) => {
      const findObj = {};
      query.map((key) => {
        findObj[key.property] = key.value;
      });
      console.log(findObj);
      this.repository
        .findOneBy(findObj)
        .then((result) => {
          if (result) {
            resolve(JSON.parse(JSON.stringify(result)));
          } else {
            reject('NOT_FOUND');
          }
        })
        .catch((error) => reject(error));
    });
  }
  async updateOne(id: number, updateQuery: Partial<T>): Promise<T> {
    try {
      const findObj = { id };
      const result: UpdateResult = await this._repository.update(
        findObj as any,
        updateQuery as any,
      );

      if (result.affected && result.affected > 0) {
        // Successfully updated
        return updateQuery as T;
      } else {
        // No records were updated
        throw new Error('Record not found or no changes made');
      }
    } catch (error) {
      // Handle any errors that occurred during the update
      if (error.code === '22P02') {
        // This is a TypeORM error code for invalid input syntax for an integer
        throw new Error('Invalid ID format');
      } else {
        throw error;
      }
    }
  }

  queryBuilder(query: QueryBuilder) {
    const sqlQuery = this._repository.createQueryBuilder(query.table);
    if (query.where.length > 0) {
      query.where.map((where) => {
        sqlQuery.andWhere(
          `${where.table}.${where.property} = :${where.property}`,
          { [where.property]: where.equal },
        );
      });
    }
    sqlQuery.skip(query.skip);
    sqlQuery.limit(query.limit);
    if (query.join && query.join.length > 0) {
      query.join.map((join) => {
        const joinProperty = `${query.table}.${join.property}`;
        const joinAlias = join.alias;
        if (join.type === 'left') {
          sqlQuery.leftJoin(joinProperty, joinAlias);
        } else if (join.type === 'inner') {
          sqlQuery.innerJoin(joinProperty, joinAlias);
        }
      });
    }
    if (query.select && query.select.length > 0) {
      const selectQuery = query.select.map(
        (select) => `${select.table}.${select.property}`,
      );
      sqlQuery.select(selectQuery);
    }
    return sqlQuery;
  }
}
