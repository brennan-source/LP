import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const stage = url.searchParams.get("stage") ?? "";
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "50", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { businessName: { contains: search } },
        { city: { contains: search } },
        { industry: { contains: search } },
      ];
    }

    if (stage) {
      where.stage = stage;
    }

    const hasWebsite = url.searchParams.get("hasWebsite");
    if (hasWebsite === "false") where.hasWebsite = false;

    const weakWebsite = url.searchParams.get("weakWebsite");
    if (weakWebsite === "true") where.weakWebsite = true;

    const previewVisited = url.searchParams.get("previewVisited");
    if (previewVisited === "true") where.stage = "preview_visited";

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        include: {
          products: true,
          notes: { orderBy: { createdAt: "desc" } },
          activities: { orderBy: { createdAt: "desc" } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contact.count({ where }),
    ]);

    return Response.json({ contacts, total, page, limit });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        email: body.email,
        firstName: body.firstName ?? null,
        lastName: body.lastName ?? null,
        phone: body.phone ?? null,
        businessName: body.businessName ?? null,
        industry: body.industry ?? null,
        city: body.city ?? null,
        state: body.state ?? null,
        website: body.website ?? null,
        stage: body.stage ?? "prospect",
        source: body.source ?? "manual",
        tags: body.tags ?? null,
      },
      include: {
        products: true,
        notes: true,
        activities: true,
      },
    });

    return Response.json({ contact }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("Unique constraint")) {
      return Response.json({ error: "A contact with this email already exists" }, { status: 409 });
    }
    return Response.json({ error: message }, { status: 500 });
  }
}
