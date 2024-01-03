import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";
import { User } from "src/user/entities/user.entity";
import { Performance } from "src/performance/entities/performance.entity";
import { Reservation } from "./entities/reservation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Performance]), TypeOrmModule.forFeature([Reservation])],
	controllers: [ReservationController],
	providers: [ReservationService],
})
export class ReservationModule {}
