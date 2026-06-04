import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { fetchReviews } from "@/lib/outscraper";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!contact.businessName) return NextResponse.json({ error: "Contact has no business name" }, { status: 400 });

  const reviews = await fetchReviews({
    businessName: contact.businessName,
    city: contact.city ?? "",
    state: contact.state ?? "",
    limit: 10,
  });

  if (reviews.length === 0) {
    return NextResponse.json({ reviews: [], message: "No reviews found" });
  }

  // Replace existing reviews for this contact
  await prisma.review.deleteMany({ where: { contactId: id } });
  await prisma.review.createMany({
    data: reviews.map((r) => ({
      contactId: id,
      authorName: r.authorName,
      rating: r.rating,
      text: r.text,
      publishedAt: r.publishedAt,
    })),
  });

  await prisma.activity.create({
    data: {
      contactId: id,
      type: "reviews_fetched",
      description: `Fetched ${reviews.length} Google review${reviews.length !== 1 ? "s" : ""}`,
    },
  });

  return NextResponse.json({ reviews });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const reviews = await prisma.review.findMany({
    where: { contactId: id },
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json({ reviews });
}
