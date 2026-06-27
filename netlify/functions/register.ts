import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" }),
    };
  }

  // Parse request body
  let body;
  try {
    console.log("Event body:", event.body);
    body = JSON.parse(event.body || "{}");
    console.log("Parsed body:", body);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Corps de la requête invalide", details: String(e) }),
    };
  }

  const { firstName, lastName, email, whatsApp } = body;

  // Validate required fields
  if (!firstName || !lastName || !email || !whatsApp) {
    console.warn("Missing fields:", { firstName, lastName, email, whatsApp });
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: "Tous les champs sont requis.",
        received: { firstName, lastName, email, whatsApp }
      }),
    };
  }

  try {
    // Check if already registered
    const exists = await prisma.registration.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (exists) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Cette adresse email est déjà inscrite !" }),
      };
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

    return {
      statusCode: 201,
      body: JSON.stringify(newReg),
    };
  } catch (error: any) {
    console.error("Error registering user with Prisma:", error);

    // Handle Prisma unique constraint error
    if (error.code === "P2002") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Cette adresse email est déjà inscrite !" }),
      };
    }

    // Handle database connection errors
    if (error.code === "P1000" || error.code === "P1001") {
      return {
        statusCode: 503,
        body: JSON.stringify({
          error: "Erreur de connexion à la base de données. Veuillez réessayer.",
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors de l'enregistrement de l'inscription.",
        details: error.message,
      }),
    };
  }
};
