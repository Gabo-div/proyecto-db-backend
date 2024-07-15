import { Period } from "@/models/period";

export interface PeriodRepository {
	getPeriodById(id: string): Promise<Period | null>;
	getAllPeriods(): Promise<Period[]>;
	createPeriod(period: any): void;
}
