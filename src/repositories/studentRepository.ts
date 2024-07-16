import { Database } from "bun:sqlite";
import { StudentRepository } from "@/models/repositories/student";
import { NewStudent, Student, studentSchema } from "@/models/student";
import { HTTPException } from "hono/http-exception";

export class BunStudentRepository implements StudentRepository {
	private db: Database;

	constructor(db: Database) {
		this.db = db;
	}

	async getStudentById(id: string): Promise<Student | null> {
		try {
			const query = this.db.query(`SELECT * FROM student WHERE id = $id`);

			const result = await query.get({
				$id: id,
			});

			return studentSchema.parse(result);
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async getAllStudents(): Promise<Student[]> {
		try {
			const query = this.db.query(`SELECT * FROM student`);

			const result = query.all();

			return studentSchema.array().parse(result);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	aggregateStudent(student: NewStudent): void {
		try {
			const query = this.db
				.query(`INSERT INTO student (ic, name, last_name, current_year, status)
					VALUES ($ic, $name, $last_name, $current_year, $status)`);

			query.run({
				$ic: student.ic,
				$name: student.name,
				$last_name: student.last_name,
				$current_year: student.current_year,
				$status: student.status,
			});
		} catch (err) {
			console.error(err);
			throw new HTTPException(500, { message: "Internal Server Error" });
		}
	}
}
