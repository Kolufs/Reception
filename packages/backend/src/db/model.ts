import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Kysely,
    Selectable,
    Updateable,
} from 'kysely'


export interface Database {
    users: UserTable,
    exams: ExamTable,
    labs: LabTable,
    examLabs: ExamLabTable,
    labCollection: LabCollectionTable,
    collectionItems: CollectionItemTable,
    collections: CollectionTable,
}

export interface UserTable {
    id: Generated<number>,
    username: string,
    password: string,
}

export interface ExamTable {
    id: Generated<number>,
    name: string,
    description: string | null,
}

export interface LabTable {
    id: Generated<number>,
    name: string,
    phone: string | null,
}

export interface ExamLabTable {
    id: Generated<number>,
    examId: number,
    labId: number,
    price: number | null,
}

export interface LabCollectionTable {
    id: Generated<number>,
    date: Date,
    labId: number,
    capacity: number | null,
}

export interface CollectionItemTable {
    id: Generated<number>,
    examId: number,
    patientName: string,
}

export interface CollectionTable {
    id: Generated<number>,
    LabCollection: number,
    collectionItemId: number,
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export type Exam = Selectable<ExamTable>;
export type NewExam = Insertable<ExamTable>;
export type UpdateExam = Updateable<ExamTable>;

export type Lab = Selectable<LabTable>;
export type NewLab = Insertable<LabTable>;
export type UpdateLab = Updateable<LabTable>;

export type ExamLab = Selectable<ExamLabTable>;
export type NewExamLab = Insertable<ExamLabTable>;
export type UpdateExamLab = Updateable<ExamLabTable>;

export type LabCollection = Selectable<LabCollectionTable>;
export type NewLabCollection = Insertable<LabCollectionTable>;
export type UpdateLabCollection = Updateable<LabCollectionTable>;

export type CollectionItem = Selectable<CollectionItemTable>;
export type NewCollectionItem = Insertable<CollectionItemTable>;
export type UpdateCollectionItem = Updateable<CollectionItemTable>;

export type Collection = Selectable<CollectionTable>;
export type NewCollection = Insertable<CollectionTable>;
export type UpdateCollection = Updateable<CollectionTable>;
