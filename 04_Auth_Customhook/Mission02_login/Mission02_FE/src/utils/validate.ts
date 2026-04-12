export interface UserSigninInfo {
    email: string;
    password: string;
}

const validateUser = (values: UserSigninInfo) => {
    const errors = {
        email: "",
        password: "",
    };

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "이메일 형식이 올바르지 않습니다.";
    }

    if (values.password.length <= 8 || values.password.length >= 20) {
        errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    }

    return errors;
}

const validateSignin = (values: UserSigninInfo) => {
    return validateUser(values);
}


export interface UserSignupInfo extends UserSigninInfo {
    passwordConfirm: string;
}

const validateSignup = (values: UserSignupInfo) => {
    const errors = {
        ...validateUser(values),
        passwordConfirm: "",
    };

    
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    };


    return errors;
}

export {validateSignin, validateSignup};