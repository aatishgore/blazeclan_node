import * as bodyParser from 'body-parser';
import Cors from 'cors';
import Express from 'express';
import {Server, createServer} from 'http';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger/swagger.json'

import { registerRoutes } from './routes';

const swagOptions: any = { explorer: true };

/**
 * main file
 */
export class App {
  public express: Express.Application;
  public httpServer: Server;

  public async init(): Promise<void> {
    this.express = Express();
    this.httpServer = createServer(this.express);
    await this.middleware();
    this.setupRoutes();
  }

  private async middleware(): Promise<void> {
    // cors
    this.express.use(Cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, swagOptions),
    );
  }

  private setupRoutes(): void {
    registerRoutes(this.express);
  }
}
