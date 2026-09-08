import type { ComponentType, SVGProps } from 'react';

export type CommandGroupId = 'navigation' | 'actions';

export type CommandAction =
  | { type: 'scroll'; target: string }
  | { type: 'download'; href: string; fileName: string }
  | { type: 'external'; href: string }
  | { type: 'mailto'; email: string }
  | { type: 'theme-toggle' };

export interface CommandDefinition {
  id: string;
  title: string;
  description: string;
  group: CommandGroupId;
  keywords?: string[];
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  action: CommandAction;
}

export const commandGroupLabels: Record<CommandGroupId, string> = {
  navigation: 'Navigation',
  actions: 'Actions',
};

export interface ResolvedCommand extends CommandDefinition {
  disabled: boolean;
}
