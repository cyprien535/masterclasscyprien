import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handler: Handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" }),
    };
  }

  // Get PIN from query parameters
  const pin = event.queryStringParameters?.pin;

  // Verify PIN
  if (pin !== "5353533") {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Code PIN incorrect ou non fourni." }),
    };
  }

  try {
    // Fetch all registrations ordered by creation date (newest first)
    const regs = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(regs),
    };
  } catch (error: any) {
    console.error("Error retrieving registrations with Prisma:", error);

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
        error: "Erreur lors du chargement des données.",
        details: error.message,
      }),
    };
  }
};
