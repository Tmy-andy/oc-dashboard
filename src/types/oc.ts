export interface OC {
  id: string;
  name: string;
  age: string;
  gender: string;
  description: string;
  avatar_url: string;
  banner_url?: string;
  status: 'active' | 'inactive' | 'draft';
  created_at: string;
  updated_at: string;
  metadata?: {
    source?: string;
    tags?: string[];
    category?: string;
  };
  features?: OCFeature[];
}

export interface OCFeature {
  id: string;
  oc_id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: 'active' | 'inactive';
  slug: string;
  target: '_self' | '_blank';
  vr_tour_link?: string;
  banner_images?: string[];
  posts?: OCPost[];
}

export interface OCPost {
  id: string;
  feature_id: string;
  locale: 'vi' | 'en' | 'ja' | 'kr' | 'fr';
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export type OCFormData = Omit<OC, 'id' | 'created_at' | 'updated_at'>;
export type OCFeatureFormData = Omit<OCFeature, 'id' | 'oc_id'>;
export type OCPostFormData = Omit<OCPost, 'id' | 'feature_id' | 'created_at' | 'updated_at'>;