import _ from "lodash";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePerformanceDto } from "./dto/create-performance.dto";
import { UpdatePerformanceDto } from "./dto/update-performance.dto";
import { Performance } from "./entities/performance.entity";

@Injectable()
export class PerformanceService {
	constructor(
		@InjectRepository(Performance)
		private readonly performanceRepository: Repository<Performance>,
	) {}

	// 생성
	async create(createPerformanceDto: CreatePerformanceDto) {
		return await this.performanceRepository.save(createPerformanceDto);
	}

	// 목록 조회
	findAll() {
		return `This action returns all performance`;
	}

	// 상세 조회
	findOne(id: number) {
		return `This action returns a #${id} performance`;
	}

	// 수정
	update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
		return `This action updates a #${id} performance`;
	}

	// 삭제
	remove(id: number) {
		return `This action removes a #${id} performance`;
	}
}
