import * as serviceAccount from '@secrets/service-account.json';
import { credential, initializeApp, ServiceAccount } from 'firebase-admin';

export const app = initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
});
