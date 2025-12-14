<template>
  <BaseDrag class="position-absolute image-container">
    <img ref="catImg" :src="nyanCat" class="cat-image" />

    <canvas ref="rainbowCanvas" class="rainbow-tails" :width="canvasWidth" :height="canvasHeight"></canvas>

  </BaseDrag>

  <Background></Background>

</template>

<script setup lang="ts">
import nyanCat from '@assets/original.gif'

const raimbowConfig = {
  colors: ['#ff0000', '#ff9900', '#ffff00', '#33ff00', '#0099ff', '#6633ff'],
  stripeHeight: 1.25, // rem
  stripeWidth: 3.75, // rem
  stripeCount: 50 // 每帧尾部段数
}

const rainbowCanvas = ref<HTMLCanvasElement | null>(null)
const canvasWidth = computed(() => remToPx(raimbowConfig.stripeWidth * raimbowConfig.stripeCount))
const canvasHeight = computed(() => remToPx(raimbowConfig.stripeHeight * 7))

const segmentWidth = remToPx(raimbowConfig.stripeWidth)
const segmentHeight = remToPx(raimbowConfig.stripeHeight)
const frameSegmentHeightOffset = 0.35 * segmentHeight // 条纹的偏移量
const flicker = ref(false)

const drawRainbowTails = () => {
  if (!rainbowCanvas.value) return

  const canvas = rainbowCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 绘制彩虹条带
  for (let i = 0; i < raimbowConfig.stripeCount; i++) {
    const offsetX = i * segmentWidth

    // 绘制每个颜色条纹
    for (let j = 0; j < raimbowConfig.colors.length; j++) {
      ctx.fillStyle = raimbowConfig.colors[j]
      const offsetY = j * segmentHeight + ((((i % 2) === 0) === flicker.value) ? frameSegmentHeightOffset : 0)
      ctx.fillRect(offsetX, offsetY, segmentWidth, segmentHeight)
    }
  }
}


function remToPx(rem: number) {
  return rem * 16
}

let _timer: ReturnType<typeof setInterval> | null = null
const toggleIntervalMs = 210 // 切换间隔，毫秒

onMounted(() => {
  _timer = setInterval(() => {

    flicker.value = !flicker.value

    drawRainbowTails()

  }, toggleIntervalMs)

  // 初始绘制
  drawRainbowTails()
})

onUnmounted(() => {
  if (_timer) clearInterval(_timer)
})


</script>

<style scoped>
.cat-image {
  user-select: none;
  width: 16rem;
  position: absolute;
  z-index: 3;
}

.rainbow-tails {
  position: absolute;
  transform: translate(-95%, 10%);
  z-index: 2;
  overflow: hidden;
}

.image-container {
  top: 42%;
}

@media (min-width: 192px) {
  .image-container {
    left: 20%;
  }
}

@media (min-width: 576px) {
  .image-container {
    left: 20%;
  }
}

@media (min-width: 768px) {
  .image-container {
    left: 30%;
  }
}

@media (min-width: 992px) {
  .image-container {
    left: 40%;
  }
}
</style>