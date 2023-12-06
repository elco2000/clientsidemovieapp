import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@org/backend/user'; 
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'] || 'secretstring',
      signOptions: { expiresIn: '12 days' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
