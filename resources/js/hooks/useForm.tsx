import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";

interface ReturnedData<TResponse> {
    values: TResponse
    setValues: (values: TResponse) => void
    setValue: (data: {fieldName: string, value: string | boolean}) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    errors: {[key: string]: Array<string>}
    setErrors: (errors: {[key: string]: Array<string>}) => void
    touched: Array<string>
    validate: () => void
    isValid: boolean
    changed: Array<string>
}

interface IRules {
    [key: string]: Array<string>
}

interface Validator {
    validate: (value?: string | boolean, values?: {[key: string]: string | boolean}) => boolean
    getMessage: (params: {arg?: string, trans: any}) => string
}

export function useForm<T = any>(rules: IRules, initialValues?: T): ReturnedData<T> {
    const {t} = useTranslation();

    const [values, setValues] = useState<T>({} as T);
    const [errors, setErrors] = useState<{[key: string]: Array<string>}>({});
    const [touched, setTouched] = useState<Array<string>>([]);
    const [changed, setChanged] = useState<Array<string>>([]);

    useEffect(() => {
        if (initialValues) {
            setValues(initialValues);
        }
    }, []);

    useEffect(() => {
        validateTouched();
    }, [touched]);

    useEffect(() => {
        setTouched(Object.keys(values));
    }, [values]);

    const changeValue = ({fieldName, value}: {fieldName: string, value: string | boolean}) => {
        setChanged([...changed.filter(name => name != fieldName), fieldName]);
        setValues({
            ...values,
            [fieldName]: value,
        })
    };

    const isValid = useMemo(() => {
        if (Object.keys(rules).length === 0) return true;

        let isValid = true;

        Object.keys(rules).forEach(fieldName => {
            if (!touched.includes(fieldName)) {
                isValid = false;
                return;
            }

            if (errors[fieldName] && !!errors[fieldName].length) {
                isValid = false;
                return;
            }
        });

        return isValid;
    }, [errors, touched]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name) {
            setTouched([...touched.filter(item => item !== e.target.name), e.target.name]);
            setValues({
                ...values,
                [e.target.name] : e.target.checked || e.target.value
            });
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!touched.includes(e.target.name)) {
            setTouched([...touched, e.target.name]);
        }
    };

    const validateTouched = () => {
        if (!touched.length) return;

        touched.forEach(fieldName => {
            validate(fieldName, values[fieldName]);
        });
    };

    const handleSetErrors = (errors: {[key: string]: Array<string>}) => {
        setErrors(errors);
    };

    const validateAll = () => {
        setTouched(Object.keys(rules));
    };

    const validate = (fieldName: string, value?: string | boolean) => {
        if (!rules[fieldName]) {
            return;
        }

        if (rules[fieldName].includes("nullable") && !value) {
            setErrors(prev => ({...prev, [fieldName]: []}));
            return;
        }

        rules[fieldName].forEach(ruleName => {

            const ruleParams = parseRuleName(ruleName);
            if (!ruleParams) return;

            const validator: Validator | undefined = getValidatorByString(ruleName, values);
            if (!validator) return;

            const message = validator.getMessage({arg: ruleParams.arg, trans: t});

            const hasMessage = (message: string) => {
                if (!errors[fieldName]) {
                    return false;
                }

                return errors[fieldName].includes(message);
            };

            if (!validator.validate(value)) {

                if (hasMessage(message)) {
                    return;
                }

                setErrors(prev => ({...prev, [fieldName]: [...(prev[fieldName] ? prev[fieldName] : []) , message]}))
            } else if (hasMessage(message)) {
                setErrors(prev => ({...prev, [fieldName]: prev[fieldName].filter(oldMessage => oldMessage !== message)}));
            }
        });
    };

    return {
        values,
        setValues,
        setValue: changeValue,
        onChange: handleChange,
        onBlur: handleBlur,
        errors,
        setErrors: handleSetErrors,
        touched,
        validate: validateAll,
        isValid,
        changed
    }
}

const parseRuleName = (ruleName: string): {name: string, arg?: string} | undefined => {
    const expression = /^(.+):(.+)$|^([^:]+)$/i;
    const search = ruleName.match(expression);

    if (!search) {
        return;
    }

    if (search[1] && search[2]) {
        return {name: search[1], arg: search[2]}
    }

    if (search[3]) {
        return {name: search[3]}
    }
};

function getValidatorByString<T>(ruleName: string, values?: T): Validator | undefined {
    const ruleParams = parseRuleName(ruleName);

    if (!ruleParams) return;

    switch (ruleParams.name) {
        case "required":
            return getRequiredValidator();
        case "min" :
            return getMinLengthValidator(ruleParams.arg);
        case "equals":
            return getEqualsValidator<T>(ruleParams.arg, values);
    }
};

const getRequiredValidator = (): Validator => {
    return {
        validate(value?: string | boolean): boolean {
            return !!value;
        },
        getMessage: ({trans}: {arg?: string, trans: any}) => {
            return trans("validation.required")
        }
    }
};

const getMinLengthValidator = (arg?: string): Validator => {
    return {
        validate(value?: string | boolean): boolean {
            if (!value) return false;
            if (value === true) return true;
            return value.length >= parseInt(arg || "0")
        },
        getMessage: ({trans}: {arg?: string, trans: any}) => {
            return trans("validation.min_interval", {postProcess: 'interval', count: arg, })
        }
    }
};

function getEqualsValidator<T>(arg?: string, values?: T): Validator {
    return {
        validate(value?: string | boolean): boolean {
            if (!values || !arg) return false;
            return value === values[arg];
        },
        getMessage: ({trans}: {arg?: string, trans: any}) => {
            return trans("validation.equals", {arg: trans(`validationArgs.${arg}`)})
        }
    }
};
