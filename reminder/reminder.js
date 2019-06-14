var example = [];

example.push({
    title: "だって夏だし",
    pages: 50,
    progress: [
        {
            work: "プロット（台詞確定）",
            deadline: "2019/6/6",
            pages: 5
        },
        {
            work: "ネーム",
            deadline: "2019/6/13",
            pages: 5
        },
        {
            work: "下書き",
            deadline: "2019/6/29",
            pages: 0
        },
        {
            work: "ペン入れ（人物）",
            deadline: "2019/7/7",
            pages: 5
        },
        {
            work: "ペン入れ（背景）",
            deadline: "2019/7/10",
            pages: 5
        },
        {
            work: "トーン",
            deadline: "2019/7/12",
            pages: 5
        },
        {
            work: "台詞入れ",
            deadline: "2019/7/13",
            pages: 5
        },
        {
            work: "仕上げ",
            deadline: "2019/7/16",
            pages: 5
        }
    ]
});

console.log(example);

class Rminder {
    constructor() {
        // 本来ならDBとの接続などを行う．
        // 今はexampleをセットする
        this.data = example;
    }
    rendering() [
        
    ]
}