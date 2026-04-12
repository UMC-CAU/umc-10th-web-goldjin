import type { SignupProps } from "../types/signup";



export const SignupPassword = ({watch,register, errors, setStep}: SignupProps) => {
    return (
        <>
        <input
            className="inputClass"
            {...register("password")}
            placeholder="비밀번호를 입력해주세요!" />

        {errors?.password && <p className="text-red-500 text-xs">
            {errors.password.message}
        </p>}

        <input
            className="inputClass"
            {...register("passwordCheck")}
            placeholder="한번 더 입력해주세요!" />

        {errors?.passwordCheck && <p className="text-red-500 text-xs">
            {errors.passwordCheck.message}
        </p>}
        

        <button type="button"
            onClick={ (errors.password || errors.passwordCheck || !watch("password") || !watch("passwordCheck"))? undefined : () => setStep("profile")}
            className={` text-white py-2 rounded-sm w-full ${
            (errors.password || errors.passwordCheck || !watch("password") || !watch("passwordCheck"))? "bg-[#202020]" : "hover:cursor-pointer bg-pink-500"
        }`} >다음</button>
        </>
    )
}