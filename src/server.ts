import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
/* import {logger, errorLogger} from './shared/logger' */
import { Server } from 'http';

// we are handling uncaught exception error(synchronous error) here, because bootstrap is a async function
process.on('uncaughtException', error => {
 /*  errorLogger.error(error); */
  console.log(error)
  process.exit(1);
});


let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // logger.info('Database connected successfully')
    console.log('Database connected successfully')
    
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    // errorLogger.error('Failed to connect to database', err)
    console.error('Failed to connect to database', err)
  }

  process.on('unhandledRejection', error => {
   /*  errorLogger.error(error); */
   console.log(error)
    if (server) {
      server.close(() => {
        // with this errorLogger we will understand the details, what is the reasons for stopping our server
        /* errorLogger.error(error); */
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap()

// if for any reason server crashed we can know the reason behind this
process.on('SIGTERM', () => {
  // logger.info('SIGTERM is received');
  console.log('SIGTERM is received')
  if (server) {
    server.close();
  }
});
