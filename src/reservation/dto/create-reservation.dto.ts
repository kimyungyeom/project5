import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReservationDto {
	@IsNumber()
	@IsNotEmpty({ message: "공연 Id를 확인해주세요." })
	performanceId: number;
}
