// import { NextResponse } from "next/server";

// (BFF que llama a .NET)
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     console.log("Body recibido en API:", body);

//     const backendResponse = await fetch(
//       `${process.env.BACKEND_URL}/auth/login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       },
//     );

//     const data = await backendResponse.json();

//     console.log("data server next: ", data);

//     if (!backendResponse.ok) {
//       return NextResponse.json(
//         { message: data.message || "Credenciales inválidas" },
//         { status: backendResponse.status },
//       );
//     }

//     // ⚠️ Asumimos que .NET devuelve un JWT
//     const token = data.token;

//     const response = NextResponse.json({ success: true });

//     // 🔐 Cookie segura
//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       //   path: "/",
//       path: "/home",
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error interno del servidor" },
//       { status: 500 },
//     );
//   }
// }
