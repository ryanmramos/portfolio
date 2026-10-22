import type { Component } from 'svelte';

export type ProjectMedia = {
  type: 'image' | 'video' | 'slides';
  src: string;
  darkSrc?: string;
  poster?: string;
  alt?: string;
  label?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMetadata = {
  slug: string;
  title: string;
  status: string;
  event?: string;
  timeframe: string;
  visibility: 'public' | 'private';
  previewLabel: string;
  summary: string;
  contribution: string;
  technologies: string[];
  media: ProjectMedia[];
  links: ProjectLink[];
};

export type Project = ProjectMetadata & {
  content: Component;
};
