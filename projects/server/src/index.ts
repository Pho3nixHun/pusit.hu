import { main } from '@app/server';
import { Subject } from 'rxjs';

(async () => {
  const destroyed$: Subject<void> = await main();
  const exitHandler = () => {
    destroyed$.next();
    destroyed$.complete();
  };
  process.once('exit', exitHandler);
  process.once('SIGINT', exitHandler);
  process.once('SIGUSR1', exitHandler);
  process.once('SIGUSR2', exitHandler);
})();
