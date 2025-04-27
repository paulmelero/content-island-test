import hljs from 'highlight.js';
import { marked } from 'marked';

export const transpileMarkdown = async (markdown: string) => {
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => {
    const validLang = hljs.getLanguage(lang || 'plaintext')
      ? lang || 'plaintext'
      : 'plaintext';
    const highlighted = hljs.highlight(text, { language: validLang }).value;
    return `<pre><code class="hljs ${validLang}">${highlighted}</code></pre>`;
  };

  marked.setOptions({ renderer });

  return marked(markdown);
};
