import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authConfig);
        if (session == null) {
            return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
        }
        const email = session.user?.email

        if (email) {

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                include: {
                    template: true,
                },
            });

            return Response.json({ ...user }, { status: 200 });

        } else {
            return Response.json({ error: "No email found in session" }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}