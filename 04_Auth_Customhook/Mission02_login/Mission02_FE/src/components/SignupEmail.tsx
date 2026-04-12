import useForm from "../hooks/useForm";
import { validateSignup, type UserSignupInfo } from "../utils/validate";

const SignupEmail = () => {
    const {errors, touched, getInputProps} = useForm<UserSignupInfo>({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validate: validateSignup
    })


    return (
        <main className="flex flex-col items-left gap-4">
            <div className={"inputClass" + " text-center"}> 구글 로그인 </div>
            
            <div className="flex w-full items-center justify-between gap-2">
                <hr className="border-gray-400 w-full" />
                <span className="px-2 text-sm w-80 text-gray-200 text-center">OR</span>
                <hr className="border-gray-400 w-full" />
            </div>

            <input
                className={"inputClass"}
                {...getInputProps("email")}
                placeholder="이메일을 입력해주세요!" />

            {errors?.email && touched?.email &&  <p className="text-red-500 text-xs">
                {errors.email}
            </p>}
            

            <Link to="/signup/password" className={` text-white py-2 rounded-sm w-full ${
                (errors?.email)? "bg-[#202020]" : "hover:cursor-pointer bg-pink-500"
            }`} >다음</Link>
        </main>
    )
}

export default SignupEmail;