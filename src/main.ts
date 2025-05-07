import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(3002);
    console.log('Main REST API server is running on port 3002');
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error('Port 3002 is already in use. Please make sure no other service is using this port.');
    } else {
      console.error('Failed to start REST server:', error);
    }
    process.exit(1);
  }
}
bootstrap(); 