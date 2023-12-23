export interface QueryBuilder {
  table: string;
  where: {
    table: string;
    property: string;
    equal: string;
    like: boolean;
    between: boolean;
  }[];
  skip: number;
  limit: number;
  join: JoinTable[] | false;
  select: SelectTable[] | false;
}

export interface JoinTable {
  type: 'left' | 'inner';
  property: string;
  alias: string;
}

export interface SelectTable {
  table: string;
  property: string;
}
export interface FindOne {
  property: string;
  value: any;
}

export interface Filter<T> {
  skip: number | 0;
  max: number | 10;
  sortBy: any;
  filterQuery: T;
  relations: string;
}
export type ResponseFilter<T> = {
  page: number;
  totalPages: number;
  data: T[];
};
