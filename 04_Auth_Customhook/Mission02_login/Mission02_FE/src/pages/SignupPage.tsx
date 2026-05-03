import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import z from "zod"
import { SignupProfile } from "../components/SignupProfile";
import { SignupPassword } from "../components/SignupPassword";
import SignupEmail from "../components/SignupEmail";


const schema = z.object({
    email: z.email({message: "이메일 형식이 올바르지 않습니다."}),
    password: z
        .string()
        .min(8, {
            message: "비밀번호는 8자 이상이여야합니다."
        })
        .max(20, {
            message: "비밀번호는 20자 이하이여야합니다."
        }),
    passwordCheck: z
        .string()
        .min(8, {
            message: "비밀번호는 8자 이상이여야합니다."
        })
        .max(20, {
            message: "비밀번호는 20자 이하이여야합니다."
        }),
    name: z
    .string()
    .min(1, {message: "이름을 입력해주세요."})
})
.refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
})

type FormFields = z.infer<typeof schema>

function SignupPage() {
    const {watch, register, handleSubmit, formState: {errors}} = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
            passwordCheck: "",
            name: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    })


    const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
        const {passwordCheck, ...signupData} = data;
        console.log(signupData);
    };

    
    type step = "email" | "password" | "profile"|"complete";
    const [step, setStep] = useState<step>("email");

    useEffect(() => {

        if (step === "complete") {
            handleSubmit(onSubmit)();
        }
        
    }, [step])

    const goBack = () => {
        if (step === "email") {
            navigate(-1);
        } else {
            setStep(prev => {
                if (prev === "email") return prev;
                if (prev === "password") return "email";
                if (prev === "profile") return "password";
                return prev;
            })
        }
    }

    const navigate = useNavigate()
    return (
        <div className="w-70 mt-[15vh]">
            <header className="w-full grid grid-cols-4 justify-items-center py-4 mb-5">
                <button className="text-md mr-10 hover:cursor-pointer" onClick={goBack}>〈</button>
                <h1 className="col-span-2 text-xl">회원가입</h1>
            </header>
            <main className="flex flex-col items-left gap-4">

                {step === "email" && <SignupEmail watch={watch} register={register}  errors={errors} setStep={setStep} />}
                {step === "password" && <SignupPassword watch={watch} register={register} errors={errors} setStep={setStep} />}
                {step === "profile" && <SignupProfile watch={watch} register={register} errors={errors} setStep={setStep} />}

            </main>
        </div>
    )
}

export default SignupPage

