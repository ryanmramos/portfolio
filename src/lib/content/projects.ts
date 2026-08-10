import type { Component } from 'svelte';
import type { Project, ProjectMetadata } from '$lib/types';
import LoquelaContent, { metadata as loquelaMetadata } from './projects/loquela.md';
import FtdContent, { metadata as ftdMetadata } from './projects/ftd.md';
import PerfinContent, { metadata as perfinMetadata } from './projects/perfin.md';

function attachContent(metadata: Record<string, unknown>, content: Component): Project {
  return {
    ...(metadata as ProjectMetadata),
    content
  };
}

export const projects: Project[] = [
  attachContent(loquelaMetadata, LoquelaContent),
  attachContent(ftdMetadata, FtdContent),
  attachContent(perfinMetadata, PerfinContent)
];

