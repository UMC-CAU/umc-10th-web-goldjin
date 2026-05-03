import type { SignupProps } from "../types/signup"

export const SignupProfile = ({watch,register, errors, setStep}: SignupProps) => {
    return (
        <>
        <img src="/src/assets/profile.jpg" alt="Profile Image" className=" w-30 h-30 rounded-full object-cover mx-auto mb-4" />


        <input
        className="inputClass"
        {...register("name")}
        placeholder="이름을 입력해주세요!" />

        {errors?.name && <p className="text-red-500 text-xs">
            {errors.name.message}
        </p>}
        

        <button type="button"
            onClick={ (errors.name || !watch("name"))? undefined : () => setStep("complete")}
            className={` text-white py-2 rounded-sm w-full ${
            (errors.name || !watch("name"))? "bg-[#202020]" : "hover:cursor-pointer bg-pink-500"
        }`} >회원가입 완료</button>
        </>
    )
}