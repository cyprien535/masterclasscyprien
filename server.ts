import * as dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

// Initialize Database with some realistic mock data if empty
async function seedDatabase() {
  try {
    const count = await prisma.registration.count();
    if (count === 0) {
      const initialData = [
        {
          firstName: "Idriss",
          lastName: "Koffi",
          email: "idriss.koffi@gmail.com",
          whatsApp: "+229 95 45 67 89",
          createdAt: new Date(Date.now() - 3600000 * 2),
        },
        {
          firstName: "Fatoumata",
          lastName: "Bamba",
          email: "fatou.bamba@outlook.com",
          whatsApp: "+229 97 08 23 45",
          createdAt: new Date(Date.now() - 3600000 * 5),
        },
        {
          firstName: "Marc-Antoine",
          lastName: "Kouadio",
          email: "marc.kouadio@yahoo.fr",
          whatsApp: "+229 91 02 03 04",
          createdAt: new Date(Date.now() - 3600000 * 24),
        },
      ];
      for (const data of initialData) {
        await prisma.registration.create({ data });
      }
      console.log("Database seeded with initial registrations.");
    }
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seedDatabase();

// Register endpoint
app.post("/api/register", async (req, res) => {
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
      return res.status(503).json({ error: "Erreur de connexion à la base de données. Veuillez réessayer." });
    }
    
    return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'inscription.", details: error.message });
  }
});

// Admin verification & load registrations
app.get("/api/registrations", async (req, res) => {
  const { pin } = req.query;

  if (pin !== "5353533") {
    return res.status(401).json({ error: "Code PIN incorrect ou non fourni." });
  }

  try {
    const regs = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.json(regs);
  } catch (error) {
    console.error("Error retrieving registrations with Prisma:", error);
    return res.status(500).json({ error: "Erreur lors du chargement des données." });
  }
});

// Setup Vite Dev Server / Static Assets
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from:", distPath);
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
