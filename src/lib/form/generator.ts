import type { ComponentType } from 'svelte';

export type Element = {
  name: string,
  label: string,
  c: ComponentType,
  allowed?: (role: string) => boolean,
  opts?: {lines: number} | {query: string} | undefined
}

export type ElementGenerator = Generator<Element[], any, undefined>