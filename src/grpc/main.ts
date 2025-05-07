import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from '../app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        package: ['book', 'member', 'loan'],
        protoPath: [
          join(__dirname, '..', 'proto', 'book.proto'),
          join(__dirname, '..', 'proto', 'member.proto'),
          join(__dirname, '..', 'proto', 'loan.proto'),
        ],
        url: 'localhost:5000',
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      },
    });

    await app.listen();
    console.log('gRPC server is running on port 5000');
  } catch (error) {
    console.error('Failed to start gRPC server:', error);
    process.exit(1);
  }
}
bootstrap(); 