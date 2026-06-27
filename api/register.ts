import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { firstName, lastName, email, whatsApp } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !whatsApp) {
    console.warn("Missing fields:", { firstName, lastName, email, whatsApp });
    return res.status(400).json({ 
      error: "Tous les champs sont requis.",
      received: { firstName, lastName, email, whatsApp }
    });
  }

  try {
    // Check if already registered
    const exists = await prisma.registration.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (exists) {
      return res.status(400).json({ error: "Cette adresse email est déjà inscrite !" });
    }

    // Create new registration
    const newReg = await prisma.registration.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        whatsApp: whatsApp.trim(),
      },
    });

    return res.status(201).json(newReg);
  } catch (error: any) {
    console.error("Error registering user with Prisma:", error);

    // Handle Prisma unique constraint error
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Cette adresse email est déjà inscrite !" });
    }

    // Handle database connection errors
    if (error.code === "P1000" || error.code === "P1001") {
      return res.status(503).json({
        error: "Erreur de connexion à la base de données. Veuillez réessayer.",
      });
    }

    return res.status(500).json({
      error: "Erreur lors de l'enregistrement de l'inscription.",
      details: error.message,
    });
  }
}
