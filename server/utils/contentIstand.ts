import { createClient } from '@content-island/api-client';

export const getContentIstandClient = () => {
  const config = useRuntimeConfig();
  const accessToken = config.contentIslandSecretToken;

  const client = createClient({
    accessToken,
  });

  return client;
};
