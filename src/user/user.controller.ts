import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto, RegisterDto } from "./dto/login.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserInfo } from "./utils/userInfo.decorator";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("register")
	async register(@Body() registerDto: RegisterDto) {
		return await this.userService.register(registerDto.email, registerDto.password, registerDto.nickname);
	}

	@Post("login")
	async login(@Body() loginDto: LoginDto) {
		return await this.userService.login(loginDto.email, loginDto.password);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("email")
	getEmail(@UserInfo() user: User) {
		return { email: user.email };
	}
}
