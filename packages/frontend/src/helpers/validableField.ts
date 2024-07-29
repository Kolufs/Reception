import React from "react";
import { ZodAny } from "zod"

type ValidableField<T> = {
    field: any,
    valid: boolean,
}

const validateField = <T>(value: T, parser: ZodAny, setField: React.Dispatch<React.SetStateAction<ValidableField<T>>>): void => {
    setField(
        {
            field: value,
            valid: parser.safeParse(value).success,
        }
    );
}

export {ValidableField, validateField};