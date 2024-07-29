import db from "../loaders/kysle";
import { Exam, NewExam, UpdateExam } from "../db/model";


class ExamService {
    examId: number

    private constructor(examId: number) {
        this.examId = examId;
    }

    public static async initialize(examId: number) {
        const res = await db.selectFrom("exams")
            .where("id", "=", examId)
            .execute()
        if (res.length === 0) {
            throw new Error("Exam not found")
        }
        return new ExamService(examId)
    }

    public async getExam() {
        return (await db.selectFrom("exams")
            .where("id", "=", this.examId)
            .execute())[0]
    }

    public static async addExam(newExam: Omit<NewExam, "id">) {
        return (await db.insertInto("exams")
            .values({
                ...newExam
            })
            .returning("id")
            .execute())[0]
    } 


    public async removeExam(examId: number) {
        await db.deleteFrom("exams")
            .where("id", "=", examId)
            .execute()
    }

    public async updateExam(updateExam: Omit<UpdateExam, "id">) {
        await db.updateTable("exams")
            .set({
                ...updateExam
            })
            .where("id", "=", this.examId)
            .execute()
    }

    public static async getExams() {
        return (await db.selectFrom("exams").execute())
    }

    public static async getExamsPaginated(page: number, pageSize: number) {
        return (await db.selectFrom("exams")
                    .limit(pageSize)
                    .offset(page*pageSize)
                    .execute()
        )
    }
}

export default ExamService;