import development from '@config/development';
import production from '@config/production';
import test from '@config/test.env';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development, test }[nodeENV];

const config = {
  api: {
    host: env.API_HOST,
  },
  auth: {
    tokenPayload: env.TOKEN_PAYLOAD,
  },
  midtrans: {
    clientKey: env.MIDTRANS_CLIENT_KEY,
    serverKey: env.MIDTRANS_SERVER_KEY,
  },
  firebase: {
    api_key: env.FIREBASE_API_KEY,
    auth_domain: env.FIREBASE_AUTH_DOMAIN,
    project_id: env.FIREBASE_PROJECT_ID,
    storage_bucket: env.FIREBASE_STORAGE_BUCKET,
    message_id: env.FIREBASE_MESSAGE_ID,
    app_id: env.FIREBASE_APP_ID,
    measurement_id: env.FIREBASE_MEASUREMENT_ID,
  },
};

export default config;
