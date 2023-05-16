"use client";

import Button from "@/app/components/buttons";
import Input from "@/app/components/inputs/input";
import AuthSocialButton from "@/app/(site)/components/auth_social_button";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN"); // Default value is LOGIN
  const [isLoading, setIsLoading] = useState(false); // Default value is False

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      // Axios Reister
    }

    if (variant === "LOGIN") {
      // NextAuth Signin
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth social sign in
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Only show the Name input form if we're in the register state */}
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          {/* Else we can show the others */}
          <Input
            label="Email"
            register={register}
            id="email"
            type="email"
            errors={errors}
            disabled={isLoading}
          />

          <Input
            label="Password"
            register={register}
            id="password"
            type="password"
            errors={errors}
            disabled={isLoading}
          />

          {/* This is the sign-in/register button */}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign-in" : "Register"}
            </Button>
          </div>
        </form>

        {/* This whole thing is a gray line with text in the middle + the social auth buttons */}
        <div className="mt-6">
          <div className="relative">
            {/* This is just a gray line*/}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            {/* This is to add text in the middle of the gray line */}
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* This is the section where we have the auth with social buttons */}
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("github")}
            />
          </div>
        </div>

        {/* This is where we offer to both create an account OR log-in AND we change the toggleVariant state when the user clicks the text!!! SO COOL*/}
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant == "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
