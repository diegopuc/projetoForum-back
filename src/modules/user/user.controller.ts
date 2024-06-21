import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
  HttpCode,
  NotAcceptableException,
  Param,
  Put,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { IUser, User, SUser } from '../../common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() newUser: IUser): Promise<User> {
    const { email } = newUser
    const existingUser = await this.userService.findUserByEmail(email)

    if (existingUser) {
      throw new NotAcceptableException('This user already exists')
    } 
    try {
      const validatedUser = SUser.parse(newUser)
      return await this.userService.createUser(validatedUser)
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user')
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userService.getUsers()
      if (!users.length) {
        throw new NotFoundException('No users found')
      }
      return users
    } catch (error) {
      if (error.message === 'No users found') {
        throw new NotFoundException('No users found')
      }
      throw new InternalServerErrorException('Failed to get users')
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by id' })
  async getUserById(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.getUserById(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Change user by id' })
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: IUser,
  ): Promise<User> {
    const existingUser = await this.userService.getUserById(userId)
    if (!existingUser) {
      throw new NotFoundException('User not found')
    } else {
      try {
        const updatedUser = await this.userService.updateUser(
          userId,
          updateUserDto,
        )
        return updatedUser
      } catch (error) {
        throw new InternalServerErrorException('Failed to update user')
      }
    }
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by id' })
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    const existingUser = await this.userService.getUserById(userId)
    if (!existingUser) {
      throw new NotFoundException('User not found')
    } else {
      try {
        await this.userService.deleteUser(userId)
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete user')
      }
    }
  }
}
