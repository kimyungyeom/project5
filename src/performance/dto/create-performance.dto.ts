import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class CreatePerformanceDto {
	@IsString()
	@IsNotEmpty({ message: "제목을 입력해주세요." })
	title: string;

	@IsString()
	@IsNotEmpty({ message: "공연 정보를 입력해주세요." })
	content: string;

	@IsArray()
	@IsNotEmpty({ message: "날짜를 입력해주세요. " })
	date: string[];

	@IsString()
	@IsNotEmpty({ message: "장소를 입력해주세요." })
	venue: string;

	@IsNumber()
	@IsNotEmpty({ message: "좌석 정보를 입력해주세요." })
	seat: number;

	@IsString()
	@IsNotEmpty({ message: "이미지를 넣어주세요" })
	image: string;

	@IsString()
	@IsNotEmpty({ message: "카테고리를 입력해주세요." })
	category: string;

	@IsNumber()
	@IsNotEmpty({ message: "가격을 입력해주세요." })
	price: number;
}
