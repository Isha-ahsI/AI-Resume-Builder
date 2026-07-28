import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FiLoader, FiMail, FiUser, FiLock } from "react-icons/fi";
import { AuthLayout } from "../components/ui/AuthLayout";
import { AUTH } from "../data/testIds";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const { register: doRegister } = useAuth();
    const nav = useNavigate();
    const password = watch("password");

    const onSubmit = async (v) => {
        setLoading(true);
        try {
            await doRegister({ name: v.name, email: v.email });
            toast.success("Account created — let's set you up.");
            nav("/setup");
        } finally { setLoading(false); }
    };
    return (
        <>
            <AuthLayout title="Create your account" subtitle="60 seconds. No card. Free forever plan." footer={<>Already have an account? <Link to="/login" className="font-semibold text-foreground hover:text-primary">Log in</Link></>}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Field icon={FiUser} label="Full name">
                        <input type="text" data-testid={AUTH.registerName} placeholder="Alex Morgan" className="w-full bg-transparent focus:outline-none text-sm"
                            {...register("name", { required: "Name required", minLength: { value: 2, message: "Too short" } })} />
                    </Field>
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    <Field icon={FiMail} label="Email">
                        <input type="email" data-testid={AUTH.registerEmail} placeholder="you@company.com" className="w-full bg-transparent focus:outline-none text-sm"
                            {...register("email", { required: "Email required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} />
                    </Field>
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    <Field icon={FiLock} label="Password">
                        <input type="password" data-testid={AUTH.registerPassword} placeholder="Min 6 characters" className="w-full bg-transparent focus:outline-none text-sm"
                            {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } })} />
                    </Field>
                    {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                    <Field icon={FiLock} label="Confirm password">
                        <input type="password" data-testid={AUTH.registerConfirm} placeholder="Repeat password" className="w-full bg-transparent focus:outline-none text-sm"
                            {...register("confirm", { required: "Please confirm password", validate: (v) => v === password || "Passwords do not match" })} />
                    </Field>
                    {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}

                    <button type="submit" disabled={loading} data-testid={AUTH.registerSubmit} className="btn-shine relative overflow-hidden w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm inline-flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : null} Create account
                    </button>
                    <p className="text-xs text-muted-foreground text-center">By creating an account you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
                </form>
            </AuthLayout>
        </>
    )
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3 focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/10">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
        {children}
      </div>
    </label>
  );
}