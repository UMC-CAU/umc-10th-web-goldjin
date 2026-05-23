import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import type { UserSignupInfo } from "../utils/validate";

export interface SignupProps {
    watch: UseFormWatch<UserSignupInfo>;
    register: UseFormRegister<UserSignupInfo>;
    errors: FieldErrors<UserSignupInfo>;
    setStep: React.Dispatch<React.SetStateAction<"email" | "password" | "profile" | "complete">>;
}