import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import * as passport from 'passport';

import { AppDataSource } from './data-source';
import { private_api, public_api } from './routes';
import { CustomError } from './utils';
import { globalErrorHandler } from './validations';

const server: Application = express();

const PORT = process.env.PORT || 8000;
// built-in middleware to handle urlencoded form data
server.use(express.urlencoded({ extended: false }));

// built-in middleware for json
server.use(express.json());

// middleware for cookie
server.use(cookieParser());
server.use(cors());
server.use(morgan('dev'));

// // social strategy requirements
// server.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET! || "secret",
//   })
// );
// server.use(passport.initialize());
// server.use(passport.session());

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });
// passport.deserializeUser(function (obj: any, cb) {
//   cb(null, obj);
// });

// server.use(createRateLimitMiddleware());
server.use('/api/v1/public', public_api);
server.use('/api/v1/private', private_api);

server.get('/', (req: Request, res: Response) => res.send(`Welcome to API`));

server.all('/*', (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

server.use(globalErrorHandler);

async function startServer() {
  try {
    // establish database connection before starting server
    await AppDataSource.initialize();
    console.log('Data Source has been initialized');
    
    server.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}...`);
    });
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  }
}

startServer();
