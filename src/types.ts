export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsApp: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  message: string;
  time: string;
  reply: string;
  replyTime: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  link?: string;
  techs: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ModuleItem {
  id: string;
  number: string;
  title: string;
  description: string;
}
