import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import storyRoutes from './routes/story.route';
import authRoutes from './routes/auth.route';
import dataSource from './migrations/db.source'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // MIDDLEWARE
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ROUTES
    app.use('/api', storyRoutes);
    app.use('/api/auth', authRoutes);

    // SWAGGER
    const options: swaggerJSDoc.Options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Sacra stories API',
          version: '1.0.0',
        },
      },
      apis: ['**/*.ts'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



    // DEFAULT ERROR
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500);
      res.json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error'
      });
    });


    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send({
        code: 'NOT_FOUND',
        message: 'Not found'
      });
    });


    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} !!`);
    });

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });