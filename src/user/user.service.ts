// import
import { compare, hash } from "bcrypt";
import _ from "lodash";
import { Repository } from "typeorm";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	// 회원가입
	async register(email: string, password: string, nickname: string) {
		const existingUser = await this.findByEmail(email);
		if (existingUser) {
			throw new ConflictException("이미 해당 이메일로 가입된 사용자가 있습니다!");
		}

		const hashedPassword = await hash(password, 10);
		await this.userRepository.save({
			email,
			password: hashedPassword,
			nickname,
		});
	}

	// 로그인
	async login(email: string, password: string) {
		const user = await this.userRepository.findOne({
			select: ["id", "email", "password"],
			where: { email },
		});
		if (_.isNil(user)) {
			throw new UnauthorizedException("이메일을 확인해주세요.");
		}

		if (!(await compare(password, user.password))) {
			throw new UnauthorizedException("비밀번호를 확인해주세요.");
		}

		const payload = { email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	// 이메일 체크, 내정보 조회로 바꿀 예정
	async findByEmail(email: string) {
		return await this.userRepository.findOneBy({ email });
	}
}
