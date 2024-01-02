import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Performance } from "src/performance/entities/performance.entity";

@Entity({
	name: "reservations",
})
export class Reservation {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "date", nullable: false })
	reservationDate: Date;

	@ManyToOne(() => User, (user) => user.reservations)
	@JoinColumn({ name: "user_id" })
	user: User;

	@Column({ type: "bigint", name: "user_id" })
	user_id: number;

	@ManyToOne(() => Performance, (performance) => performance.reservations, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "performance_id" })
	performance: Performance;

	@Column({ type: "bigint", name: "performance_id" })
	performance_id: number;
}
