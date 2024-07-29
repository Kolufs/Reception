import zod from 'zod';
import { RequestHandler } from 'express';
import LabService from '../services/labService';
import {sucessJsonRes} from '../helpers/jsonResponseHelper';
import {HttpStatusCode} from '../utils/httpStatusCode';

const getLab = zod.object({
    query: zod.object({
        labId: zod.number(),
    })
});

export const getLabController: RequestHandler = async (req, res, next) => {
    try {
        const { labId } = getLab.parse(req.params).query;
        const lab = await (await LabService.initialize(labId)).getLab();
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, lab).send();
    } catch (e) {
        next(e);
    }
}

const getLabByNameSchema = zod.object({
    query: zod.object({
        name: zod.string().nonempty(),
    })
});

export const getLabByNameController: RequestHandler = async (req, res, next) => {
    try {
        const { name } = getLabByNameSchema.parse(req.params).query;
        const lab = await LabService.getLabByName(name);
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, lab).send();
    } catch (e) {
        next(e);
    }
}

const addLabSchema = zod.object({
    body: zod.object({
        name: zod.string().nonempty(),
        phone: zod.string().nonempty(),
    })
});

export const addLabController: RequestHandler = async (req, res, next) => {
    try {
        const { name, phone } = addLabSchema.parse(req.body).body;
        const labId = await LabService.addLab({ name, phone });
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, { labId }).send();
    } catch (e) {
        next(e);
    }
}

const removeLabSchema = zod.object({
    query: zod.object({
        labId: zod.number(),
    })
});

export const removeLabController: RequestHandler = async (req, res, next) => {
    try {
        const { labId } = removeLabSchema.parse(req.params).query;
        await (await LabService.initialize(labId)).removeLab(labId);
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const updateLabSchema = zod.object({
    params: zod.object({
        labId: zod.number(),
    }),
    body: zod.object({
        name: zod.string().nonempty(),
        phone: zod.string().nonempty(),
    })
});

export const updateLabController: RequestHandler = async (req, res, next) => {
    try {
        const { labId } = updateLabSchema.parse(req.params).params;
        const { name, phone } = updateLabSchema.parse(req.body).body;
        await (await LabService.initialize(labId)).updateLab({ name, phone });
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const getLabExamsSchema = zod.object({
    query: zod.object({
        labId: zod.number(),
    })
});

export const getLabExamsController: RequestHandler = async (req, res, next) => {
    try {
        const { labId } = getLabExamsSchema.parse(req.params).query;
        const exams = await (await LabService.initialize(labId)).getLabExams();
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, exams).send();
    } catch (e) {
        next(e);
    }
}

const addExamToLabSchema = zod.object({
    query: zod.object({
        labId: zod.number(),
    }),
    body: zod.object({
        examId: zod.number(),
        price: zod.number(),
    })
});

export const addExamToLabController: RequestHandler = async (req, res, next) => {
    try {
        const { labId } = addExamToLabSchema.parse(req.params).query;
        const { examId, price } = addExamToLabSchema.parse(req.body).body;
        await (await LabService.initialize(labId)).addExamToLab({ examId, price });
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const updateLabExamSchema = zod.object({
    query: zod.object({
        labId: zod.number(),
        examId: zod.number(),
    }),
    body: zod.object({
        price: zod.number(),
    })
});


export const updateLabExamController: RequestHandler = async (req, res, next) => {
    try {
        const parsed = updateLabExamSchema.parse(req.params);
        const { labId, examId } = parsed.query;
        const { price } = updateLabExamSchema.parse(req.body).body;
        await (await LabService.initialize(labId)).updateLabExam({ price }, examId);
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const removeExamFromLabSchema = zod.object({
    query: zod.object({
        labId: zod.number(),
        examId: zod.number(),
    })
});

export const removeExamFromLabController: RequestHandler = async (req, res, next) => {
    try {
        const { labId, examId } = removeExamFromLabSchema.parse(req.body).query;
        await (await LabService.initialize(labId)).removeExamFromLab(examId);
        sucessJsonRes(res, HttpStatusCode.Ok).send();
    } catch (e) {
        next(e);
    }
}

const getLabsSchema = zod.object({});

export const getLabsController: RequestHandler = async (req, res, next) => {
    try {
        const labs = await LabService.getLabs();
        res.json(labs);
    } catch (e) {
        next(e);
    }
}

const getLabsPaginatedSchema = zod.object({
    query: zod.object({
        page: zod.number(),
        pageSize: zod.number(),
    })
});

export const getLabsPaginatedController: RequestHandler = async (req, res, next) => {
    try {
        const { page, pageSize } = getLabsPaginatedSchema.parse(req.query).query;
        const labs = await LabService.getLabsPaginated(page, pageSize);
        sucessJsonRes(res, HttpStatusCode.Ok, undefined, labs).send();
    } catch (e) {
        next(e);
    }
}