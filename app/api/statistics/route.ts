import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany({
    select: {
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!issues || issues.length === 0) {
    return NextResponse.json({ error: "No issues found" }, { status: 400 });
  }

  return NextResponse.json(issues, { status: 200 });
}
