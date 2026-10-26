import { copyAnnouncement, copyLabel, createCopy, type CopyState } from '@ejm/core';
import { Button } from '@ejm/ui/components/ui/button';
import { useHydrated } from '@ejm/ui/docs/hooks';
import { CommandLines, ContentGroup, VisuallyHidden } from '@ejm/ui/layout/SiteContent';
import { Text } from '@ejm/ui/layout/Text';
import { useState, useSyncExternalStore } from 'react';

/** A command to run, with a Copy button that appears once the page's script runs. Without script the text stays selectable. */
export function CopyLine({ label, command }: { label: string; command: string }) {
  const [copy] = useState(() =>
    createCopy({
      write: async text => {
        if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
        await navigator.clipboard.writeText(text);
      },
    }),
  );
  const state = useSyncExternalStore<CopyState>(copy.machine.subscribe, copy.machine.getState, () => 'idle');
  const ready = useHydrated();
  return (
    <ContentGroup>
      <Text as="p" variant="muted">{label}</Text>
      <CommandLines commands={[command]} />
      {ready && (
        <Button variant="link" type="button" onClick={() => void copy.copy(command)} aria-label={state === 'idle' ? `Copy the ${label} install line` : undefined}>
          {copyLabel(state)}
        </Button>
      )}
      <span role="status">
        <VisuallyHidden>{ready ? copyAnnouncement(state) : ''}</VisuallyHidden>
      </span>
    </ContentGroup>
  );
}
