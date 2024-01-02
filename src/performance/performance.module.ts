import { Module } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { PerformanceController } from "./performance.controller";
import { Performance } from "./entities/performance.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Performance])],
	controllers: [PerformanceController],
	providers: [PerformanceService],
})
export class PerformanceModule {}
