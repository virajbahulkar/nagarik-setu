import { runSeed } from './sql-runner';

runSeed()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seed applied successfully');
  })
  .catch((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Seed failed', error);
    process.exitCode = 1;
  });
