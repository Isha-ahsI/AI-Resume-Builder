import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaSpinner,FaLock } from "react-icons/fa";
import {AuthLayout} from "../components/ui/AuthLayout";
import { AUTH } from "../data/testIds";

export const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const password = watch("password");

    const onSubmit = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
        toast.success("Password updated. Please log in.");
        nav("/login");
    };
    return (
        <>
            <AuthLayout title="Set a new password" subtitle="Use at least 8 characters and mix in a number for strong password." footer={<Link to="/login" className="font-semibold text-foreground hover:text-primary">Back to login</Link>}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <F label="New password" testid={AUTH.resetPassword} inputProps={{ ...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 characters" } }) }} />
                    {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                    <F label="Confirm new password" testid={AUTH.resetConfirm} inputProps={{ ...register("confirm", { required: "Please confirm password", validate: (v) => v === password || "Passwords do not match" }) }} />
                    {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
                    <button type="submit" disabled={loading} data-testid={AUTH.resetSubmit} className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm inline-flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? <FaSpinner className="h-4 w-4 animate-spin" /> : null} Update password
                    </button>
                </form>
            </AuthLayout>
        </>
    )

}

function F({ label, testid, inputProps }) {
    return (
        <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <div className="mt-1 flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3 focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/10">
                <FaLock className="h-4 w-4 text-muted-foreground" />
                <input type="password" data-testid={testid} placeholder="••••••••" className="w-full bg-transparent focus:outline-none text-sm" {...inputProps} />
            </div>
        </label>
    );
}
