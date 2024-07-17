import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'session-cookie',
      cookie: {
        maxAge: 2 * 24 * 60 * 60, // = 2 days. Default
        httpOnly: true,
        secure: false, // should be true in production with HTTPS
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: 'app-sessions',
        collectionName: 'sessions',
        ttl: 2 * 24 * 60 * 60, // = 2 days. Default
        autoRemove: 'native', // Default
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
