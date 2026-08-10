import type { Component } from 'svelte';

export type ProjectMedia = {
  type: 'image' | 'video' | 'slides';
  src: string;
  alt?: string;
  label?: string;
};

export type ProjectLink = {
  label: 'Repository' | 'Site link' | 'Live demo' | 'Slides' | 'Write-up';
  href: string;
};

export type ProjectMetadata = {
  slug: string;
  title: string;
  status: string;
  timeframe: string;
  visibility: 'public' | 'private';
  previewLabel: string;
  summary: string;
  technologies: string[];
  media: ProjectMedia[];
  links: ProjectLink[];
};

export type Project = ProjectMetadata & {
  content: Component;
};
