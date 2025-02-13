"use client";
import { useFormState } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTransition, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { loginAction } from "@/lib/action";
import { type LoginState } from "@/lib/type";

// Define validation schema
const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address").required("Email is required"),
	password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});
interface LoginValues {
	email: string;
	password: string;
}

export function LoginForm() {
	const [state, formAction] = useFormState<LoginState, FormData>(loginAction, null);
	const [pending, startTransition] = useTransition();
	const [showError, setShowError] = useState(false);

	const handleSubmit = async (values: LoginValues) => {
		// 提交时允许显示错误

		startTransition(async () => {
			const formData = new FormData();
			formData.append("email", values.email);
			formData.append("password", values.password);
			formAction(formData);
			setShowError(true);
		});
	};
	// Add useEffect to handle successful login

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={LoginSchema}
				onSubmit={handleSubmit}
			>
				<Form
					className="rounded border p-8 shadow-md"
					onChange={() => setShowError(false)} // 任何输入变化时隐藏错误
				>
					<div className="mb-2">
						<label className="sr-only" htmlFor="email">
							Email
						</label>
						<Field
							type="email"
							name="email"
							placeholder="Email"
							className="w-full rounded border bg-neutral-50 px-4 py-2"
						/>
						<ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
					</div>

					<div className="mb-4">
						<label className="sr-only" htmlFor="password">
							Password
						</label>
						<Field
							type="password"
							name="password"
							placeholder="Password"
							autoCapitalize="off"
							autoComplete="off"
							className="w-full rounded border bg-neutral-50 px-4 py-2"
						/>
						<ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
					</div>

					<SubmitButton isSubmitting={pending} />

					{showError && state?.error && (
						<div className="mt-4 text-sm font-semibold text-red-500">
							<p>Failed to login</p>
						</div>
					)}
				</Form>
			</Formik>
			<div></div>
		</div>
	);
}
