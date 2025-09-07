"use server"

export async function loginUser(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        console.error("Email or password is missing or not a string.");
        return;
    }

    console.log(email, password);
}