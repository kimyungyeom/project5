import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/user/types/userRole.type";
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { CreatePerformanceDto } from "./dto/create-performance.dto";
import { UpdatePerformanceDto } from "./dto/update-performance.dto";

@UseGuards(RolesGuard)
@Controller("performance")
export class PerformanceController {
	constructor(private readonly performanceService: PerformanceService) {}

	// 생성
	@Roles(Role.Admin)
	@Post()
	create(@Body() createPerformanceDto: CreatePerformanceDto) {
		return this.performanceService.create(createPerformanceDto);
	}

	// 목록 조회
	@Get()
	findAll() {
		return this.performanceService.findAll();
	}

	// 상세 조회
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.performanceService.findOne(+id);
	}

	// 수정
	@Roles(Role.Admin)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updatePerformanceDto: UpdatePerformanceDto) {
		return this.performanceService.update(+id, updatePerformanceDto);
	}

	// 삭제
	@Roles(Role.Admin)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.performanceService.remove(+id);
	}
}
