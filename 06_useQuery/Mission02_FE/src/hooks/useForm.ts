import { useEffect, useState } from "react"

interface useFormProps<T> {
    initialValues: T,
    validate: (values: T) => Record<keyof T, string>
}

const useForm = <T>({initialValues, validate}: useFormProps<T>) => {
    const [values, setValues] = useState<T>(initialValues)
    const [touched, setTouched] = useState<Record<keyof T, boolean>>() // record는 객체의 키와 값의 타입을 정의할 수 있는 타입
    const [errors, setErrors] = useState<Record<keyof T, string>>()


    //사용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched as Record<keyof T, boolean>,
            [name]: true,
        });
    }
    

    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(name, e.target.value);
        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values])

    return {values, errors, touched, getInputProps}
}

export default useForm;
