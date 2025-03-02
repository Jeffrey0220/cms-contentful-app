//@ts-ignore
// export { enableDraftHandler as GET } from "@contentful/vercel-nextjs-toolkit/app-router";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies helper for setting _vercel_jwt

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret || secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  // Set the _vercel_jwt cookie to enable preview mode
  cookies().set("_vercel_jwt", "your-preview-token-here", {
    httpOnly: true,
    secure: true,
  });

  // Redirect to the preview page
  return NextResponse.redirect(new URL(`/posts/${slug}?preview=true`, req.url));
}
