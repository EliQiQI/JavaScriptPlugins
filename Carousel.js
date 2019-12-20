class Carousel {
    constructor(w, h, arr,dotsname) {
        this.w = w;
        this.h = h;
        //传入要导入轮播的jq对象数组,必须是克隆过的;
        this.arr = arr;
        //规定轮播小圆点的class
        this.dotsname=dotsname;
    }
    //这个函数必须在创建Carousel类后执行,jq是要把轮播导入的DOM对象
    addFather(jq) {
        let wrap = $('<div></div>');
        wrap.css({
            width: this.w,
            height: this.h,
            position: 'relative',
            overflow: 'hidden',
        });
        wrap.appendTo(jq);
        this.addbtn(wrap);
        this.addKid(this.arr[0], wrap);
        this.addDots(wrap);
        // console.log(wrap);
    }
    addbtn(jq) {
        let lbtn = $('<i></i>');
        lbtn.css({
            width: 24,
            height: 60,
            position: 'absolute',
            background: 'url("../images/index.png") no-repeat -561px -117px',
            top: '50%',
            left: 0,
            transform: 'translate(0,-50%)',
            zIndex: 100,
        });
        let rbtn = $('<i></i>');
        rbtn.css({
            width: 24,
            height: 60,
            position: 'absolute',
            background: 'url("../images/index.png") no-repeat -599px -117px',
            top: '50%',
            right: '0',
            transform: 'translate(0,-50%)',
            zIndex: 100,
        });
        lbtn.appendTo(jq);
        rbtn.appendTo(jq);
        lbtn.on('click', e => {
            this.moveFunction(e)
        });
        rbtn.on('click', e => {
            this.moveFunction(e)
        });
    }
    addKid(target, jq) {
        let inner = $('<div></div>');
        inner.css({
            width: this.w,
            height: this.h,
            background: 'transparent',
            position: 'absolute',
        });
        $(target).appendTo(inner);
        inner.appendTo(jq);
    }
    addDots(jq) {
        let ul = $('<ul></ul>');
        ul.attr('class', this.dotsname);
        ul.css({
            height: 20,
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translate(-50%)',
            zIndex: 100,
        });
        //
        for (let i = 0; i < this.arr.length; i++) {
            let span = $('<li></li>');

            span.css({
                width: 20,
                height: 20,
                marginRight: 20,
                float: 'left',
                borderRadius: '50%',
                border: '1px solid'
            });
            if (i === 0) {
                span.css('background', 'red');
            }
            span.appendTo(ul);
        }

        //
        ul.appendTo(jq);
        ul.on('click', e => {
            this.moveFunction(e)
        })
    }



    judgeWhiteDots(){
        for (let i = 0; i < this.arr.length; i++) {
            let style = getComputedStyle($(('ul.'+this.dotsname)).children().get(i), null);
            if(style.backgroundColor==='rgb(255, 0, 0)'){
                return i;
            }
        }
    }
    changeColor(index){
        for (let i = 0; i < this.arr.length; i++) {
            if (i === index) {
                $(('ul.'+this.dotsname)).children().get(i).style.background = 'red';
            } else {
                $(('ul.'+this.dotsname)).children().get(i).style.background = 'transparent';
            }
        }
        return index;
    }

    changeLocation(oldl,newl){
        //添加一个新div并且绝对定位
        //  
        if((oldl==this.arr.length-1&&newl==0) || oldl<newl){
            //就在右侧添加一个新的div,位置是right:-一倍的宽度
            let div=$('<div></div>');
            div.css({
                width:this.w,
                height:this.h,
                right:-this.w,
                position:'absolute',
            });
            $(this.arr[newl]).appendTo(div);
            div.appendTo($($('ul.'+this.dotsname).get(0).parentElement.children[2]));
            //整体外层的left+一倍的宽度 这里应用的是动画
            $($('ul.'+this.dotsname).get(0).parentElement.children[2]).animate({
                left:'-='+this.w+'px',
            },'slow',function(){
                $(this.children[0]).remove();
                $(this.children[0]).css('right','0');
                $(this).css('left',0);
            });
            

        }else if(oldl>newl){
            //就在左侧添加一个新的div 位置是left:-一倍的宽度
            // this.arr[newl].style.left=-this.width+'px';
            //整体外层的left-一倍的宽度

            let div=$('<div></div>');
            div.css({
                width:this.w,
                height:this.h,
                left:-this.w,
                position:'absolute',

            });
            $(this.arr[newl]).appendTo(div);
            div.prependTo($($('ul.'+this.dotsname).get(0).parentElement.children[2]));
            // this.arr[newl].style.right=-this.width+'px';

            //整体外层的left+一倍的宽度 这里应用的是动画
            $($('ul.'+this.dotsname).get(0).parentElement.children[2]).animate({
                left:'+='+this.w+'px',
            },'slow',function(){
                $(this.children[1]).remove();
                $(this.children[0]).css('left','0');
                $(this).css('left',0);
            });
            

            
        }

    }


    moveFunction(e) {

        if (e.target.nodeName === 'UL') return;

        switch (e.target.nodeName) {
            case 'I':
                //判断左右并且向左转
                if (e.target.style.left === '0px') {
                    console.log('这是向后添加内容');
                    let index=this.judgeWhiteDots();
                    let oindex=this.judgeWhiteDots();
                    if(index===0){
                        index=this.arr.length-1;
                    }else{
                        index--;
                    }
                    
                    let nindex=this.changeColor(index);
                    this.changeLocation(oindex,nindex);
                    
                } else {
                    let index=this.judgeWhiteDots();
                    let oindex=this.judgeWhiteDots();
                    if(index===this.arr.length-1){index=0}else{
                        index++;
                    };
                    let nindex=this.changeColor(index);
                    this.changeLocation(oindex,nindex);
                }
                break;
            case 'LI':
                let oindex=this.judgeWhiteDots();
                let index = Array.from(e.target.parentElement.children).indexOf(e.target);
                //指示第几个变颜色
                let nindex=this.changeColor(index);
                this.changeLocation(oindex,nindex);

        }
    }
}