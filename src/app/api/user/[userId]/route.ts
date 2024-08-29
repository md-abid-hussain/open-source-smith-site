import prisma from "@/lib/db";

// GET Handler: Fetch user by ID
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      include: {
        template: true,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return Response.json(user);
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 });
  }
}
