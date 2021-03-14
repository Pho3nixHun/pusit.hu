import { Server } from 'http';
import { createHttpTerminator, HttpTerminator } from 'http-terminator';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import { BehaviorSubject, combineLatest, NEVER, of, Subject } from 'rxjs';
import { skip, switchMap, takeUntil, tap } from 'rxjs/operators';
import settings$ from './firebase/settings';
import routes from './routes';

export const main = async (): Promise<Subject<void>> => {
  const destroyed$ = new Subject<void>();
  const restart$ = new Subject<void>();
  const server$ = new BehaviorSubject<[HttpTerminator, Server]>([undefined, undefined]);
  const terminable$ = server$.pipe(switchMap(([terminator, server]) => (server?.listening ? of(terminator) : NEVER)));

  // Initiate a restart if settings change
  combineLatest([terminable$, settings$.pipe(skip(1))])
    .pipe(
      tap(async ([terminator]) => {
        const result = await terminator.terminate().catch((err) => err);
        if (result instanceof Error) {
          destroyed$.next();
          destroyed$.complete();
          return;
        }
        restart$.next();
      }),
      takeUntil(destroyed$)
    )
    .subscribe();

  // Restart if needed
  combineLatest([settings$, restart$])
    .pipe(
      tap(([settings]) => {
        const { static: staticPath, host, port } = settings;
        const app = new Koa();
        const defaultRouter = new Router();
        defaultRouter.get('/version', (ctx) => (ctx.body = '0.1'));
        const staticRoute = Static(staticPath);
        app.use(defaultRouter.routes());
        app.use(routes.routes());
        app.use(staticRoute);
        const server = app.listen(port, host, () => {
          console.debug(`Listening on port ${host}:${port}`);
        });
        destroyed$.pipe(takeUntil(restart$)).subscribe(() => {
          console.log('Exit');
        });
        server$.next([createHttpTerminator({ server }), server]);
      }),
      takeUntil(destroyed$)
    )
    .subscribe();

  restart$.next();
  return destroyed$;
};
