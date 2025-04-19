<template>
  <div
    class="container background"
    :style="`--postImage: url(${post?.image.link})`"
  >
    <article class="article" v-if="post">
      <header class="article__header">
        <p>
          <time datetime="2025-03-05">{{ postDate }}</time>
        </p>
        <h1 class="article__title">{{ post.title }}</h1>
      </header>
      <MDC :value="post.content" class="article__content" />
      <footer>
        <p>
          Written by <strong>{{ post.author }}</strong>
        </p>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/core/formatDate';
import type { Post } from '~/types';

const route = useRoute();

const id = route.params.id as string;

const nuxtApp = useNuxtApp();
const { data: post } = await useAsyncData<Post>(
  id,
  () => $fetch<Post>(`/api/content/post/${id}`),
  // optimization
  {
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

const postDate = computed(() => {
  if (!post.value || !post.value.date) {
    return '';
  }
  return formatDate(post.value.date);
});
</script>

<style scoped>
.background::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 360px;
  background-image: var(--postImage);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}

.article {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--space-2xl);
  padding: var(--space-lg);
  background-color: var(--pure-white);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.article__header {
  text-align: center;
}
.article__title {
  font-size: var(--fs-3xl);
  font-family: var(--ff-title);
}

:deep(.article__content) {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  h2 {
    margin-top: var(--space-sm);
  }
  ul {
    padding-left: var(--space-md);
  }
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 21/9;
    border-radius: var(--border-radius);
  }

  pre {
    max-width: 100%;
    overflow: auto;
  }

  code {
    font-size: var(--fs-xs);
    border-radius: var(--border-radius);
    padding: var(--space-xs);
  }
}
</style>
