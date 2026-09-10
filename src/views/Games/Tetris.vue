<template>
  <div class="et-root">
    <div class="et-shell">
      <section class="et-stage">
        <!-- 网格只画固定这么多行，方块掉出去之后下面就是空的 -->
        <div class="et-well" :style="{ width: COLS * cell + 'px' }">
          <div
            class="et-board"
            :style="{
              width: COLS * cell + 'px',
              height: gridHeight + 'px',
              '--cell': cell + 'px',
            }"
          />
          <span
            v-for="c in cells"
            :key="c.key"
            class="et-cell"
            :style="{
              width: cell + 'px',
              height: cell + 'px',
              transform: `translate3d(${c.x}px, ${c.y}px, 0)`,
              background: c.bg,
            }"
          />
        </div>
        <!-- 页面被拉长的部分：方块掉到网格外，就靠这段占位往下顶 -->
        <div class="et-tail" :style="{ height: tailHeight + 'px', width: COLS * cell + 'px' }" />
      </section>

      <aside class="et-side">
        <h1 class="et-title">Tetris</h1>

        <!-- 下一个方块：随机一种，去掉空行空列后用网格铺出来，靠 flex 直接居中 -->
        <div class="et-next">
          <div class="et-next-grid" :style="{ gridTemplateColumns: `repeat(${previewCols}, ${PREVIEW_CELL}px)` }">
            <span
              v-for="(v, i) in previewCells"
              :key="i"
              class="et-next-cell"
              :class="{ 'is-on': !!v }"
              :style="{ width: PREVIEW_CELL + 'px', height: PREVIEW_CELL + 'px', background: v ? PREVIEW.color : 'transparent' }"
            />
          </div>
        </div>

        <dl class="et-stats">
          <div class="et-stat">
            <dt>Level</dt>
            <dd>1</dd>
          </div>
          <div class="et-stat">
            <dt>Score</dt>
            <dd>0</dd>
          </div>
          <div class="et-stat">
            <dt>Lines</dt>
            <dd>0</dd>
          </div>
        </dl>

        <ul class="et-keys">
          <li><kbd>←</kbd><kbd>→</kbd> 移动</li>
          <li><kbd>↑</kbd> / <kbd>Z</kbd> 旋转</li>
          <li><kbd>↓</kbd> 加速下坠</li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 没有底部的俄罗斯方块。
 *
 * 规则只有一条：井没有底。
 * 方块掉到当前最低一行时不会停，而是继续往下掉；网格只渲染固定行数，
 * 方块掉出网格之后由一段占位把网页继续拉长，游戏照旧运行。
 * 因为永远落不了地，所以：
 * - 没有锁定、没有堆叠，也就没有“落到别的方块上”这回事，井格数据完全不需要；
 * - 没有整行消除，也就没有分数可算，计分板永远是 Level 1 / Score 0 / Lines 0；
 * - 不会游戏结束，一局从头到尾只有那一个方块，它在无限延伸的井里一直掉。
 * 也没有暂停、没有重开、没有镜头跟随 —— 只有刷新页面这一种重新开始的方式。
 * 玩家能做的只有左右移动、旋转、加速下坠，以及看着这条网页被拉得多长。
 */

const COLS = 10
const ROWS = 20 // 网格固定行数，方块掉出去也不再往下长网格
const TAIL_ROWS = 2 // 拉网页时，方块底部下方多留的行

const DROP_INTERVAL = 900 // 下落一行的间隔
const SOFT_DROP_INTERVAL = 600 // 按住 ↓ 时的间隔

const TETROMINOES: { color: string; shape: number[][] }[] = [
  { color: '#22d3ee', shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]] },
  { color: '#facc15', shape: [[1, 1], [1, 1]] },
  { color: '#c084fc', shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] },
  { color: '#4ade80', shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] },
  { color: '#f87171', shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]] },
  { color: '#60a5fa', shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]] },
  { color: '#fb923c', shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]] },
]

const PREVIEW_CELL = 20 // 预览格子的边长
// 本局只有一个方块，永远不会“落地生成下一个”，所以这里纯粹摆一个随机方块看看
const PREVIEW = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)]

// 去掉形状四周的空行空列，剩下的本体直接铺成网格就能居中，省掉坐标计算
function trimShape(shape: number[][]): number[][] {
  const rows = shape.filter((line) => line.some((v) => v))
  const cols: number[] = []
  for (let c = 0; c < (shape[0]?.length ?? 0); c++) {
    if (rows.some((line) => line[c])) cols.push(c)
  }
  return rows.map((line) => cols.map((c) => line[c]))
}

const previewGrid = trimShape(PREVIEW.shape)
const previewCols = previewGrid[0].length
const previewCells = previewGrid.flat()

interface ActivePiece {
  shape: number[][]
  colorIndex: number
  row: number
  col: number
}

interface Cell {
  key: string
  x: number
  y: number
  bg: string
}

const cell = ref(30)
// 整局游戏只有这一个方块，它一直在掉
const active = ref<ActivePiece | null>(null)

// 方块实体部分占的最低一行（形状尾部常有空行）
function pieceBottom(shape: number[][]): number {
  for (let r = shape.length - 1; r >= 0; r--) {
    if (shape[r].some((v) => v)) return r
  }
  return 0
}

// 方块底部所在的全局行号
const bottomRow = computed(() => {
  const piece = active.value
  if (!piece) return ROWS - 1
  return piece.row + pieceBottom(piece.shape)
})

const gridHeight = computed(() => ROWS * cell.value)
// 方块还在网格里时页面不变长，掉出去之后每掉一行网页多一行高
const tailHeight = computed(() => Math.max(0, (bottomRow.value + TAIL_ROWS - ROWS) * cell.value))

const cells = computed<Cell[]>(() => {
  const piece = active.value
  if (!piece) return []
  const size = cell.value
  const color = TETROMINOES[piece.colorIndex].color
  const list: Cell[] = []
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue
      list.push({
        key: `${r}-${c}`,
        x: (piece.col + c) * size,
        y: (piece.row + r) * size,
        bg: color,
      })
    }
  }
  return list
})

function cloneShape(shape: number[][]) {
  return shape.map((r) => r.slice())
}

// 顺时针 / 逆时针旋转（转置 + 反转）
function rotate(shape: number[][], clockwise: boolean): number[][] {
  const rows = shape.length
  const cols = shape[0].length
  const t: number[][] = []
  for (let c = 0; c < cols; c++) {
    const line: number[] = []
    for (let r = 0; r < rows; r++) line.push(shape[r][c])
    t.push(line)
  }
  return clockwise ? t.map((line) => line.reverse()) : t.reverse()
}

// 只有左右井壁，没有别的阻挡
function fits(col: number, shape: number[][]): boolean {
  let left = COLS
  let right = -1
  for (const line of shape) {
    for (let c = 0; c < line.length; c++) {
      if (!line[c]) continue
      if (c < left) left = c
      if (c > right) right = c
    }
  }
  if (right < 0) return true
  return col + left >= 0 && col + right < COLS
}

function moveHorizontal(dir: number) {
  const piece = active.value
  if (!piece) return
  if (fits(piece.col + dir, piece.shape)) piece.col += dir
}

function turn(clockwise: boolean) {
  const piece = active.value
  if (!piece) return
  const shape = rotate(piece.shape, clockwise)
  for (const kick of [0, 1, -1, 2, -2]) {
    if (!fits(piece.col + kick, shape)) continue
    piece.shape = shape
    piece.col += kick
    return
  }
}

// 下落：永远只是往下一行，没有尽头也没有停靠
function fall() {
  const piece = active.value
  if (!piece) return
  piece.row += 1
}

let softDrop = false

let rafId = 0
let lastFrame = 0
let accumulator = 0

function loop(now: number) {
  rafId = requestAnimationFrame(loop)
  if (now - lastFrame > 250) lastFrame = now // 切后台回来不补算
  accumulator += now - lastFrame
  lastFrame = now

  const interval = softDrop ? SOFT_DROP_INTERVAL : DROP_INTERVAL
  for (;;) {
    if (accumulator < interval) break
    accumulator -= interval
    fall()
  }
}

function spawn() {
  const colorIndex = Math.floor(Math.random() * TETROMINOES.length)
  const shape = cloneShape(TETROMINOES[colorIndex].shape)
  active.value = { shape, colorIndex, row: 0, col: Math.floor((COLS - shape[0].length) / 2) }
  softDrop = false
  accumulator = 0
  lastFrame = performance.now()
}

function fitCell() {
  const usable = Math.min(window.innerWidth - 24, 420)
  cell.value = Math.max(16, Math.min(30, Math.floor(usable / COLS)))
}

function onKeyDown(e: KeyboardEvent) {
  const code = e.code
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(code)) e.preventDefault()

  switch (code) {
    case 'ArrowLeft':
      return moveHorizontal(-1)
    case 'ArrowRight':
      return moveHorizontal(1)
    case 'ArrowUp':
    case 'KeyX':
      return turn(true)
    case 'KeyZ':
      return turn(false)
    case 'ArrowDown':
      softDrop = true
      return fall()
  }
}

function onKeyUp(e: KeyboardEvent) {
  if (e.code === 'ArrowDown') softDrop = false
}

onMounted(() => {
  fitCell()
  window.addEventListener('resize', fitCell)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  spawn()
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', fitCell)
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.et-root {
  min-height: 100vh;
  padding: 16px;
  color: #e8e8ee;
}

.et-shell {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
}

.et-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.et-well {
  position: relative;
}

.et-board {
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.02);
  background-image: repeating-linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05) 0 1px,
      transparent 1px var(--cell)
    ),
    repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px var(--cell));
}

.et-cell {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35), inset 2px 2px 4px rgba(255, 255, 255, 0.28);
}

.et-abyss {
  padding: 10px 0;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.3);
  animation: et-fall 1.6s ease-in-out infinite;
}

@keyframes et-fall {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  50% {
    transform: translateY(6px);
    opacity: 0.75;
  }
}

.et-side {
  width: 240px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
}

.et-title {
  margin: 0 0 8px;
  font-size: 24px;
  line-height: 1.15;
}

.et-desc {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
}

.et-next {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
}

.et-next-grid {
  display: grid;
}

.et-next-cell.is-on {
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.28);
}

.et-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0 0 16px;
}

.et-stat {
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
}

.et-stat dt {
  margin: 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
}

.et-stat dd {
  margin: 2px 0 0;
  font-size: 16px;
  font-weight: 600;
}

.et-keys {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.5);
}

.et-keys kbd {
  padding: 1px 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 11px;
}
</style>
