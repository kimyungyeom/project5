import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { User } from "src/user/entities/user.entity";
import { Performance } from "src/performance/entities/performance.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";

@Injectable()
export class ReservationService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Performance)
		private performanceRepository: Repository<Performance>,
		@InjectRepository(Reservation)
		private reservationRepository: Repository<Reservation>,
	) {}

	// 예약 신청
	async create(user: User, performanceId: number, createReservationDto: CreateReservationDto) {
		const performance = await this.performanceRepository.findOne({
			where: { id: performanceId },
		});

		// 공연 존재 여부
		if (!performance) {
			throw new NotFoundException("공연이 존재하지 않습니다.");
		}

		// 좌석 수 체크
		if (performance.seat <= 0) {
			throw new BadRequestException("좌석이 모두 소진되었습니다.");
		}

		const existReservation = await this.reservationRepository.findOne({
			where: {
				user: { id: user.id },
				performance: { id: performanceId },
			},
		});

		// 예약 신청 여부
		if (existReservation) {
			throw new BadRequestException("이미 예매중입니다.");
		}

		// 포인트체크
		if (user.point < performance.price) {
			throw new BadRequestException("잔액이 부족합니다.");
		}

		// 예약 신청 시 해당 유저 포인트 감소
		user.point -= performance.price;
		await this.userRepository.save(user);

		// 예약 신청마다 seat수 감소
		performance.seat--;
		await this.performanceRepository.save(performance);

		const reservation = new Reservation();
		reservation.user = user;
		reservation.performance = performance;
		reservation.reservationDate = new Date();
		await this.reservationRepository.save(reservation);

		return {
			reservationDate: reservation.reservationDate,
			performanceTitle: performance.title,
			performanceDate: performance.date,
			venue: performance.venue,
			price: performance.price,
		};
	}

	// 예약 내역 확인
	async getReservationList(userId: number): Promise<Reservation[]> {
		return await this.reservationRepository.find({
			where: { user_id: userId },
			order: { id: "DESC" },
		});
	}

	// 예약 취소
	remove(id: number) {
		return `This action removes a #${id} reservation`;
	}
}
