<template>
  <div class="gm-root">
    <header class="gm-header">
      <h1 class="gm-title">Games</h1>
    </header>

    <section class="gm-grid">
      <article v-for="game in games" :key="game.name" class="gm-card">
        <h2 class="gm-card__title">{{ game.title }}</h2>
        <p class="gm-card__desc">{{ game.desc }}</p>
        <RouterLink class="gm-card__start" :to="{ name: game.name }">开始游戏</RouterLink>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 游戏清单。
 *
 * name 要和对应游戏的路由 name 一致，新增游戏时在这里补一条即可。
 */
const games = [
  {
    name: 'Tetris',
    title: '俄罗斯方块',
    desc: '',
  },
]
</script>

<style scoped>
.gm-root {
  min-height: 100vh;
  padding: 40px 24px;
  color: #e8e8ee;
}

.gm-header {
  max-width: 960px;
  margin: 0 auto 28px;
}

.gm-title {
  margin: 0;
  font-size: 32px;
  line-height: 1.15;
}

.gm-hint {
  margin: 8px 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.gm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 960px;
  margin: 0 auto;
}

.gm-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  transition: border-color 0.2s, transform 0.2s;
}

.gm-card:hover {
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-2px);
}

.gm-card__title {
  margin: 0 0 10px;
  font-size: 20px;
  line-height: 1.2;
}

.gm-card__desc {
  flex: 1;
  margin: 0 0 18px;
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
}

.gm-card__start {
  align-self: flex-start;
  padding: 8px 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 13px;
  color: #e8e8ee;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.gm-card__start:hover {
  border-color: transparent;
  background: #22d3ee;
  color: #0b1013;
}
</style>
