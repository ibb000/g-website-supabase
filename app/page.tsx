import CustomCursor from '@/components/CustomCursor';
import ScrollObserver from '@/components/ScrollObserver';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import StatsBand from '@/components/StatsBand';
import ServicesGrid from '@/components/ServicesGrid';
import AboutSection from '@/components/AboutSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import TeamSection from '@/components/TeamSection';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { createPublicClient } from '@/lib/supabase/server';
import type { Stat, Service, Project, TeamMember, Testimonial } from '@/types';

const FALLBACK = {
  stats: [
    { id: 1, value: 50, label: 'Projects Delivered', sort_order: 1 },
    { id: 2, value: 20, label: 'Brands Shaped', sort_order: 2 },
    { id: 3, value: 3, label: 'Years of Excellence', sort_order: 3 },
    { id: 4, value: 6, label: 'Service Verticals', sort_order: 4 },
  ],
  services: [
    {
      id: 1,
      number: '01',
      name: 'Brand Identity & Strategy',
      description:
        'Full visual identity systems — logo, guidelines, brand voice, and everything in between.',
      tags: ['Logo', 'Guidelines', 'Brand Voice'],
      sort_order: 1,
    },
    {
      id: 2,
      number: '02',
      name: 'Web Design & Development',
      description:
        'Pixel-perfect websites, landing pages, and full-stack web applications built to perform.',
      tags: ['UI/UX', 'Landing Pages', 'Full-Stack'],
      sort_order: 2,
    },
    {
      id: 3,
      number: '03',
      name: '3D Design & Visualization',
      description:
        'Product renders, architectural visualizations, motion & 3D animation that stop the scroll.',
      tags: ['3D Renders', 'Motion', 'Architecture'],
      sort_order: 3,
    },
    {
      id: 4,
      number: '04',
      name: 'AI Automation',
      description:
        'Smart workflows and AI-powered tools that save time and unlock new creative possibilities.',
      tags: ['Workflows', 'AI Tools', 'Automation'],
      sort_order: 4,
    },
    {
      id: 5,
      number: '05',
      name: 'Marketing & Social Media',
      description:
        'Campaigns, content systems, and scroll-stopping visuals for every platform and audience.',
      tags: ['Campaigns', 'Content', 'Social'],
      sort_order: 5,
    },
    {
      id: 6,
      number: '06',
      name: 'Event Planning & Identity',
      description:
        'Full event branding, production support, and on-site visual direction from concept to curtain.',
      tags: ['Branding', 'Production', 'Direction'],
      sort_order: 6,
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Project Alpha',
      category: 'Brand Identity',
      cover_url: null,
      gradient: 'linear-gradient(135deg,#00ABED,#004362)',
      external_url: 'https://example.com',
      is_active: true,
      sort_order: 1,
    },
    {
      id: 2,
      title: 'Project Beta',
      category: 'Web Design',
      cover_url: null,
      gradient: 'linear-gradient(135deg,#004362,#002D43)',
      external_url: 'https://example.com',
      is_active: true,
      sort_order: 2,
    },
    {
      id: 3,
      title: 'Project Gamma',
      category: '3D & Motion',
      cover_url: null,
      gradient: 'linear-gradient(135deg,#009AD4,#1F1F1F)',
      external_url: 'https://example.com',
      is_active: true,
      sort_order: 3,
    },
    {
      id: 4,
      title: 'Project Delta',
      category: 'AI Automation',
      cover_url: null,
      gradient: 'linear-gradient(135deg,#002D43,#00ABED)',
      external_url: 'https://example.com',
      is_active: true,
      sort_order: 4,
    },
    {
      id: 5,
      title: 'Project Epsilon',
      category: 'Marketing',
      cover_url: null,
      gradient: 'linear-gradient(135deg,#1F1F1F,#004362)',
      external_url: 'https://example.com',
      is_active: true,
      sort_order: 5,
    },
    {
      id: 6,
      title: 'Project Zeta',
      category: 'Event Identity',
      cover_url: null,
      gradient: 'linear-gradient(135deg,#004362,#009AD4)',
      external_url: 'https://example.com',
      is_active: true,
      sort_order: 6,
    },
  ],
  team: [
    {
      id: 1,
      name: 'Name Here',
      role: 'Creative Director',
      photo_url: 'https://placehold.co/320x320/1a1a1a/00ABED?text=CD',
      bio: 'Brief bio about this team member and what they bring to the studio.',
      sort_order: 1,
    },
    {
      id: 2,
      name: 'Name Here',
      role: 'Lead Designer',
      photo_url: 'https://placehold.co/320x320/1a1a1a/00ABED?text=LD',
      bio: 'Brief bio about this team member and what they bring to the studio.',
      sort_order: 2,
    },
    {
      id: 3,
      name: 'Name Here',
      role: 'Tech Director',
      photo_url: 'https://placehold.co/320x320/1a1a1a/00ABED?text=TD',
      bio: 'Brief bio about this team member and what they bring to the studio.',
      sort_order: 3,
    },
  ],
  testimonials: [
    {
      id: 1,
      quote:
        'Genie Studio transformed our brand completely. The results exceeded every expectation.',
      client_name: 'Client Name',
      client_title: 'CEO, Company Name',
      sort_order: 1,
    },
    {
      id: 2,
      quote:
        'Working with this team was a pleasure from day one. Truly world-class creative work.',
      client_name: 'Client Name',
      client_title: 'Founder, Company Name',
      sort_order: 2,
    },
    {
      id: 3,
      quote:
        'The attention to detail and strategic thinking set them apart from anyone else we have worked with.',
      client_name: 'Client Name',
      client_title: 'Marketing Director, Company Name',
      sort_order: 3,
    },
  ],
};

async function getPageData() {
  try {
    const supabase = createPublicClient();

    const [statsRes, servicesRes, projectsRes, teamRes, testimonialsRes] =
      await Promise.all([
        supabase.from('stats').select('*').order('sort_order', { ascending: true }),
        supabase.from('services').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('projects')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true }),
        supabase.from('team').select('*').order('sort_order', { ascending: true }),
        supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
      ]);

    const stats = statsRes.data && statsRes.data.length > 0 ? (statsRes.data as Stat[]) : FALLBACK.stats;
    const services = servicesRes.data && servicesRes.data.length > 0 ? (servicesRes.data as Service[]) : FALLBACK.services;
    const projects = projectsRes.data && projectsRes.data.length > 0 ? (projectsRes.data as Project[]) : FALLBACK.projects;
    const team = teamRes.data && teamRes.data.length > 0 ? (teamRes.data as TeamMember[]) : FALLBACK.team;
    const testimonials = testimonialsRes.data && testimonialsRes.data.length > 0 ? (testimonialsRes.data as Testimonial[]) : FALLBACK.testimonials;

    return { stats, services, projects, team, testimonials };
  } catch (error) {
    console.warn('[Genie] Supabase fetch failed in SSR, using fallbacks:', error);
    return FALLBACK;
  }
}

export default async function HomePage() {
  const { stats, services, projects, team, testimonials } = await getPageData();

  return (
    <main>
      <CustomCursor />
      <ScrollObserver />
      <Nav />
      <Hero />
      <StatsBand stats={stats} />
      <ServicesGrid services={services} />
      <AboutSection />
      <ProjectsGrid projects={projects} />
      <TeamSection team={team} />
      <Testimonials testimonials={testimonials} />
      <ContactForm />
      <Footer />
    </main>
  );
}
