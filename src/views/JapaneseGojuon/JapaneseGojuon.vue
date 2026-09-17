<template>
    <div class="container p-3">
        <n-flex justify="space-between" align="center" class="mb-3">
            <n-h2 class="mb-0">日语五十音图</n-h2>
            <n-radio-group v-model:value="mode" name="kana-mode">
                <n-radio-button v-for="opt in modeOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                </n-radio-button>
            </n-radio-group>
        </n-flex>

        <n-space vertical size="large">
            <n-card v-for="section in sections" :key="section.title" :title="section.title" size="small" bordered>
                <div class="table-wrap">
                    <table class="gojuon-table">
                        <thead>
                            <tr>
                                <th class="row-head"></th>
                                <th v-for="col in section.columnLabels" :key="col">{{ col }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, ri) in section.rows" :key="ri">
                                <td class="row-label">{{ row.label }}</td>
                                <td v-for="(cell, ci) in row.cells" :key="ci">
                                    <button v-if="cell" class="kana-btn" type="button" @click="speak(cell)">
                                        <span class="kana">{{ kanaOf(cell) }}</span>
                                        <span class="romaji">{{ cell.romaji }}</span>
                                    </button>
                                    <span v-else class="empty">-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </n-card>

            <n-card title="促音 / 长音" size="small" bordered>
                <n-grid :cols="2" :x-gap="12" responsive="screen" item-responsive>
                    <n-gi span="0:2 640:1">
                        <div class="extra-title">促音（停顿一拍）</div>
                        <div class="extra-row">
                            <button class="kana-btn" type="button" @click="speak(sokuon)">
                                <span class="kana">{{ kanaOf(sokuon) }}</span>
                                <span class="romaji">{{ sokuon.romaji }}</span>
                            </button>
                            <span class="extra-desc">{{ mode === 'h' ? 'がっこう (gakkou) = 学校' : 'キップ (kippu) = 票' }}</span>
                        </div>
                    </n-gi>
                    <n-gi span="0:2 640:1">
                        <div class="extra-title">长音（延长母音）</div>
                        <div class="extra-row">
                            <span class="extra-desc">
                                {{ mode === 'h' ? '以母音相连表示：ああ / いい / うう / ええ / おう' : '用长音记号「ー」表示：コーヒー (koohii)' }}
                            </span>
                        </div>
                    </n-gi>
                </n-grid>
            </n-card>
        </n-space>
    </div>
</template>

<script setup lang="ts">
/** 单个假名格子：平假名 / 片假名 / 罗马音 */
interface KanaCell {
    h: string; // hiragana 平假名
    k: string; // katakana 片假名
    romaji: string;
}

/** 表格分区（清音、浊音、半浊音、拗音） */
interface GojuonSection {
    title: string;
    columnLabels: string[];
    rows: { label: string; cells: (KanaCell | null)[] }[];
}

type KanaMode = 'h' | 'k';

const mode = ref<KanaMode>('h');
const modeOptions = [
    { label: '平假名', value: 'h' },
    { label: '片假名', value: 'k' },
];

function kanaOf(cell: KanaCell): string {
    return mode.value === 'h' ? cell.h : cell.k;
}

// 促音小写字符（随模式切换）
const sokuon: KanaCell = { h: 'っ', k: 'ッ', romaji: '(小つ)' };

const sections: GojuonSection[] = [
    {
        title: '清音',
        columnLabels: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            {
                label: '',
                cells: [
                    { h: 'あ', k: 'ア', romaji: 'a' },
                    { h: 'い', k: 'イ', romaji: 'i' },
                    { h: 'う', k: 'ウ', romaji: 'u' },
                    { h: 'え', k: 'エ', romaji: 'e' },
                    { h: 'お', k: 'オ', romaji: 'o' },
                ],
            },
            {
                label: 'k',
                cells: [
                    { h: 'か', k: 'カ', romaji: 'ka' },
                    { h: 'き', k: 'キ', romaji: 'ki' },
                    { h: 'く', k: 'ク', romaji: 'ku' },
                    { h: 'け', k: 'ケ', romaji: 'ke' },
                    { h: 'こ', k: 'コ', romaji: 'ko' },
                ],
            },
            {
                label: 's',
                cells: [
                    { h: 'さ', k: 'サ', romaji: 'sa' },
                    { h: 'し', k: 'シ', romaji: 'shi' },
                    { h: 'す', k: 'ス', romaji: 'su' },
                    { h: 'せ', k: 'セ', romaji: 'se' },
                    { h: 'そ', k: 'ソ', romaji: 'so' },
                ],
            },
            {
                label: 't',
                cells: [
                    { h: 'た', k: 'タ', romaji: 'ta' },
                    { h: 'ち', k: 'チ', romaji: 'chi' },
                    { h: 'つ', k: 'ツ', romaji: 'tsu' },
                    { h: 'て', k: 'テ', romaji: 'te' },
                    { h: 'と', k: 'ト', romaji: 'to' },
                ],
            },
            {
                label: 'n',
                cells: [
                    { h: 'な', k: 'ナ', romaji: 'na' },
                    { h: 'に', k: 'ニ', romaji: 'ni' },
                    { h: 'ぬ', k: 'ヌ', romaji: 'nu' },
                    { h: 'ね', k: 'ネ', romaji: 'ne' },
                    { h: 'の', k: 'ノ', romaji: 'no' },
                ],
            },
            {
                label: 'h',
                cells: [
                    { h: 'は', k: 'ハ', romaji: 'ha' },
                    { h: 'ひ', k: 'ヒ', romaji: 'hi' },
                    { h: 'ふ', k: 'フ', romaji: 'fu' },
                    { h: 'へ', k: 'ヘ', romaji: 'he' },
                    { h: 'ほ', k: 'ホ', romaji: 'ho' },
                ],
            },
            {
                label: 'm',
                cells: [
                    { h: 'ま', k: 'マ', romaji: 'ma' },
                    { h: 'み', k: 'ミ', romaji: 'mi' },
                    { h: 'む', k: 'ム', romaji: 'mu' },
                    { h: 'め', k: 'メ', romaji: 'me' },
                    { h: 'も', k: 'モ', romaji: 'mo' },
                ],
            },
            {
                label: 'y',
                cells: [
                    { h: 'や', k: 'ヤ', romaji: 'ya' },
                    null,
                    { h: 'ゆ', k: 'ユ', romaji: 'yu' },
                    null,
                    { h: 'よ', k: 'ヨ', romaji: 'yo' },
                ],
            },
            {
                label: 'r',
                cells: [
                    { h: 'ら', k: 'ラ', romaji: 'ra' },
                    { h: 'り', k: 'リ', romaji: 'ri' },
                    { h: 'る', k: 'ル', romaji: 'ru' },
                    { h: 'れ', k: 'レ', romaji: 're' },
                    { h: 'ろ', k: 'ロ', romaji: 'ro' },
                ],
            },
            {
                label: 'w',
                cells: [
                    { h: 'わ', k: 'ワ', romaji: 'wa' },
                    null,
                    null,
                    null,
                    { h: 'を', k: 'ヲ', romaji: 'wo' },
                ],
            },
            {
                label: '',
                cells: [null, null, null, null, { h: 'ん', k: 'ン', romaji: 'n' }],
            },
        ],
    },
    {
        title: '浊音',
        columnLabels: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            {
                label: 'g',
                cells: [
                    { h: 'が', k: 'ガ', romaji: 'ga' },
                    { h: 'ぎ', k: 'ギ', romaji: 'gi' },
                    { h: 'ぐ', k: 'グ', romaji: 'gu' },
                    { h: 'げ', k: 'ゲ', romaji: 'ge' },
                    { h: 'ご', k: 'ゴ', romaji: 'go' },
                ],
            },
            {
                label: 'z',
                cells: [
                    { h: 'ざ', k: 'ザ', romaji: 'za' },
                    { h: 'じ', k: 'ジ', romaji: 'ji' },
                    { h: 'ず', k: 'ズ', romaji: 'zu' },
                    { h: 'ぜ', k: 'ゼ', romaji: 'ze' },
                    { h: 'ぞ', k: 'ゾ', romaji: 'zo' },
                ],
            },
            {
                label: 'd',
                cells: [
                    { h: 'だ', k: 'ダ', romaji: 'da' },
                    { h: 'ぢ', k: 'ヂ', romaji: 'ji' },
                    { h: 'づ', k: 'ヅ', romaji: 'zu' },
                    { h: 'で', k: 'デ', romaji: 'de' },
                    { h: 'ど', k: 'ド', romaji: 'do' },
                ],
            },
            {
                label: 'b',
                cells: [
                    { h: 'ば', k: 'バ', romaji: 'ba' },
                    { h: 'び', k: 'ビ', romaji: 'bi' },
                    { h: 'ぶ', k: 'ブ', romaji: 'bu' },
                    { h: 'べ', k: 'ベ', romaji: 'be' },
                    { h: 'ぼ', k: 'ボ', romaji: 'bo' },
                ],
            },
        ],
    },
    {
        title: '半浊音',
        columnLabels: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            {
                label: 'p',
                cells: [
                    { h: 'ぱ', k: 'パ', romaji: 'pa' },
                    { h: 'ぴ', k: 'ピ', romaji: 'pi' },
                    { h: 'ぷ', k: 'プ', romaji: 'pu' },
                    { h: 'ぺ', k: 'ペ', romaji: 'pe' },
                    { h: 'ぽ', k: 'ポ', romaji: 'po' },
                ],
            },
        ],
    },
    {
        title: '拗音',
        columnLabels: ['ya', 'yu', 'yo'],
        rows: [
            {
                label: 'k',
                cells: [
                    { h: 'きゃ', k: 'キャ', romaji: 'kya' },
                    { h: 'きゅ', k: 'キュ', romaji: 'kyu' },
                    { h: 'きょ', k: 'キョ', romaji: 'kyo' },
                ],
            },
            {
                label: 'sh',
                cells: [
                    { h: 'しゃ', k: 'シャ', romaji: 'sha' },
                    { h: 'しゅ', k: 'シュ', romaji: 'shu' },
                    { h: 'しょ', k: 'ショ', romaji: 'sho' },
                ],
            },
            {
                label: 'ch',
                cells: [
                    { h: 'ちゃ', k: 'チャ', romaji: 'cha' },
                    { h: 'ちゅ', k: 'チュ', romaji: 'chu' },
                    { h: 'ちょ', k: 'チョ', romaji: 'cho' },
                ],
            },
            {
                label: 'n',
                cells: [
                    { h: 'にゃ', k: 'ニャ', romaji: 'nya' },
                    { h: 'にゅ', k: 'ニュ', romaji: 'nyu' },
                    { h: 'にょ', k: 'ニョ', romaji: 'nyo' },
                ],
            },
            {
                label: 'h',
                cells: [
                    { h: 'ひゃ', k: 'ヒャ', romaji: 'hya' },
                    { h: 'ひゅ', k: 'ヒュ', romaji: 'hyu' },
                    { h: 'ひょ', k: 'ヒョ', romaji: 'hyo' },
                ],
            },
            {
                label: 'm',
                cells: [
                    { h: 'みゃ', k: 'ミャ', romaji: 'mya' },
                    { h: 'みゅ', k: 'ミュ', romaji: 'myu' },
                    { h: 'みょ', k: 'ミョ', romaji: 'myo' },
                ],
            },
            {
                label: 'r',
                cells: [
                    { h: 'りゃ', k: 'リャ', romaji: 'rya' },
                    { h: 'りゅ', k: 'リュ', romaji: 'ryu' },
                    { h: 'りょ', k: 'リョ', romaji: 'ryo' },
                ],
            },
            {
                label: 'g',
                cells: [
                    { h: 'ぎゃ', k: 'ギャ', romaji: 'gya' },
                    { h: 'ぎゅ', k: 'ギュ', romaji: 'gyu' },
                    { h: 'ぎょ', k: 'ギョ', romaji: 'gyo' },
                ],
            },
            {
                label: 'j',
                cells: [
                    { h: 'じゃ', k: 'ジャ', romaji: 'ja' },
                    { h: 'じゅ', k: 'ジュ', romaji: 'ju' },
                    { h: 'じょ', k: 'ジョ', romaji: 'jo' },
                ],
            },
            {
                label: 'b',
                cells: [
                    { h: 'びゃ', k: 'ビャ', romaji: 'bya' },
                    { h: 'びゅ', k: 'ビュ', romaji: 'byu' },
                    { h: 'びょ', k: 'ビョ', romaji: 'byo' },
                ],
            },
            {
                label: 'p',
                cells: [
                    { h: 'ぴゃ', k: 'ピャ', romaji: 'pya' },
                    { h: 'ぴゅ', k: 'ピュ', romaji: 'pyu' },
                    { h: 'ぴょ', k: 'ピョ', romaji: 'pyo' },
                ],
            },
        ],
    },
];

/** 使用浏览器语音合成朗读假名发音 */
function speak(cell: KanaCell) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utter = new SpeechSynthesisUtterance(kanaOf(cell));
    utter.lang = 'ja-JP';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
}
</script>

<style scoped>
.mb-0 {
    margin-bottom: 0;
}

.mb-3 {
    margin-bottom: 1rem;
}

.table-wrap {
    overflow-x: auto;
}

.gojuon-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.gojuon-table th,
.gojuon-table td {
    border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.12));
    text-align: center;
    padding: 0;
}

.gojuon-table thead th {
    font-weight: 600;
    padding: 6px 0;
    background: var(--n-color-modal, rgba(0, 0, 0, 0.02));
}

.row-head,
.row-label {
    width: 48px;
    font-weight: 600;
    color: rgba(128, 128, 128, 0.9);
}

.row-label {
    padding: 4px 0;
}

.kana-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 64px;
    padding: 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    font: inherit;
    color: inherit;
    transition: background 0.2s;
}

.kana-btn:hover {
    background: rgba(24, 160, 88, 0.12);
}

.kana {
    font-size: 26px;
    line-height: 1.2;
}

.romaji {
    font-size: 13px;
    color: rgba(128, 128, 128, 0.95);
}

.empty {
    display: block;
    min-height: 64px;
    line-height: 64px;
    color: rgba(128, 128, 128, 0.35);
}

.extra-title {
    font-weight: 600;
    margin-bottom: 8px;
}

.extra-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.extra-row .kana-btn {
    width: 64px;
    min-height: 56px;
    border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.12));
    border-radius: 6px;
}

.extra-desc {
    color: rgba(128, 128, 128, 0.95);
    font-size: 14px;
}
</style>
