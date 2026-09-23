import { runMigrations } from './sql-runner';

runMigrations()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Migrations applied successfully');
  })
  .catch((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Migration failed', error);
    process.exitCode = 1;
  });
