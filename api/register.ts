import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from "@prisma/client";

// Singleton pattern for Prisma to avoid exhaustion of database connections
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Debug info
  console.log("Request Method:", req.method);
  
  // Basic health check for GET
  if (req.method === "GET") {
    return res.status(200).json({ 
      status: "API is active", 
      message: "Please use POST to register." 
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { firstName, lastName, email, whatsApp } = req.body;

  // Only firstName and email are strictly required now
  if (!firstName || !email) {
    return res.status(400).json({ 
      error: "Le prénom et l'email sont requis.",
      received: { firstName, email }
    });
  }

  try {
    // 1. Test connection
    await prisma.$connect();
    
    // 2. Check if already registered
    const exists = await prisma.registration.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (exists) {
      return res.status(400).json({ error: "Cette adresse email est déjà inscrite !" });
    }

    // 3. Create new registration
    const newReg = await prisma.registration.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName ? lastName.trim() : "Contact",
        email: email.trim().toLowerCase(),
        whatsApp: whatsApp ? whatsApp.trim() : "N/A",
      },
    });

    return res.status(201).json(newReg);
  } catch (error: any) {
    console.error("DATABASE_ERROR:", error);
    
    // Detailed error for debugging (will be visible in Vercel logs and Response)
    return res.status(500).json({
      error: "Erreur lors de l'enregistrement",
      details: error.message,
      code: error.code,
      meta: error.meta
    });
  } finally {
    // Optional: disconnect if needed, but in serverless it's often better to let it be
    // await prisma.$disconnect();
  }
}
