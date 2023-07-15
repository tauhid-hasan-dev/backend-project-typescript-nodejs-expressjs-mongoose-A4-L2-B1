// import { createLogger, format, transports } from 'winston';
// const { combine, timestamp, label, /* prettyPrint ,*/ printf  } = format;
// import path from 'path'
// import DailyRotateFile from 'winston-daily-rotate-file';

// const myFormat = printf(({ level, message, label, timestamp }) => {
//     const date = new Date(timestamp);
//     const hour = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();
//     return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
//   });

// const logger = createLogger({
//   level: 'info',
//   format: combine(
//     label({ label: 'SUCCESS-COW-HUT-SUCCESS!' }),
//     timestamp(),
//     myFormat,
//     /* prettyPrint(), */
//   ),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         // eslint-disable-next-line no-undef
//         process.cwd(),
//         'logs', 
//         'winston',
//         'sucesses',
//         'cow-hut-%DATE%-success.log'
//       ),
//       datePattern: 'DD-MM-YYYY-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// console.log(logger)


// const errorLogger = createLogger({
//   level: 'error',
//   format: combine(
//     label({ label: 'ERROR-COW-HUT-ERROR!' }),
//     timestamp(),
//     myFormat,
//    /*  prettyPrint(), */
//   ),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         // eslint-disable-next-line no-undef
//         process.cwd(),
//         'logs', 
//         'winston',
//         'errors',
//         'cow-hut-%DATE%-error.log'
//       ),
//       datePattern: 'DD-MM-YYYY-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// });

// console.log(errorLogger)
// // export {logger, errorLogger}