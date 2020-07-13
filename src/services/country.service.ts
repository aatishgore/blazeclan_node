import Axios from 'axios';
import { countryResponse, IPagination } from 'abstractions/ApiResponses';
import { config } from '../config';
export class CountryService {
  constructor() { }

  public async getCountries(options: IPagination) {
    //TODO: Implement caching later
    try {
      let result: countryResponse = {
        success: false,
        data: []
      };
  
      const params = options.searchText ? `/name/${options.searchText}` : '/all'
      const url = config.RAPID_API_URL + params
      const axiosOptions = {
        headers: {
          'x-rapidapi-host': config.RAPID_API_HOST,
          'x-rapidapi-key': config.RAPID_API_KEY
        }
      }
      const data = await Axios.get(url, axiosOptions)
      if (data) {
        result.success = true
        result.data = data.data
      }
      return result      
    } catch (error) {
      throw error
    }
  }
}