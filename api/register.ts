import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { firstName, lastName, email, whatsApp } = req.body;

  // Debug: Check environment variable presence
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ 
      error: "Configuration manquante", 
      details: "La variable DATABASE_URL n'est pas définie sur Vercel." 
    });
  }

  // Validate required fields
  if (!firstName || !lastName || !email || !whatsApp) {
    return res.status(400).json({ 
      error: "Tous les champs sont requis.",
      received: { firstName, lastName, email, whatsApp }
    });
  }

  try {
    // Check connection to DB
    await prisma.$connect();
    
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
    console.error("CRITICAL ERROR:", error);
    
    return res.status(500).json({
      error: "Erreur interne du serveur",
      message: error.message,
      code: error.code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}
