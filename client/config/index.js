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
  stream:{
    streamKey: env.STREAM_KEY,
  },
};

export default config;
