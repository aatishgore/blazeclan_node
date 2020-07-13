import { BaseController } from '../BaseController';
import { Application, Request, Response } from 'express';
import { CountryService } from '../../services';
import { ResponseHandler, PaginateHelper } from '../../helper';
import { IPagination } from 'abstractions/ApiResponses';

export class CountryController extends BaseController {
  public countryService: CountryService;
  public paginateHelper: PaginateHelper;

  constructor() {
    super();
    this.init();
    this.countryService = new CountryService()
    this.paginateHelper = new PaginateHelper()
  }

  public register(app: Application): void {
    app.use('/api', this.router);
  }

  public init(): void {
    this.router.get('/countries', this.getCountries);
  }
  public getCountries = async (req: Request, res: Response): Promise<void> => {
    try {
      // by default page is 1 limit is 10
      const options: IPagination = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        searchText: req.query.countryName ? String(req.query.countryName) : null
      };
      const countries = await this.countryService.getCountries(options)
      if(!countries.success) {
        ResponseHandler.JSONERROR(req, res, 'getCountries')
      }
      const result = await this.paginateHelper.manage(options, countries.data)

      if(result.success) {
        const pagination: IPagination = {
         limit: options.limit,
         total: countries.data.length,
         page : options.page 
        }
        res.locals.pagination = pagination
        res.locals.data = result.data;
        ResponseHandler.JSONSUCCESS(req, res);
      } else {
        ResponseHandler.JSONERROR(req, res, 'getCountries')
      }
    } catch (error) {
      res.locals.data = error
      ResponseHandler.JSONERROR(req, res, 'getCountries');
    }
  }
}
