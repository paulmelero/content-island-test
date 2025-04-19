import { mapContentToModel } from '@content-island/api-client';

export default defineEventHandler(async (event) => {
  const contentClient = getContentIstandClient();

  const getContent = async <T extends unknown>(
    id: string,
    contentType: string
  ) => {
    const contentInfo = await contentClient.getContent(id, { contentType });

    return mapContentToModel<T & Parameters<typeof mapContentToModel>[0]>(
      contentInfo
    );
  };

  const { id, contentType } = getRouterParams(event);
  const content = await getContent(id as string, contentType as string);

  return content;
});
