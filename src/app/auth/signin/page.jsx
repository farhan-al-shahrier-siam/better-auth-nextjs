"use client";
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

const SignInPage = () => {

    const [isVisible, setIsVisible] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData);

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            rememberMe: true,
            callbackURL: "/dashboard",
        });
    };

    return (
        <div>
            <h2>Please Sign In</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input name="email" placeholder="Your email" />
                    <FieldError />
                </TextField>
                <TextField className="w-full max-w-70" name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input 
                        className="w-full max-w-70" 
                        type={isVisible ? "text" : "password"} 
                        name="password"
                        placeholder="Your password"
                         />
                        <InputGroup.Suffix className="pr-0">
                            <Button isIconOnly aria-label={isVisible ? "Hide password" : "Show password"} size="sm" variant="ghost" onPress={() => setIsVisible(!isVisible)}>
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;
