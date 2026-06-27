import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Debug: Log method
  console.log("Method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { firstName, lastName, email, whatsApp } = req.body;

  if (!firstName || !lastName || !email || !whatsApp) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
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
    console.error("Prisma Error:", error);
    return res.status(500).json({ 
      error: "Erreur lors de l'enregistrement", 
      details: error.message,
      code: error.code 
    });
  }
}
