import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto, RegisterUserDto } from './dto/user.dto';
import { RedisService } from 'src/redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserVo } from './vo/user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  private logger = new Logger();

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.email = user.email;
    newUser.nickName = user.nickName;

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async initData() {
    const user1 = new User();
    user1.username = 'zhangsan';
    user1.password = '111111';
    user1.email = 'xxx@xx.com';
    user1.isAdmin = true;
    user1.nickName = '张三';
    user1.phoneNumber = '13233323333';

    const user2 = new User();
    user2.username = 'lisi';
    user2.password = '222222';
    user2.email = 'yy@yy.com';
    user2.nickName = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }

  async login(loginInfo: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: loginInfo.username,
        isAdmin: false,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== loginInfo.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    if (user) {
      const res = new LoginUserVo();
      res.userInfo = {
        id: user.id,
        username: user.username,
        nickName: user.nickName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        headPic: user.headPic,
        createTime: user.createTime.getTime(),
        isFrozen: user.isFrozen,
        isAdmin: user.isAdmin,
        roles: user.roles.map((item) => item.name),
        permissions: user.roles.reduce((arr, item) => {
          item.permissions.forEach((permission) => {
            if (arr.indexOf(permission) === -1) {
              arr.push(permission);
            }
          });
          return arr;
        }, []),
      };

      res.accessToken = this.jwtService.sign(
        {
          userId: res.userInfo.id,
          username: res.userInfo.username,
          roles: res.userInfo.roles,
          permissions: res.userInfo.permissions,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_token_expires_time') || '30m',
        },
      );

      res.refreshToken = this.jwtService.sign(
        {
          userId: res.userInfo.id,
        },
        {
          expiresIn:
            this.configService.get('jwt_refresh_token_expres_time') || '7d',
        },
      );
      return res;
    }
  }

  async findUserById(userId: number, isAdmin: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    return {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      email: user.email,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };
  }
}
