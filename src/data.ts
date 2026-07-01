import { Testimonial, Project, FAQItem, ModuleItem } from "./types";

// Import images for Vite build
import temoi1 from "./assets/images/temoi.avif";
import temoi2 from "./assets/images/temoi2.avif";
import media1 from "./assets/images/media1.avif";
import media2 from "./assets/images/media2.avif";
import media3 from "./assets/images/media3.webp";
import media4 from "./assets/images/media4.png";

export const learnCards = [
  {
    id: "learn-1",
    title: "Structure de conversion",
    description: "Comment structurer un site qui convertit.",
    iconName: "Layout",
  },
  {
    id: "learn-2",
    title: "Erreurs à éviter",
    description: "Les erreurs qui font fuir les clients.",
    iconName: "AlertTriangle",
  },
  {
    id: "learn-3",
    title: "Inspirer la confiance",
    description: "Les éléments qui inspirent confiance.",
    iconName: "Target",
  },
  {
    id: "learn-4",
    title: "Outils de contact",
    description: "Comment utiliser WhatsApp et les formulaires.",
    iconName: "MessageCircle",
  },
  {
    id: "learn-5",
    title: "Bases du SEO",
    description: "Les bases du SEO.",
    iconName: "Rocket",
  },
  {
    id: "learn-6",
    title: "Acquisition prospects",
    description: "Comment transformer un visiteur en prospect.",
    iconName: "Wrench",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Client 1",
    role: "Entrepreneur",
    avatarUrl: temoi1,
    rating: 5,
    message: "Franchement, le site a changé notre image. On reçoit beaucoup plus de demandes depuis sa mise en ligne. Merci !",
    time: "14:30",
    reply: "Merci à vous pour la confiance 🙏",
    replyTime: "14:32",
  },
  {
    id: "t-2",
    name: "Client 2",
    role: "Boutique en ligne",
    avatarUrl: temoi2,
    rating: 5,
    message: "Travail professionnel, à l'écoute et respect des délais. Je suis très satisfait du résultat !",
    time: "10:15",
    reply: "Heureux d'avoir pu vous aider 😊",
    replyTime: "10:16",
  },
  {
    id: "t-3",
    name: "Sarah Dupont",
    role: "Coach Fitness",
    avatarUrl: temoi1,
    rating: 5,
    message: "Mon site a doublé mes inscriptions en 3 mois. L'équipe a vraiment compris ma vision et l'a concrétisée parfaitement.",
    time: "09:45",
    reply: "Félicitations pour vos résultats ! 🎉",
    replyTime: "09:47",
  },
  {
    id: "t-4",
    name: "Marc Leblanc",
    role: "Consultant SEO",
    avatarUrl: temoi2,
    rating: 5,
    message: "Un site ultra-performant et optimisé pour le SEO. Les résultats sont là : +150% de trafic organique en 2 mois !",
    time: "15:20",
    reply: "C'est exactement ce qu'on vise ! Merci 🚀",
    replyTime: "15:22",
  },
  {
    id: "t-5",
    name: "Émilie Rousseau",
    role: "Freelance Designer",
    avatarUrl: temoi1,
    rating: 5,
    message: "Enfin un site qui reflète vraiment mon professionnalisme. J'ai reçu 5 fois plus de demandes de devis depuis !",
    time: "12:15",
    reply: "Votre succès est notre succès ! 💪",
    replyTime: "12:17",
  },
  {
    id: "t-6",
    name: "David Martin",
    role: "Agence Immobilière",
    avatarUrl: temoi2,
    rating: 5,
    message: "Site magnifique, rapide et intuitif. Nos clients adorent la navigation et nous avons fermé 20% plus de ventes.",
    time: "17:30",
    reply: "Merci pour cette belle collaboration ! 🏆",
    replyTime: "17:32",
  },
  {
    id: "t-7",
    name: "Nathalie Petit",
    role: "Restauratrice",
    avatarUrl: temoi1,
    rating: 5,
    message: "Mon restaurant est devenu une référence locale grâce au site. Les réservations ont explosé, c'est incroyable !",
    time: "13:00",
    reply: "Bon appétit à vos clients ! 🍽️",
    replyTime: "13:02",
  },
  {
    id: "t-8",
    name: "Thomas Lefevre",
    role: "E-commerce",
    avatarUrl: temoi2,
    rating: 5,
    message: "Conversion rate optimisée, design époustouflant et support réactif. Tout ce qu'il faut pour réussir en ligne !",
    time: "11:45",
    reply: "À vos succès commerciaux ! 📈",
    replyTime: "11:47",
  },
];

export const projects: Project[] = [
  {
    id: "p-1",
    title: "Projet 1",
    category: "Site vitrine",
    imageSrc: media1,
    techs: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "p-2",
    title: "Projet 2",
    category: "E-commerce",
    imageSrc: media2,
    techs: ["NextJS", "Tailwind CSS", "Stripe"],
  },
  {
    id: "p-3",
    title: "Projet 3",
    category: "Site vitrine",
    imageSrc: media3,
    techs: ["React", "Tailwind CSS", "Figma"],
  },
  {
    id: "p-4",
    title: "Projet 4",
    category: "Site vitrine",
    imageSrc: media4,
    techs: ["React", "Tailwind CSS", "Framer Motion"],
  },
];

export const modules: ModuleItem[] = [
  {
    id: "m-1",
    number: "01",
    title: "Cadrer les besoins de vos clients",
    description: "Apprenez à poser les bonnes questions pour identifier les objectifs business du client, définir les fonctionnalités clés et structurer votre cahier des charges de manière professionnelle.",
  },
  {
    id: "m-2",
    number: "02",
    title: "Conception de structures à haute conversion",
    description: "Découvrez l'UX/UI Design axé sur le résultat : l'agencement des sections, la rédaction des accroches (copywriting), et le placement stratégique des appels à l'action.",
  },
  {
    id: "m-3",
    number: "03",
    title: "Développement moderne et optimisé",
    description: "Quelles technologies choisir en 2026 ? Je vous montre comment coder des interfaces ultra-rapides, adaptées aux mobiles, respectant les meilleures pratiques de développement.",
  },
  {
    id: "m-4",
    number: "04",
    title: "Intégration d'outils interactifs (WhatsApp & CRM)",
    description: "Comment relier votre site à WhatsApp, ajouter des formulaires intelligents et connecter des outils d'automatisation pour traiter vos prospects instantanément.",
  },
  {
    id: "m-5",
    number: "05",
    title: "Stratégie de lancement et référencement (SEO)",
    description: "Le guide pour indexer votre site sur Google, optimiser la vitesse de chargement et mettre en place le référencement naturel pour attirer du trafic organique qualifié.",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "À qui s'adresse cette masterclass ?",
    answer: "Aux entrepreneurs, porteurs de projet, développeurs juniors, freelances, ou toute personne souhaitant créer des sites internet professionnels qui convertissent réellement leurs visiteurs en clients.",
  },
  {
    id: "faq-2",
    question: "Combien de temps dure la masterclass ?",
    answer: "La session durera environ 2 heures, comprenant une présentation concrète de 1h30 et une session de questions-réponses en direct de 30 minutes.",
  },
  {
    id: "faq-3",
    question: "La masterclass est-elle vraiment gratuite ?",
    answer: "Oui, elle est 100% gratuite et accessible en direct sur YouTube Live pour tout le monde.",
  },
  {
    id: "faq-4",
    question: "Y aura-t-il un replay disponible ?",
    answer: "Oui, le live restera disponible sur YouTube. Cependant, assister au direct vous permet de poser vos questions et d'interagir en temps réel.",
  },
  {
    id: "faq-5",
    question: "Quels outils allons-nous aborder ?",
    answer: "Nous parlerons de Figma pour le design, de React, Tailwind et Motion pour le développement moderne, et d'intégrations interactives comme WhatsApp et les formulaires intelligents.",
  },
  {
    id: "faq-6",
    question: "Comment accéder au live ?",
    answer: "Le live se déroulera directement sur YouTube. Vous pouvez accéder au lien via le bouton 'Accéder au Live' sur ce site. Laissez votre email en bas de page pour recevoir un rappel.",
  },
];
