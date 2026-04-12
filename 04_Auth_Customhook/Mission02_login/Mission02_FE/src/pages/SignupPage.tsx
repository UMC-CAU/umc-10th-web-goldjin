import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"
import {Link, Outlet, useNavigate } from "react-router-dom"
import z from "zod"


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
    name: z.string().min(1, {
        message: "이름을 입력해주세요."
    }),
}) 

type FormFields = z.infer<typeof schema>

function SignupPage() {
    

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    })


    const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
        console.log(data);
    };

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const navigate = useNavigate()
    return (
        <div className="w-70 mt-[15vh]">
            <header className="w-full grid grid-cols-4 justify-items-center py-4 mb-5">
                <button className="text-md mr-10 hover:cursor-pointer" onClick={async () => await navigate(-1)}>〈</button>
                <h1 className="col-span-2 text-xl">회원가입</h1>
            </header>
            <main className="flex flex-col items-left gap-4">
                <div className={"inputClass" + " text-center"}> 구글 로그인 </div>
                
                <div className="flex w-full items-center justify-between gap-2">
                    <hr className="border-gray-400 w-full" />
                    <span className="px-2 text-sm w-80 text-gray-200 text-center">OR</span>
                    <hr className="border-gray-400 w-full" />
                </div>

                <input
                    className={"inputClass"}
                    {...register("email")}
                    placeholder="이메일을 입력해주세요!" />

                {errors?.email && <p className="text-red-500 text-xs">
                    {errors.email.message}
                </p>}
                

                <button type="button"
                    onClick={handleSubmit(onSubmit)} 
                    className={` text-white py-2 rounded-sm w-full ${
                    (errors.email)? "bg-[#202020]" : "hover:cursor-pointer bg-pink-500"
                }`} >다음</button>
            </main>
        </div>
    )
}

export default SignupPage