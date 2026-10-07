export type ServiceCategory = 'lashes' | 'brows' | 'training' | 'retail';

export type Currency = 'NGN' | 'USD';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  duration?: string;
  priceNgn: number;
  priceUsd: number;
  description: string;
  features: string[];
  recommendedFor?: string;
  isPopular?: boolean;
  aftercareNote?: string;
  refillRules?: string;
}

export interface RetailProduct {
  id: string;
  name: string;
  subtitle: string;
  size: string;
  priceNgn: number;
  priceUsd: number;
  description: string;
  benefits: string[];
  usage: string;
  image: string;
  inStock: boolean;
}

export interface StudioPolicy {
  id: number;
  title: string;
  shortDesc: string;
  fullDetails: string[];
  severity: 'vital' | 'standard';
}

export interface AcademyCourse {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  priceNgn: number;
  priceUsd: number;
  description: string;
  syllabus: string[];
  kitIncluded: string[];
  prerequisites: string;
  cohortCapacity: string;
}

export interface ClientReview {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  serviceType: string;
}
