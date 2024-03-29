import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// 회원가입
export class RegisterDto {
	@IsEmail()
	@IsNotEmpty({ message: "이메일을 입력해주세요." })
	email: string;

	@IsString()
	@IsNotEmpty({ message: "비밀번호를 입력해주세요." })
	password: string;

	@IsString()
	@IsNotEmpty({ message: "닉네임을 입력해주세요. " })
	nickname: string;
}

// 로그인
export class LoginDto {
	@IsEmail()
	@IsNotEmpty({ message: "이메일을 입력해주세요." })
	email: string;

	@IsString()
	@IsNotEmpty({ message: "비밀번호를 입력해주세요." })
	password: string;
}
