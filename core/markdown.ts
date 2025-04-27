import { fromAsyncCodeToHtml } from '@shikijs/markdown-it/async';
import { codeToHtml } from 'shiki';
import MarkdownItAsync from 'markdown-it-async';

export const transpileMarkdown = async (markdown: string) => {
  const md = MarkdownItAsync();

  md.use(
    fromAsyncCodeToHtml(
      // Pass the codeToHtml function
      codeToHtml,
      {
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
      }
    )
  );

  const content = await md.renderAsync(markdown);

  return content;
};
