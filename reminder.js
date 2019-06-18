var example = [];

example.push({
    title: "だって夏だし",
    pages: 50,
    progress: [
        {
            work: "プロット（台詞確定）",
            deadline: "2019/6/6",
            pages: 50
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
            pages: 0
        },
        {
            work: "ペン入れ（背景）",
            deadline: "2019/7/10",
            pages: 0
        },
        {
            work: "トーン",
            deadline: "2019/7/12",
            pages: 0
        },
        {
            work: "台詞入れ",
            deadline: "2019/7/13",
            pages: 0
        },
        {
            work: "仕上げ",
            deadline: "2019/7/16",
            pages: 0
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
            let remind = document.createElement('div');
            remind.classList.add('remind');
            let remindList = [];
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
                    days.textContent = "" + ( -1 * remain ) + "日超過";
                    days.classList.add('over');
                    remindList.push( da.work );
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

                let graph = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                graph.classList.add('graph');
                graph.setAttribute( 'width', 240 );
                graph.setAttribute( 'height', 20 );
                graph.setAttribute( 'version', 1.1 );
                let bar1 = document.createElementNS('http://www.w3.org/2000/svg','rect');
                bar1.setAttribute( 'x', 0 );
                bar1.setAttribute( 'y', 0 );
                bar1.setAttribute( 'width', da.pages / dat.pages * 240 );
                bar1.setAttribute( 'height', 20 );
                bar1.setAttribute( 'fill', '#0060c0' );
                let bar2 = document.createElementNS('http://www.w3.org/2000/svg','rect');
                bar2.setAttribute( 'x', da.pages / dat.pages * 240 );
                bar2.setAttribute( 'y', 0 );
                bar2.setAttribute( 'width', 240 - da.pages / dat.pages * 240 );
                bar2.setAttribute( 'height', 20 );
                bar2.setAttribute( 'fill', '#d0e0f0' );
                graph.appendChild( bar1 );
                graph.appendChild( bar2 );

                prg.appendChild( pages );
                prg.appendChild( graph );
                progress.appendChild(prg);

            }
            console.log(title);

            task.appendChild(title);
            if( remindList.length != 0 ) {
                remind.textContent = remindList.join() + "の期限が過ぎています";
                task.appendChild( remind );
            }
            task.appendChild(progress);

            let to_setup = document.createElement('button');
            to_setup.textContent = "入力画面";
            to_setup.addEventListener('click', () => {
                this.setup();
            })
            task.appendChild( to_setup );
            body.appendChild( task );
        }
    }

    setup() {
        let body = document.querySelector('body');
        body.textContent = null;

        for( let dat of this.data ) {
            let setup = document.createElement('div');
            setup.classList.add('setup');
            let title = document.createElement('div');
            title.classList.add('title');
            title.textContent = dat.title;
            let input_progress = document.createElement('div');
            input_progress.classList.add('input_progress');
            let page_all = dat.pages;
            for( let da of dat.progress ) {
                let input_subject = document.createElement('input');
                input_subject.classList.add('input_subject');
                input_subject.setAttribute('value', da.work);
                let input_prg = document.createElement('div');
                input_prg.classList.add('input_prg');
                let input_date = document.createElement('input');
                input_date.classList.add('input_date');
                let deadline = new Date( da.deadline );
                input_date.setAttribute('value', deadline.getFullYear() + '-' + deadline.getMonth() + '-' + deadline.getDay() );
                let updown = document.createElement('div');
                updown.classList.add('updown');
                let up = document.createElement('button');
                up.textContent = '▲';
                up.classList.add('up');
                let p = document.createElement('span');
                p.textContent = da.pages;
                let down = document.createElement('button');
                down.textContent = '▼';
                down.classList.add('down');

                updown.appendChild(up);
                updown.appendChild(p);
                updown.appendChild(down);
                input_prg.appendChild(input_date);
                input_prg.appendChild(updown);
                input_progress.appendChild(input_subject);
                input_progress.appendChild(input_prg)

            }
            console.log(title);
            setup.appendChild(title)
            setup.appendChild(input_progress);

            let to_main = document.createElement('button');
            to_main.textContent = "保存しないで終了";
            to_main.addEventListener('click', () => {
                this.rendering();
            })
            setup.appendChild(to_main);
            body.appendChild( setup );
        }

        let ups = document.querySelectorAll('.up');
        for( let up of ups ) {
            up.addEventListener('click', (ev) => {
                console.log(ev.srcElement);
                let parent = ev.srcElement.parentNode;
                let num = Number(parent.childNodes[1].textContent);
                console.log(num);
                parent.childNodes[1].textContent = num + 1;
            })
        }
    }
}

window.addEventListener('load', () => {
    let dummy = new Reminder();
    dummy.rendering();
    //dummy.setup();
})