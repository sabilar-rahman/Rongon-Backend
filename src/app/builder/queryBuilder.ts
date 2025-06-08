// import { FilterQuery, Query } from "mongoose";

// const buildQuery = async <T>(
//   modelQuery: Query<T[], T>,
//   query: Record<string, unknown>,
//   searchAbleFields: string[]
// ) => {
//   // searchQuery
//   let queryConstructor = modelQuery.find();
//   let searchTerm = "";
//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//     queryConstructor = queryConstructor.find({
//       $or: searchAbleFields.map((field) => ({
//         [field]: { $regex: searchTerm, $options: "i" },
//       })),
//     } as FilterQuery<T>);
//   }

//   //filter query
//   const queryObj = { ...query };
//   const excludesFields = [
//     "searchTerm",
//     "sort",
//     "limit",
//     "page",
//     "skip",
//     "fields",
//   ];
//   excludesFields.forEach((ele) => delete queryObj[ele]);

//   // max min price will be here





  

//   queryConstructor = queryConstructor.find(queryObj as FilterQuery<T>);

//   //sort query
//   let sort = "-createdAt";
//   if (query?.sort) {
//     sort = (query?.sort as string).split(",").join(" ");
//     queryConstructor = queryConstructor.sort(sort);
//   }

//   //paginate query
//   let limit = 1;
//   let page = 1;
//   let skip = 0;
//   if (query?.limit) {
//     limit = Number(query?.limit);
//     queryConstructor = queryConstructor.limit(limit);
//   }
//   if (query?.page) {
//     page = Number(query?.page);
//     skip = (page - 1) * limit;
//     queryConstructor = queryConstructor.skip(skip);
//   }

//   //fields filtering
//   let fields = "-__v";
//   if (query?.fields) {
//     fields = (query?.fields as string).split(",").join(" ");
//     queryConstructor = queryConstructor.select(fields);
//   }

//   return queryConstructor;
// };

// export default buildQuery;


import mongoose, { PopulateOptions } from 'mongoose';

/**
 * A reusable class to build complex Mongoose queries from request query parameters.
 * It supports filtering, sorting, searching, field selection, and pagination.
 */
class QueryBuilder<T> {
  public modelQuery: mongoose.Query<T[], T>;
  public query: Record<string, unknown>;

  /**
   * @param {mongoose.Query} modelQuery - The base Mongoose query (e.g., Model.find()).
   * @param {object} query - The request query object (e.g., req.query).
   */
  constructor(modelQuery: mongoose.Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /**
   * Searches specified fields for a search term.
   * @param {string[]} searchableFields - An array of fields in the model to search through.
   * @returns {this} The QueryBuilder instance for chaining.
   */
  search(searchableFields: string[]) {
    const searchTerm = this.query.search as string;
    if (searchTerm && searchableFields.length > 0) {
      // Use $or to search across multiple fields with a case-insensitive regex
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      } as mongoose.FilterQuery<T>);
    }
    return this;
  }

  /**
   * Applies exact match filters from the query string, excluding reserved keywords.
   * Supports MongoDB operators like [gte], [lt], etc.
   * @returns {this} The QueryBuilder instance for chaining.
   */
  filter() {
    const queryObj: Record<string, unknown> = { ...this.query };
    const excludedFields = ['search', 'sortBy', 'order', 'page', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Convert API syntax (gte, lt) to MongoDB syntax ($gte, $lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in|nin)\b/g, match => `$${match}`);
    
    this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));
    return this;
  }

  /**
   * Sorts the results based on 'sortBy' and 'order' query parameters.
   * Defaults to sorting by '-createdAt'.
   * @returns {this} The QueryBuilder instance for chaining.
   */
  sort() {
    if (this.query.sortBy) {
      const order = (this.query.order as string)?.toLowerCase() === 'desc' ? '-' : '';
      const sortStr = `${order}${this.query.sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortStr);
    } else {
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }
    return this;
  }

  /**
   * Paginates the results using 'page' and 'limit' query parameters.
   * @returns {this} The QueryBuilder instance for chaining.
   */
  paginate() {
    const page = parseInt(this.query.page as string, 10) || 1;
    const limit = parseInt(this.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /**
   * Selects specific fields to return in the documents.
   * @returns {this} The QueryBuilder instance for chaining.
   */
  fields() {
    if (this.query.fields) {
      const fields = (this.query.fields as string).split(',').join(' ');
      this.modelQuery = this.modelQuery.select(fields);
    } else {
      // Exclude the '__v' field by default
      this.modelQuery = this.modelQuery.select('-__v');
    }
    return this;
  }
  
  /**
   * Populates specified paths in the query.
   * @param {string | object} populateOptions - Mongoose populate options.
   * @returns {this} The QueryBuilder instance for chaining.
   */
  populate(populateOptions: string | object | (string | object)[]) {
    if(populateOptions){
      this.modelQuery = this.modelQuery.populate(populateOptions as PopulateOptions | (string | PopulateOptions)[]);
    }
    return this;
  }

  /**
   * Executes the constructed query.
   * If pagination is used, it returns data along with metadata.
   * Otherwise, it just returns the data array.
   * @returns {Promise<object|Array>} The query result.
   */
  async execute() {
    const page = parseInt(this.query.page as string, 10);
    const limit = parseInt(this.query.limit as string, 10) || 10;
    const hasPagination = !isNaN(page);

    if (hasPagination) {
      const filterConditions = this.modelQuery.getFilter();
      const totalQuery = this.modelQuery.model.countDocuments(filterConditions);

      const [data, total] = await Promise.all([
        this.modelQuery.exec(),
        totalQuery.exec(),
      ]);
      
      const totalPages = Math.ceil(total / limit);

      return {
        meta: { total, page, limit, totalPages },
        data,
      };
    }

    const data = await this.modelQuery.exec();
    return { data }; // Always return a consistent shape
  }
}

export default QueryBuilder;

