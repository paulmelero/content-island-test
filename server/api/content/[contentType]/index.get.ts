import { mapContentToModel } from '@content-island/api-client';

export default defineEventHandler(async (event) => {
  const contentClient = getContentIstandClient();

  const { contentType } = getRouterParams(event);
  const content = await contentClient.getContentList({ contentType });

  const contentList = content.map((contentInfo) => {
    return mapContentToModel(contentInfo);
  });

  return contentList;
});
