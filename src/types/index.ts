// Blog Post Types
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  content: string;
  readingTime: number;
}

// Project Types
export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// Resume Types
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface SocialLink {
  name: string;
  url: string;
  className?: string;
}

export interface MainInfo {
  name: string;
  occupation: string;
  description: string;
  image: string;
  bio: string;
  contactMessage: string;
  email: string;
  phone: string;
  address: Address;
  website: string;
  resumeDownload: string;
  social: SocialLink[];
}

export interface Education {
  school: string;
  degree: string;
  graduated: string;
  description: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  years: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Resume {
  skillMessage: string;
  education: Education[];
  work: WorkExperience[];
  skills: Skill[];
}

export interface ResumeData {
  main: MainInfo;
  resume: Resume;
}

// List Item Types
export interface ReadingListItem {
  title: string;
  author: string;
  url?: string;
  description?: string;
  category: 'book' | 'article' | 'paper' | 'podcast';
  dateAdded: string;
  completed: boolean;
}

export interface Tool {
  name: string;
  description: string;
  url?: string;
  category: 'development' | 'design' | 'productivity' | 'other';
  favorite: boolean;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}
