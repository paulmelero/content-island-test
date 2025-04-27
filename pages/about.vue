<template>
  <div class="about">
    <div class="about__header" v-if="page">
      <img
        :src="page.picture.link"
        :alt="page.picture.name"
        class="about__image"
      />
      <div class="about__intro">
        <h1>I'm {{ page.fullname }}</h1>
        <p>{{ page.shortBio }}</p>
      </div>
    </div>

    <div v-if="page" v-html="page.extendedBio" class="about__bio" />
  </div>
</template>

<script setup lang="ts">
import type { About } from '@/types';
import { transpileMarkdown } from '~/core/markdown';

const { data: page } = await useAsyncData<About>('about', async () => {
  const page = await $fetch<About>(
    '/api/content/About/6803929dce4621f0d82cb265'
  );

  const extendedBio = await transpileMarkdown(page.extendedBio);

  return {
    ...page,
    extendedBio,
  };
});
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.about__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  align-items: flex-end;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
}

.about__intro {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  @media screen and (min-width: 768px) {
    padding-bottom: var(--space-md);
  }

  h1 {
    font-size: var(--fs-4xl);
    font-family: var(--ff-title);
    width: 10ch;
    line-height: 1.1;
  }
  p {
    max-width: 30ch;
    font-size: var(--fs-md);
  }
}

.about__image {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius);
  @media screen and (min-width: 768px) {
    width: 50%;
    aspect-ratio: 10/16;
  }
  @media screen and (min-width: 1024px) {
    width: 30%;
  }
}

:deep(.about__bio) {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);

  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 21/9;
    border-radius: var(--border-radius);
  }
}
</style>
