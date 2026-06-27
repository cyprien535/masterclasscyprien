import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  // Get PIN from query parameters
  const pin = req.query.pin;

  // Verify PIN
  if (pin !== "5353533") {
    return res.status(401).json({ error: "Code PIN incorrect ou non fourni." });
  }

  try {
    // Fetch all registrations ordered by creation date (newest first)
    const regs = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(regs);
  } catch (error: any) {
    console.error("Error retrieving registrations with Prisma:", error);

    // Handle database connection errors
    if (error.code === "P1000" || error.code === "P1001") {
      return res.status(503).json({
        error: "Erreur de connexion à la base de données. Veuillez réessayer.",
      });
    }

    return res.status(500).json({
      error: "Erreur lors du chargement des données.",
      details: error.message,
    });
  }
}
