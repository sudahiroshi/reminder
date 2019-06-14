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

class Reminder {
    constructor() {
        // 本来ならDBとの接続などを行う．
        // 今はexampleをセットする
        this.data = example;
    }
    rendering() {
        let body = document.querySelector('body');
        body.textContent = null;

        for( let dat of this.data ) {
            let task = document.createElement('div');
            task.classList.add('task');
            let title = document.createElement('div');
            title.classList.add('title');
            title.textContent = dat.title;
            let progress = document.createElement('div');
            let page_all = dat.pages;
            for( let da of dat.progress ) {

                let subject = document.createElement('div');
                subject.classList.add('subject');
                let sub = document.createElement('div');
                let work = document.createElement('span');
                work.classList.add('work');
                work.textContent = da.work;
                let deadline = document.createElement('span');
                deadline.classList.add('deadline');
                let dead = new Date( da.deadline );
                deadline.textContent = "[" + dead.getMonth() + "/" + dead.getDate() + "]";
                let days = document.createElement('p');
                days.classList.add('days');
                let remain = Math.trunc((dead - new Date())/1000/60/60/24);
                if( remain < 0 ){
                    days.textContent = "" + remain + "日超過";
                    days.classList.add('over');
                }
                else days.textContent = "あと" + remain + "日";

                sub.appendChild(work);
                sub.appendChild(deadline);
                subject.appendChild(sub);
                subject.appendChild(days);

                progress.appendChild(subject);

                let prg = document.createElement('div');
                prg.classList.add('prg');
                let pages = document.createElement('p');
                pages.classList.add('pages');
                pages.textContent = "" + da.pages + "/" + page_all + "p";

                prg.appendChild( pages );
                progress.appendChild(prg);

            }
            console.log(title);
            task.appendChild(title);
            task.appendChild(progress);
            body.appendChild( task );
        }
    }
}

window.addEventListener('load', () => {
    let dummy = new Reminder();
    dummy.rendering();
})