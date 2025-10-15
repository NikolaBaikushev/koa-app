import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
  level: isDev ? 'debug' : 'info',
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname,req.headers,res.headers',
        },
      }
    : undefined,
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        remoteAddress: req.remoteAddress,
        remotePort: req.remotePort,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
export default logger