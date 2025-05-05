import { createClient, mapContentToModel } from '@content-island/api-client';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const accessToken = config.public.contentIslandToken;

  const contentIslandClient = createClient({
    accessToken,
  });

  const getById = async <T extends unknown>(
    id: string,
    contentType: string
  ) => {
    const contentInfo = await contentIslandClient.getContent(id, {
      contentType,
    });

    return mapContentToModel<T & Parameters<typeof mapContentToModel>[0]>(
      contentInfo
    );
  };

  const getList = async <T extends unknown>(contentType: string) => {
    const content = await contentIslandClient.getContentList({ contentType });

    const contentList = content.map((contentInfo) => {
      return mapContentToModel<T & Parameters<typeof mapContentToModel>[0]>(
        contentInfo
      );
    });

    return contentList;
  };

  return {
    provide: {
      contentIsland: {
        client: contentIslandClient,
        getById,
        getList,
      },
    },
  };
});
