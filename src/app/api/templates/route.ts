import prisma from "@/lib/db";
import { BadRequestResponse } from "@/lib/api-request-response";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET Handler: Fetch all templates
export async function GET(request: Request) {
  try {
    const templates = await prisma.template.findMany({
      include: {
        author: true,
      },
    });

    return new Response(JSON.stringify(templates), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch templates" }),
      { status: 500 }
    );
  }
}

// POST Handler: Create a new template
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (session == null) {
      return new BadRequestResponse({
        error: "Not authenticated",
        code: 401,
      });
    }

    const {
      name,
      description,
      tags,
      githubUrl,
      defaultBranch,
      templateType,
      templateSubType,
    } = await request.json();

    if (!name || name.trim() === "") {
      return new BadRequestResponse({ error: "Name is required", code: 400 });
    }

    if (!description) {
      return new BadRequestResponse({
        error: "Description is required",
        code: 400,
      });
    }

    if (!tags || !Array.isArray(tags)) {
      return new BadRequestResponse({ error: "Tags is required", code: 400 });
    }

    if (!githubUrl || githubUrl.trim() === "") {
      return new BadRequestResponse({
        error: "Github URL is required",
        code: 400,
      });
    }

    if (!templateSubType || templateSubType.trim() === "") {
      return new BadRequestResponse({
        error: "templateSubType is required",
        code: 400,
      });
    }

    const templateExist = await prisma.template.findFirst({
      where: {
        githubUrl,
      },
    });

    if (templateExist) {
      return new BadRequestResponse({
        error: "Template already exist",
        code: 409,
      });
    }

    const template = await prisma.template.create({
      data: {
        name,
        description,
        tags,
        githubUrl,
        defaultBranch: defaultBranch || "main",
        author: {
          connect: {
            email: session.user?.email ?? undefined,
          },
        },
        templateType: templateType,
        subtype: templateSubType,
      },
    });
    return Response.json(template);
  } catch (error) {
    console.error(error);
    return new BadRequestResponse({ error: JSON.stringify(error), code: 500 });
  }
}
