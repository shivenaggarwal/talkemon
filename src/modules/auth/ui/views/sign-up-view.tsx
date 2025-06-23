"use client";

// npm import
import { z } from "zod";
import { OctagonAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

// local import
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { useState } from "react";
import { se } from "date-fns/locale";


const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Password is required"),

})
.refine ((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const SignUpView = () => {
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const router = useRouter()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }, 
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },
                onError: ({error}) => {
                    setError(error.message || "An error occurred while signing in.");
                }
            }
        )
    };

    const onSocial = (provider: "github" | "google") => {
        setError(null);
        setPending(true);

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    setPending(false);
                },
                onError: ({error}) => {
                    setError(error.message || "An error occurred while signing in.");
                }
            }
        )
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0 shadow-2xl border-0 bg-gradient-to-br from-amber-100/80 to-orange-100/80 backdrop-blur-sm rounded-3xl max-w-4xl mx-auto w-full">
                <CardContent className="grid p-0 md:grid-cols-2">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-12 bg-gradient-to-br from-cream-100 to-orange-50">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-3xl font-bold text-amber-900 font-serif tracking-wide mb-2">
                                   Let&apos;s get started!
                                </h1>
                                <p className="text-amber-700/80 text-balance font-light">
                                    Create your account
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <FormField 
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-amber-800 font-medium text-sm">Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="text" 
                                                    placeholder="Jon Doe" 
                                                    className="bg-amber-50/50 border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300 shadow-inner"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4">
                                <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-amber-800 font-medium text-sm">Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="email" 
                                                    placeholder="jon@example.com" 
                                                    className="bg-amber-50/50 border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300 shadow-inner"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4">
                                <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-amber-800 font-medium text-sm">Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="********" 
                                                    className="bg-amber-50/50 border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300 shadow-inner"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-4">
                                <FormField 
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-amber-800 font-medium text-sm">ConfirmPassword</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="password" 
                                                    placeholder="********" 
                                                    className="bg-amber-50/50 border-2 border-amber-200 rounded-xl px-4 py-3 text-amber-900 placeholder:text-amber-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-300 shadow-inner"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-600" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {!!error && (
                                <Alert className="bg-red-100/80 border-2 border-red-200 rounded-xl">
                                    <OctagonAlert className="h-4 w-4 !text-red-600" />
                                    <AlertTitle className="text-red-700">
                                        {error}
                                    </AlertTitle>
                                </Alert>
                            )}
                            <Button 
                                disabled={pending}
                                type="submit" 
                                className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                            >
                                Sign Up
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-amber-300">
                            <span className="bg-gradient-to-r from-cream-100 to-orange-50 text-amber-700 relative z-10 px-4 font-light">
                                Or continue with
                            </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button 
                                onClick={() => onSocial("google")}
                                variant={"outline"}
                                type="button"
                                className="w-full bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 rounded-xl py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                                disabled={pending} >
                                    <FaGoogle className="text-amber-600"/>
                                </Button>
                                <Button 
                                variant={"outline"} 
                                onClick={() => onSocial("github")}
                                type="button" 
                                className="w-full bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 rounded-xl py-3 transition-all duration-300 shadow-md hover:shadow-lg" 
                                disabled={pending}>
                                    <FaGithub className="text-amber-600"/>
                                </Button>
                            </div>
                            <div className="text-center text-sm text-amber-700">
                                Already have an account?{" "}
                                <Link href="/sign-in" className="text-amber-600 underline underline-offset-4 hover:text-amber-800 transition-colors duration-300 font-medium">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </Form>

                 <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 relative hidden md:flex flex-col gap-y-6 items-center justify-center p-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-2xl">
                        <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px] filter drop-shadow-lg" />
                    </div>
                    <p className="text-3xl font-bold text-white font-serif tracking-wide drop-shadow-lg">
                        Talkemon
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-r-3xl"></div>
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
                </div>
                </CardContent>
            </Card>

            <div className="text-amber-700/80 text-center text-xs text-balance max-w-md mx-auto">
            By signing in, you agree to our{" "}
                <Link href="/terms" className="text-amber-600 underline underline-offset-4 hover:text-amber-800 transition-colors duration-300">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-amber-600 underline underline-offset-4 hover:text-amber-800 transition-colors duration-300">Privacy Policy</Link>.
            </div>
        </div>
    );
}
