import { Kysely } from "kysely";
import { Database, ExamLab, NewExamLab as NewLabExam, UpdateExamLab as UpdateLabExam } from "packages/backend/src/db/model";
import {Lab, NewLab, UpdateLab} from "../db/model"
import db from "../loaders/kysle";

class LabService {
    private labId: number;

    private constructor(labId: number) {
        this.labId = labId;
    }

    public static async initialize(labId: number) {
        const res = await db.selectFrom("labs").where("id", "=", labId).execute();
        if (res.length === 0) {
            throw new Error("Lab not found");
        }
        return new LabService(labId);
    }

    public async getLab() {
        return (await db.selectFrom("labs").where("id", "=", this.labId).execute())[0];
    }

    public static async getLabByName(name: string) {
        return (await db.selectFrom("labs").where("name", "=", name).execute())[0];
    }

    public static async addLab(newLab: NewLab) {
        return await db.insertInto("labs").values({
            ...newLab,
        }).returning("id").execute()
    }

    public async removeLab(labId: number) {
        await db.deleteFrom("labs").where("id", "=", labId).execute();
    }

    public async updateLab(updateLab: Omit<UpdateLab, "id">) {
        await db.updateTable("labs").set({
            ...updateLab
        }).where("id", "=", this.labId).execute();
    }

    public async getLabExams(): Promise<ExamLab[]> {
        return (await db.selectFrom("examLabs").selectAll().where("labId", "=", this.labId).execute());
    }

    public async addExamToLab(labExam: Omit<NewLabExam, "labId">) {
        await db.insertInto("examLabs").values({
            labId: this.labId,
            ...labExam,
        })
    }

    public async updateLabExam(updateLabExam: Omit<UpdateLabExam, "id">, examId: number) {
        await db.updateTable("examLabs").set({
            ...updateLabExam
        }).where("examId", "=", examId).where("labId", "=", this.labId).execute()
    }

    public async removeExamFromLab(examId: number) {
        await db.deleteFrom("examLabs").where("examId", "=", examId).where("labId", "=", this.labId).execute();
    }
    
    public static async getLabs() {
        return (await db.selectFrom("labs").execute());
    }

    public static async getLabsPaginated(page: number, pageSize: number) {
        return (await db.selectFrom("labs")
                    .limit(pageSize)
                    .offset(page*pageSize)
                    .execute()
        )
    }
}

export default LabService;