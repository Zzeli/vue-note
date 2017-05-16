var colors = ['red', 'yellow', 'pink', 'blue', 'orange', 'green'];
var note = new Vue({
    el: '#el',
    data: {
        cons: [
            {id: 1, title: '标签1', content: "啦啦啦", top: '50', left: '50', bg: 'red'},
            {id: 2, title: '标签2', content: "嘻嘻嘻", top: '50', left: '350', bg: 'yellow'},
            {id: 3, title: '标签5', content: "呵呵呵", top: '50', left: '650', bg: 'orange'},
            {id: 4, title: '标签3', content: "嘿嘿嘿", top: '380', left: '50', bg: 'pink'},
            {id: 5, title: '标签4', content: "哈哈哈", top: '380', left: '350', bg: 'blue'},
            {id: 6, title: '标签6', content: "呼呼呼", top: '380', left: '650', bg: 'green'}
        ],
        moveEvent: {
            state: false, index: null, posion: {}
        }
    },
    mounted: function () {
        document.onkeyup = (function (e) {
            if (e.keyCode == 8 || e.keyCode == 46 && this.moveEvent.index != null) {
                var id = this.moveEvent.index;
                this.cons.splice(id, 1);
                this.moveEvent.index = this.cons.length ? this.cons.length - 1 : null;
            }
        }).bind(this);
        if (localStorage.cons) {
            this.cons = JSON.parse(localStorage.cons);
        }
    },
    methods: {
        addnotes: function (e) {

            var id;
            if (this.cons.length) {
                id = this.cons[this.cons.length - 1].id + 1
            } else {
                id = 1;
            }

            //var id=this.cons[this.cons.length-1].id +1,
            var title = '便签' + id,
                top = e.clientY - 25,
                left = e.clientX - 120,
                bg = colors[Math.floor(Math.random() * colors.length)];
            this.cons.push(
                {
                    id, title, content: '请输入随笔', top, left, bg
                }
            );
            this.save();
        },
        md: function (i, e) {
            this.moveEvent.index = i;
            this.moveEvent.posion = {
                x: e.offsetX,
                y: e.offsetY
            };
            this.moveEvent.state = true;
        },
        mv: function (e) {
            if (this.moveEvent.state) {
                var top = e.clientY - this.moveEvent.posion.y;
                var left = e.clientX - this.moveEvent.posion.x;
                this.cons[this.moveEvent.index].top = top;
                this.cons[this.moveEvent.index].left = left;
                this.save();
            }
        },
        mu: function () {
            this.moveEvent.state = false;
        },
        save: function () {
            localStorage.cons = JSON.stringify(this.cons);
        },

        shift: function (i, e) {
            var id = this.moveEvent.index = i;
            this.cons.splice(id, 1);

            this.save();
            //e.preventDefault()
        }
    }
})


