
import { AnyZodObject, ZodEffects } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      return next();
    } catch (error) {
      // next function will send this error the global error handler
      next(error);
    }
  };

export default validateRequest;
