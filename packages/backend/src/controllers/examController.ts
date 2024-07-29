import { RequestHandler } from 'express';
import zod from 'zod';
import ExamService from '../services/examService';
import {sucessJsonRes} from '../helpers/jsonResponseHelper';
import {HttpStatusCode} from '../utils/httpStatusCode';

const getExamSchema = zod.object({
    query: zod.object({
        examId: zod.number(),
    })
});


export const getExamController: RequestHandler = async (req, res, next) => {
    try {
        const { examId } = getExamSchema.parse(req.params).query;
        const exam = await (await ExamService.initialize(examId)).getExam();
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, exam).send();
    } catch (e) {
        next(e);
    }
}

const addExamSchema = zod.object({
    body: zod.object({
        name: zod.string().nonempty(),
        description: zod.string().nonempty(),
    })
});

export const addExamController: RequestHandler = async (req, res, next) => {
    try {
        const { name, description } = addExamSchema.parse(req.body).body;
        const examId = await ExamService.addExam({ name, description });
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, { examId }).send();
    } catch (e) {
        next(e);
    }
}

const removeExamSchema = zod.object({
    params: zod.object({
        examId: zod.number(),
    })
});

export const removeExamController: RequestHandler = async (req, res, next) => {
    try {
        const { examId } = removeExamSchema.parse(req.params).params;
        await (await ExamService.initialize(examId)).removeExam(examId);
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const updateExamSchema = zod.object({
    query: zod.object({
        examId: zod.number(),
    }),
    body: zod.object({
        name: zod.string().nonempty(),
        description: zod.string().nonempty(),
    })
});

export const updateExamController: RequestHandler = async (req, res, next) => {
    try {
        const parsed = updateExamSchema.parse(req.params);
        const examId = parsed.query.examId;
        const { name, description } = parsed.body;
        await (await ExamService.initialize(examId)).updateExam({ name, description });
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const getExamsSchema = zod.object({
    query: zod.object({
        page: zod.number(),
        pageSize: zod.number(),
    })
});

export const getExamsController: RequestHandler = async (req, res, next) => {
    try {
        const { page, pageSize } = getExamsSchema.parse(req.query).query;
        const exams = await ExamService.getExamsPaginated(page, pageSize);
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, exams).send();
    } catch (e) {
        next(e);
    }
}

const getExamsPaginatedSchema = zod.object({
    query: zod.object({
        page: zod.number(),
        pageSize: zod.number(),
    })
});

export const getExamsPaginatedController: RequestHandler = async (req, res, next) => {
    try {
        const { page, pageSize } = getExamsPaginatedSchema.parse(req.query).query;
        const exams = await ExamService.getExamsPaginated(page, pageSize);
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, exams).send();
    } catch (e) {
        next(e);
    }
}