"use server";


import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type LoginState } from "./type";
import { getServerAuthClient } from "@/app/config";

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		return { error: "Email and password are required" };
	}

	const { data } = await getServerAuthClient().signIn({ email, password }, { cache: "no-store" });

	if (data.tokenCreate.errors.length > 0) {
		return { error: data.tokenCreate.errors.map((error) => error.message).join(", ") };
	}
	revalidatePath("/");
	redirect("/");
}
