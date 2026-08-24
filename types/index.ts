// ═══════════════════════════════════════════════════════════
//  GENIE STUDIO — Database Types
// ═══════════════════════════════════════════════════════════

export interface Stat {
  id: number;
  value: number;
  label: string;
  sort_order: number;
}

export interface Service {
  id: number;
  number: string;
  name: string;
  description: string;
  tags: string[];
  sort_order: number;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  cover_url: string | null;
  gradient: string | null;
  external_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo_url: string;
  bio: string;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  client_name: string;
  client_title: string;
  sort_order: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface PageData {
  stats: Stat[];
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  testimonials: Testimonial[];
}
