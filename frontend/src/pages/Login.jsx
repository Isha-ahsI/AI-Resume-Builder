import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FiLoader, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { AuthLayout } from "../components/ui/AuthLayout";
import { AUTH } from "../data/testIds";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const { login } = useAuth();
    const nav = useNavigate();

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            await login(values);
            toast.success("Welcome back!");
            nav("/dashboard");
        } finally { setLoading(false); }
    };

    const onGoogle = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        await login({ email: "demo@rezume.app", name: "Demo User" });
        toast.success("Signed in with Google (demo)");
        setLoading(false);
        nav("/dashboard");
    };

    return (
        <>
            <AuthLayout title="Welcome back" subtitle="Log in to continue crafting your resume." footer={<>Don't have an account? <Link to="/register" className="font-semibold text-foreground hover:text-primary">Create one</Link></>}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Field icon={FiMail} label="Email">
                        <input
                            type="email"
                            data-testid={AUTH.loginEmail}
                            {...register("email", { required: "Email required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                            placeholder="you@company.com"
                            className="w-full bg-transparent focus:outline-none text-sm"
                        />
                    </Field>
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    <Field icon={FiLock} label="Password" right={<button type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground hover:text-foreground">{show ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}</button>}>
                        <input
                            type={show ? "text" : "password"}
                            data-testid={AUTH.loginPassword}
                            {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } })}
                            placeholder="Your password"
                            className="w-full bg-transparent focus:outline-none text-sm"
                        />
                    </Field>
                    {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" data-testid={AUTH.loginRemember} {...register("remember")} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                            Remember me
                        </label>
                        <Link to="/forgot-password" data-testid={AUTH.loginForgot} className="text-primary hover:underline">Forgot password?</Link>
                    </div>

                    <button type="submit" disabled={loading} data-testid={AUTH.loginSubmit} className="btn-shine relative overflow-hidden w-full h-11 rounded-full bg-foreground text-background font-semibold text-sm inline-flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : null} Log in
                    </button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><div className="w-full h-px bg-border" /></div>
                        <div className="relative flex justify-center"><span className="bg-background px-2 text-xs text-muted-foreground">or</span></div>
                    </div>

                    <button type="button" onClick={onGoogle} disabled={loading} data-testid={AUTH.loginGoogle} className="w-full h-11 rounded-full border border-border bg-background text-foreground font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-muted">
                        <GoogleIcon /> Continue with Google
                    </button>
                </form>
            </AuthLayout>
        </>
    )
}


function Field({ icon: Icon, label, right, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3 focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/10 transition-colors">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
        {children}
        {right}
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.9.5 7 5.6 3.2 13l7.8 6c1.8-5.4 6.9-9.5 13-9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.5 3-2.2 5.6-4.7 7.3l7.3 5.7c4.3-3.9 6.8-9.8 6.8-17.5z"/><path fill="#FBBC05" d="M11 28.5c-.5-1.4-.8-2.9-.8-4.5s.3-3.1.8-4.5l-7.8-6C1.2 16.9.5 20.4.5 24s.7 7.1 2 10.5l8.5-6z"/><path fill="#34A853" d="M24 47.5c6.2 0 11.6-2 15.5-5.6l-7.3-5.7c-2 1.4-4.7 2.3-8.2 2.3-6.1 0-11.2-4.1-13-9.5l-8.5 6c3.8 7.5 11.7 12.5 21.5 12.5z"/></svg>
  );
}
