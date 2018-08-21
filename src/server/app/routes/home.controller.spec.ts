import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { UserService } from '@services/user.service';

describe('HomeController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [],
      controllers : [HomeController],
      providers: [UserService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World !"', () => {
      const homeController = app.get<HomeController>(HomeController);
      expect(homeController.get()).toBe('Hello world !');
    });
  });
});
