import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../types/reservationStatus.type";

@Entity({
	name: "performances",
})
export class Performance {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", unique: true, nullable: false })
	title: string;

	@Column({ type: "varchar", nullable: false })
	content: string;

	@Column({ type: "text", nullable: false, transformer: { to: JSON.stringify, from: JSON.parse } })
	date: string[];

	@Column({ type: "varchar", nullable: false })
	venue: string;

	@Column({ type: "varchar", nullable: false })
	seatInfo: string;

	@Column({ type: "varchar", nullable: false })
	image: string;

	@Column({ type: "varchar", nullable: false })
	category: string;

	@Column({ type: "int", nullable: false })
	price: number;

	@Column({ type: "enum", enum: Status, default: Status.available })
	status: Status;

	// 나중에 예약과 관계설정하기
}
