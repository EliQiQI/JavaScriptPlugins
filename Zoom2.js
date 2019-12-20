class Zoom2 {
    //zoom1是外层容器,它必须包裹在页面body的最外层子元素,
    //zoom2是大图容器,它在构建时必须放在zoom1的最后
    //zoom1in是小方块容器,它必须放在zoom1的第一个子元素
    //imgsrc是引入图片地址用的
    constructor(zoom1, zoom2, zoom1in,left,top,imgsrc) {
        this.zoom1 = zoom1;
        this.zoom2 = zoom2;
        this.zoom1in = zoom1in;        
        this.left=left;
        this.top=top;
        this.imgsrc=imgsrc;
        this.rate=this.zoom2.width()/this.zoom1in.width();
        this.location=[0,0];
        this.showYourPointer();
        this.giveImg();

    }
    giveImg(){
        this.zoom1.css({
            backgroundImage:`url(../images/${this.imgsrc})`,
            backgroundSize:this.zoom1.width()+'px '+this.zoom1.height()+'px',
        })
        this.zoom2.css({
            backgroundImage:`url(../images/${this.imgsrc})`,
            backgroundSize:this.zoom1.height()*this.rate+'px '+this.zoom1.width()*this.rate+'px',
        })
    }
    changeImg(){
        this.zoom2.css({
            backgroundPosition:`-${this.location[1]*this.rate}px -${this.location[0]*this.rate}px`
        });
    }
    showYourPointer() {
        // let left=parseInt(getComputedStyle(this.zoom1.get(0)).width);
        this.zoom1.css({
            position: 'relative',
        });
        this.zoom2.css({
            position:'absolute',
            display:'none',
            top:0,
            left:this.zoom1.width(),
            zIndex:5,

        });
        this.zoom1in.css({
            position:'absolute',
            display:'none',
            background:'#fede4f',
            opacity:'0.3',
        })
        this.zoom1.on('mouseover', e => {
            this.showZoom2(e);
        });
        this.zoom1.on('mouseout', e => {
            this.showZoom2(e);
        });
        

    }

    showZoom2(e) {
                //当mousemove时候,此时top应该是
                let y = e.pageY - parseInt(getComputedStyle(this.zoom1in.get(0)).height) / 2-this.top;
                //left应该是
                let x = e.pageX - parseInt(getComputedStyle(this.zoom1in.get(0)).width) / 2-this.left;
        switch (e.type) {


            case 'mouseover':
                //鼠标移入的时候,给定父元素的左右位置
                this.left=this.zoom1.get(0).parentElement.offsetLeft;
                this.top=this.zoom1.get(0).parentElement.offsetTop;
                y=e.pageY - parseInt(getComputedStyle(this.zoom1in.get(0)).height) / 2-this.top;
                x=e.pageX - parseInt(getComputedStyle(this.zoom1in.get(0)).width) / 2-this.left;

                this.zoom1.css({
                    cursor:'move',
                });
                this.zoom1in.css('display','block');
                this.zoom1in.css({
                    position:'absolute',
                    top:y,
                    left:x,
                });
                this.zoom2.css('display','block');
                this.zoom1.on('mousemove', e => {
                    this.showZoom2(e)
                });
                break;
            case 'mousemove':
                //左右边界,防止溢出
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                if (x > parseInt(getComputedStyle(this.zoom1.get(0)).width) - parseInt(getComputedStyle(this.zoom1in.get(0)).width)) x = parseInt(getComputedStyle(this.zoom1.get(0)).width) - parseInt(getComputedStyle(this.zoom1in.get(0)).width);
                if (y > parseInt(getComputedStyle(this.zoom1.get(0)).height) - parseInt(getComputedStyle(this.zoom1in.get(0)).height)) y = parseInt(getComputedStyle(this.zoom1.get(0)).height) - parseInt(getComputedStyle(this.zoom1in.get(0)).height);

                //这个是为了方便更改图片,对数据做一个存储
                this.location=[y,x];
                this.zoom1in.css({
                    position: 'absolute',
                    top: y,
                    left: x,
                });
                //更改大图位置的函数
                this.changeImg();
                break;
            case 'mouseout':
                //鼠标移出时做的处理
                this.zoom1.unbind('mousemove');
                this.zoom1.css({
                    cursor:'auto',
                })
                this.zoom1in.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                });
                this.zoom1in.css('display','none');
                this.zoom2.css('display','none');
        }

    }
}