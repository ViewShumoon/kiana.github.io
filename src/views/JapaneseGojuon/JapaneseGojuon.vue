<template>
    <div class="container p-3">
        <n-flex justify="space-between" class="mb-3">
            <n-h2 class="mb-0">日语五十音图</n-h2>
            <n-space vertical align="end" size="small">
                <n-radio-group v-model:value="mode" name="kana-mode">
                    <n-radio-button v-for="opt in modeOptions" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </n-radio-button>
                </n-radio-group>
                <n-space class="mt-2" align="center" size="small">
                    <span>显示两者</span>
                    <n-switch v-model:value="showAll" />
                </n-space>
            </n-space>
        </n-flex>

        <n-space vertical>
            <n-card v-for="section in sections" :key="section.title" :title="section.title" size="small" bordered>
                <div class="d-flex justify-content-center">
                    <n-table class="gojuon-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th class="row-label" v-for="col in section.columnLabels" :key="col">
                                    {{ col }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, ri) in section.rows" :key="ri">
                                <td class="row-label">{{ row.label }}</td>
                                <td v-for="(cell, ci) in row.cells" :key="ci">
                                    <button v-if="cell" class="kana-btn" type="button" @click="speak(cell)">
                                        <span class="kana">
                                            {{ kanaOf(cell) }}
                                            <span v-if="showAll" class="other-kana ps-4">{{ otherKanaOf(cell) }}</span>
                                        </span>
                                        <span class="romaji">{{
                                            cell.romaji
                                            }}</span>
                                    </button>
                                    <!-- <span v-else></span> -->
                                </td>
                            </tr>
                        </tbody>
                    </n-table>
                </div>
            </n-card>

            <n-card title="促音" bordered>
                <n-flex>
                    <button class="kana-btn" style="width: 4rem" type="button" @click="speak(sokuon)">
                        <span class="kana">{{ kanaOf(sokuon) }}</span>
                        <span class="romaji">{{ sokuon.romaji }}</span>
                    </button>
                    <div>
                        <div>小寫的「つ」，表示停頓一拍。</div>
                        <div>
                            {{
                                mode === "h"
                                    ? "例： がっこう (gakkou) = 学校"
                                    : "例：キップ (kippu) = 票"
                            }}
                        </div>
                    </div>
                </n-flex>
            </n-card>
            <n-card title="長音" bordered>
                <n-flex>
                    <div>ああ／いい／うう／ええ／おお</div>
                    <n-divider vertical />
                    <div>
                        <div v-if="mode === 'h'">
                            <div>
                                平假名的長音通常以母音相連表示，不使用「ー」
                            </div>
                            <div>例： (okaasan)、 (oneesan)</div>
                        </div>
                        <div v-else>
                            <div>用长音记号「ー」表示</div>
                            <div>例：コーヒー (koohii)</div>
                        </div>
                    </div>
                </n-flex>
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
const showAll = ref<boolean>(false);
const modeOptions = [
    { label: '平假名', value: 'h' },
    { label: '片假名', value: 'k' },
];

function kanaOf(cell: KanaCell): string {
    return mode.value === 'h' ? cell.h : cell.k;
}

/** 与当前模式相反的假名（全显示时展示） */
function otherKanaOf(cell: KanaCell): string {
    return mode.value === 'h' ? cell.k : cell.h;
}

// 促音小写字符（随模式切换）
const sokuon: KanaCell = { h: 'っ', k: 'ッ', romaji: 'tsu' };

const sections: GojuonSection[] = [
    {
        title: '清音',
        columnLabels: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            {
                label: 'a',
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
                cells: [{ h: 'ん', k: 'ン', romaji: 'n' }, null, null, null, null],
            },
        ],
    },
    {
        title: '濁音',
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
        title: '半濁音',
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
@media (min-width: 992px) {
    .gojuon-table {
        max-width: 900px;
    }
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

.row-label {
    font-weight: 600;
    color: rgba(128, 128, 128, 0.9);
}

.kana-btn {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.8rem 0.25rem;
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
    font-size: 1.6rem;
    line-height: 1.3;
}

.romaji {
    font-size: 1rem;
    /* line-height: 1.2; */
    color: rgba(128, 128, 128, 0.95);
}

.other-kana {
    font-size: 1.7rem;
    line-height: 1.2;
    color: rgba(128, 128, 128, 0.95);
}

.extra-title {
    font-weight: 600;
    margin-bottom: 8px;
}
</style>
