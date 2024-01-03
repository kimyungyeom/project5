import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/user/entities/user.entity";
import { UserInfo } from "src/user/utils/userInfo.decorator";

@UseGuards(AuthGuard("jwt"))
@Controller("reservation")
export class ReservationController {
	constructor(private readonly reservationService: ReservationService) {}

	// 예약 신청
	@Post(":performanceId")
	async create(@UserInfo() user: User, @Param("performanceId") performanceId: number, @Body() createReservationDto: CreateReservationDto) {
		return await this.reservationService.create(user, performanceId, createReservationDto);
	}

	// 예약 내역 확인
	@Get()
	async getReservationList(@UserInfo() user: User) {
		const userId = user.id;
		return await this.reservationService.getReservationList(userId);
	}

	// 예약 취소, 추후 예정
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.reservationService.remove(+id);
	}
}
