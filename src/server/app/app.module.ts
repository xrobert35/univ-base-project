import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtStrategy } from './security/jwt.strategy';
import { AuthGuard } from './security/guards/auth.guards';
import { FunctionalExceptionFilter } from './common/exception/function-exception.filter';
import { TechnicalExceptionFilter } from './common/exception/technical-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthMiddleware } from './security/auth.middleware';
import { AuthService } from './security/auth.service';
import { RoutesModule } from './routes/routes.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config';

@Module({
  imports: [RoutesModule, TypeOrmModule.forRoot({
    type: 'mongodb',
    host: Config.get().MONGO_URL,
    port: Config.get().MONGO_PORT,
    database : 'univ-base',
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: true,
  })],
  controllers: [],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: FunctionalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TechnicalExceptionFilter,
    }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL,
    });
  }
}
