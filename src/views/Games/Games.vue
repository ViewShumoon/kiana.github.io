<template>
    <div class="container">
        <n-h1>
            Games
        </n-h1>

        <n-grid x-gap="12" cols="2 s:3 m:4 " responsive="screen">
            <n-gi>
                <n-card v-for="game in games" :key="game.name" :title="game.title" class="gm-card">
                   <p>{{ game.desc }}</p>
                    <RouterLink :to="{ name: game.name }">
                        <n-button strong secondary round type="primary">
                            开始游戏
                        </n-button>
                    </RouterLink>
                </n-card>
            </n-gi> 

        </n-grid>
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

<style scoped></style>
