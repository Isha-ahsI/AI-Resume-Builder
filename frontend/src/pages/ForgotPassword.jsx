import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FiLoader, FiMail, FiArrowRight } from "react-icons/fi";
import { AuthLayout } from "../components/ui/AuthLayout";
import { AUTH } from "../data/testIds";

export const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const nav = useNavigate();

    const onSubmit = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
        setSent(true);
        toast.success("Reset link sent — check your inbox (demo).");
    };

    return (
        <>
            <AuthLayout title="Reset your password" subtitle="We'll email you a secure link to reset your password." footer={<>Remembered it? <Link to="/login" className="font-semibold text-foreground hover:text-primary">Back to login</Link></>}>
                {sent ? (
                    <div className="rounded-2xl border border-border bg-muted/40 p-6 text-sm">
                        <p className="font-heading font-semibold text-base">Check your email</p>
                        <p className="mt-2 text-muted-foreground">If an account exists, a reset link has been sent. Follow it to set a new password. In this demo you can jump straight to the reset page.</p>
                        <button onClick={() => nav("/reset-password")} className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-foreground text-background font-semibold text-sm">Open reset page <FiArrowRight className="h-4 w-4" /></button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <label className="block">
                            <span className="text-xs font-medium text-muted-foreground">Email</span>
                            <div className="mt-1 flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3 focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/10">
                                <FiMail className="h-4 w-4 text-muted-foreground" />
                                <input type="email" data-testid={AUTH.forgotEmail} placeholder="you@company.com" className="w-full bg-transparent focus:outline-none text-sm"
                                    {...register("email", { required: "Email required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} />
                            </div>
                        </label>
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                        <button type="submit" disabled={loading} data-testid={AUTH.forgotSubmit} className="w-full h-11 rounded-full bg-foreground text-background font-semibold text-sm inline-flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : null} Send reset link
                        </button>
                    </form>
                )}
            </AuthLayout>
        </>
    )
}