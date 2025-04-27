<template>
  <div class="main-wrapper">
    <TheHeader />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.main-wrapper {
  font-family: var(--ff-body);
  font-size: var(--fs-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  color: var(--text-color);
}

main {
  flex: 1;
}
</style>
