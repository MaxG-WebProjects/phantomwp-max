export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  author: number;
  featured_media: number;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: 'post' | 'page';
  categories: number[];
  tags: number[];
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: string;
  link: string;
  meta?: {
    footnotes?: string;
  };
  class_list?: string[];
  _embedded?: {
    author?: WordPressAuthor[];
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: WordPressTerm[][];
  };
}

export interface WordPressAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<string, string>;
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: 'attachment';
  link: string;
  title: { rendered: string };
  author: number;
  description: { rendered: string };
  caption: { rendered: string };
  alt_text: string;
  media_type: 'image' | 'file';
  mime_type: string;
  media_details?: {
    width: number;
    height: number;
    file: string;
  };
  source_url: string;
  _links?: Record<string, any>;
}

export interface WordPressTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'category' | 'post_tag' | string;
  description: string;
  parent?: number;
  count: number;
}

export interface WordPressPage extends WordPressPost {
  type: 'page';
  parent?: number;
}
