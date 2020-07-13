import * as express from 'express';
import { CountryController } from './controller/country/countries';

export function registerRoutes(app: express.Application): void {
  new CountryController().register(app)
}
