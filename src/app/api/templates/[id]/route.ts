import prisma from "@/lib/db";

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
