import prisma from "@/lib/db";

// GET Handler: Fetch template by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const template = await prisma.template.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: true,
      },
    });

    if (!template) {
      return new Response(JSON.stringify({ error: "Template not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(template), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch template" }), {
      status: 500,
    });
  }
}

// DELETE Handler: Delete template by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.template.delete({
      where: {
        id: params.id,
      },
    });
    return new Response("Template deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete template" }),
      { status: 500 }
    );
  }
}
