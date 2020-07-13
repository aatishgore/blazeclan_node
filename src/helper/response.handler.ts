import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import {
  IStandardErrorResponse,
  IStandardSuccessResponse,
} from '../abstractions/ApiResponses';

/**
 * response handler class
 */
// tslint:disable-next-line:no-unnecessary-class
export class ResponseHandler {
  public static JSONSUCCESS(req: Request, res: Response): void {
    const response: IStandardSuccessResponse = {
      success: true,
      data: res.locals.data,
      pagination: res.locals.pagination,
      message: res.locals.message || 'Success',
    };

    res.status(HttpStatus.OK).jsonp(response);
  }

  public static JSONERROR(req: Request, res: Response, apiName: string): void {
    let obj: IStandardErrorResponse;
    const showErrors: boolean =
      ['production', 'prod'].indexOf(process.env.NODE_ENV) > 0 ? false : true;
    const errors: any = res.locals.data;
    let details: any = [];
    let message: string = res.locals.data.message;
    if (errors.name === 'ValidationError') {
      // mongoErr
      for (const key in res.locals.data.errors) {
        const value: any = res.locals.data.errors[key];
        details.push({
          msg: value.message,
          param: value.path,
        });
      }
      // message = res.locals.data._message;
    } else {
      // validation error
      if (res.locals.data.length) {
        res.locals.data.map((data: any) => {
          data.location = undefined;
        });
        details = res.locals.data;
      }
    }
    const errorCode: number = res.locals.statusCode || HttpStatus.BAD_REQUEST;
    obj = {
      success: false,
      details: details,
      message: message || 'Something went wrong',
    };
    // error logs
    obj.functionName = apiName;
    showErrors ? obj : delete obj.details;
    res.status(errorCode).send(obj);
  }
}
