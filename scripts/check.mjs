import { execFileSync } from 'node:child_process';

// Trusted CI supplies the pinned owner beside Studio. Install this site's lock.
execFileSync('npm', ['--prefix', 'site', 'ci', '--ignore-scripts'], { stdio: 'inherit' });
execFileSync('npm', ['--prefix', 'site', 'run', 'typecheck'], { stdio: 'inherit' });
