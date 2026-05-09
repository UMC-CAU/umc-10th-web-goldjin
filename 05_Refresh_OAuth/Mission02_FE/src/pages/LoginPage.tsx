import { Link, useNavigate } from "react-router-dom"
import { validateSignin, type UserSigninInfo } from "../utils/validate"
import useForm from "../hooks/useForm";
import { useAuth } from "../contexts/AuthContext";


const LoginPage = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    
    const {values, errors, touched, getInputProps} = useForm<UserSigninInfo>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin
    })

    const onSubmit = async (data: UserSigninInfo) => {
            await login(data);
            await navigate("/my");
        };

   

    return (
        <div className="w-70 mt-[15vh]">
            <header className="w-full grid grid-cols-4 justify-items-center py-4 mb-5">
                <button className="text-md mr-10 hover:cursor-pointer" onClick={async () => await navigate(-1)}>〈</button>
                <h1 className="col-span-2 text-xl">로그인</h1>
            </header>


            <main className="flex flex-col items-left gap-4">
                <Link to={`${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`} className="inputClass text-center"> 구글 로그인 </Link>
                
                <div className="flex w-full items-center justify-between gap-2">
                    <hr className="border-gray-400 w-full" />
                    <span className="px-2 text-sm w-80 text-gray-200 text-center">OR</span>
                    <hr className="border-gray-400 w-full" />
                </div>

                <input
                    className="inputClass"
                    {...getInputProps("email")}
                    placeholder="이메일을 입력해주세요!" />

                {errors?.email && touched?.email &&  <p className="text-red-500 text-xs">
                    {errors.email}
                </p>}
                
                <input 
                    type="password"
                    className="inputClass"
                    {...getInputProps("password")}
                    placeholder="비밀번호를 입력해주세요!" />
                
                {errors?.password && touched?.password && <p className="text-red-500 text-xs">
                    {errors.password}
                </p>}

                <button className={` text-white py-2 rounded-sm w-full ${
                    (errors?.email || errors?.password )? "bg-[#202020]" : "hover:cursor-pointer bg-pink-500"
                }`} onClick={async () => await onSubmit(values)}>로그인</button>
            </main>
        </div>
    )
}

export default LoginPage;