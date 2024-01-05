import config from '@config/index';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: config.firebase.api_key,
  authDomain: config.firebase.auth_domain,
  projectId: config.firebase.project_id,
  storageBucket: config.firebase.storage_bucket,
  messagingSenderId: config.firebase.message_id,
  appId: config.firebase.app_id,
  measurementId: config.firebase.measurement_id,
};

export const app = initializeApp(firebaseConfig);
