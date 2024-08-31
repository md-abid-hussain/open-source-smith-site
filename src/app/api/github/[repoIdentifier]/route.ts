import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { repoIdentifier: string } }
) {
  if (!params.repoIdentifier.includes("@")) {
    return Response.json(
      { error: "Invalid repository identifier" },
      {
        status: 400,
      }
    );
  }

  const [user, repo] = params.repoIdentifier.split("@");
  const repoPath = `${user}/${repo}`;

  try {
    const template = await prisma.template.findFirst({
      where: {
        githubUrl: {
          contains: repoPath,
        },
      },
    });

    if (!template) {
      return Response.json(
        {
          error: "Template not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      { ...template },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch the template" },
      {
        status: 500,
      }
    );
  }
}
