import { FC } from "react"

import SignInForm from "./sign-in-form"

const SignInSection: FC = () => {
    return (
        <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignInForm />
            </div>
        </section>
    )
}

export default SignInSection
