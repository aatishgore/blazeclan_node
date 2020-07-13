import { IPagination } from "abstractions/ApiResponses";
import { ICountry } from "controller/country/country.model";


export class PaginateHelper {
  constructor(){}

  public async manage(options: IPagination, countries: ICountry[]) {
    try {
      let data = countries
      if( options.limit && options.page ) {
        let page = options.limit * (options.page - 1)
        let limit = page + options.limit
        data = data.slice( page, limit)
      }
      return { success: true, data: data }      
    } catch (error) {
      throw error
    }
  }
}