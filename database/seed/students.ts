import { Database } from "bun:sqlite";

type StudentToInsert = {
	$ic: string;
	$name: string;
	$last_name: string;
	$current_year: number;
	$status: string;
};

export async function insertStudentsCallback(
	db: Database,
): Promise<{ studentsResult: number; repStudentRelationsResult: number }> {
	const insertStudent = db.prepare(
		`INSERT INTO student (ic, name, last_name, current_year, status)
			VALUES ($ic, $name, $last_name, $current_year, $status);`,
	);

	const insertRepresentativeStudent = db.prepare(
		`INSERT INTO representative_student (representative_id, student_id)
			VALUES ($representative_id, $student_id);`,
	);

	const insertStudentTransaction = db.transaction((students) => {
		const studentValues = students as StudentToInsert[];

		for (const student of studentValues) {
			const insertedStudent = insertStudent.run({
				$ic: student.$ic,
				$name: student.$name,
				$last_name: student.$last_name,
				$current_year: student.$current_year,
				$status: student.$status,
			});
		}

		return students.length;
	});

	const insertRepStudentTransaction = db.transaction((repStudentRelations) => {
		const relationsValues = repStudentRelations as {
			$rep_id: number;
			$student_id: number;
		}[];

		for (const relationship of relationsValues) {
			const insertedRelationships = insertRepresentativeStudent.run({
				$representative_id: relationship.$rep_id,
				$student_id: relationship.$student_id,
			});
		}

		return repStudentRelations.length;
	});

	const students: StudentToInsert[] = [
		{
			$ic: "v31852753",
			$name: "Arvy",
			$last_name: "Goncaves",
			$current_year: 1,
			$status: "active",
		},
		{
			$ic: "v31673789",
			$name: "Yancey",
			$last_name: "Whitworth",
			$current_year: 1,
			$status: "active",
		},
		{
			$ic: "v31386081",
			$name: "Rosalyn",
			$last_name: "Wansbury",
			$current_year: 1,
			$status: "active",
		},
		{
			$ic: "v31449913",
			$name: "Gabriel",
			$last_name: "Bernolet",
			$current_year: 2,
			$status: "active",
		},
		{
			$ic: "v31712664",
			$name: "Stormi",
			$last_name: "Teanby",
			$current_year: 3,
			$status: "active",
		},
		{
			$ic: "v31478641",
			$name: "Forrester",
			$last_name: "Donoghue",
			$current_year: 2,
			$status: "active",
		},
	];

	const repStudentRelations: { $rep_id: number; $student_id: number }[] = [
		{ $rep_id: 1, $student_id: 1 },
		{ $rep_id: 2, $student_id: 1 },
		{ $rep_id: 2, $student_id: 2 },
		{ $rep_id: 3, $student_id: 2 },
		{ $rep_id: 3, $student_id: 3 },
		{ $rep_id: 4, $student_id: 3 },
		{ $rep_id: 4, $student_id: 4 },
		{ $rep_id: 5, $student_id: 4 },
		{ $rep_id: 5, $student_id: 5 },
		{ $rep_id: 6, $student_id: 5 },
		{ $rep_id: 6, $student_id: 6 },
		{ $rep_id: 1, $student_id: 6 },
	];

	const studentsResult = insertStudentTransaction(students);
	const repStudentRelationsResult =
		insertRepStudentTransaction(repStudentRelations);

	return { studentsResult, repStudentRelationsResult };
}
