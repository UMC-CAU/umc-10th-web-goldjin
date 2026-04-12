import type { SignupProps } from "../types/signup";



const SignupEmail = ({ watch, register, errors, setStep }: SignupProps) => {


    return (
        <>
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
            onClick={errors.email||!watch("email") ? undefined : () => setStep("password")}
            className={` text-white py-2 rounded-sm w-full ${
            (errors.email || !watch("email"))? "bg-[#202020]" : "hover:cursor-pointer bg-pink-500"
        }`} >다음</button>
        </>
    )
}

export default SignupEmail;