// app/api/repos/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(
      "https://api.github.com/user/repos?per_page=1000",
      {
        headers: {
          Authorization: `token ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();
    const filteredRepos = repos.map((repo: any) => {
      const { id, name, description, html_url, default_branch } = repo;
      return { id, name, description, githubUrl: html_url, default_branch };
    });
    return NextResponse.json(filteredRepos);
  } catch (error) {
    return NextResponse.json(
      { error: `Server Error\n${JSON.stringify(error)}` },
      { status: 500 }
    );
  }
}
