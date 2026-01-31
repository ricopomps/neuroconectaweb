import { del, put } from "@vercel/blob";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const studentId = formData.get("studentId") as string | null;
  const institutionId = formData.get("institutionId") as string | null;

  if (!file || !studentId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const path = `students/${studentId}/documents/${file.name}`;

  let blob;
  try {
    blob = await put(path, file, {
      access: "public",
      allowOverwrite: false,
    });
  } catch (error) {
    console.error("Blob upload failed:", error);

    return NextResponse.json(
      { error: "Arquivo com esse nome já existe" },
      { status: 409 },
    );
  }

  try {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 15000,
      headers: {
        Authorization: authHeader,
      },
    });
    console.log(
      `${process.env.NEXT_PUBLIC_API_URL}/${institutionId}/students/${studentId}/files`,
    );
    const { data: document } = await api.post(
      `/students/${institutionId}/students/${studentId}/files`,
      {
        fileName: file.name,
        fileUrl: blob.url,
      },
    );

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.log("API call to save document failed:", error);
    await del(blob.pathname);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 502;
      const message = error.response?.data?.error ?? "Erro ao salvar documento";

      return NextResponse.json({ error: message }, { status });
    }

    console.error("Backend call failed:", error);

    return NextResponse.json(
      { error: "Erro inesperado ao enviar arquivo" },
      { status: 500 },
    );
  }
}
