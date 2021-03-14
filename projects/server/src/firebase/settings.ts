import { Subject } from 'rxjs';
import { firestore } from './firestore';

export interface Settings {
  created: Date;
  host: string;
  isProd: boolean;
  port: number;
  static: string;
}

const settingsCollection = firestore.collection('settings');
const settings = new Subject<Settings>();

settingsCollection
  .orderBy('created', 'desc')
  .limit(1)
  .onSnapshot(
    (changes) => {
      const data = changes.docs[0]?.data();
      data && settings.next(data as Settings);
    },
    (err) => console.log(err)
  );

export default settings;
