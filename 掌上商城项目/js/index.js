/*页面加载完成之后执行*/
window.onload=function(){search();downTime();};
//window.onload=function(){downTime();};
function search(){/*搜索块区的颜色变化*/
/*颜色随着页面的滚动逐渐加深、当我们超过轮播图的时候颜色保持不变*/
	var searchBox=document.querySelector('.hm_header_box');/*获取摸索盒子*/
	var bannerBox=document.querySelector('.hm_banner');/*获取banner盒子*/
	var h=bannerBox.offsetHeight;/*获取高度*/
		window.onscroll=function(){/*监听window的滚动事件，不断获取离顶补的距离*/
			var top=document.body.scrollTop;
			var opacity=0;
			if(top<h){/*颜色随着页面的滚动逐渐加深*/
				opacity=top/h*0.85
			}
			else{/*当我们超过轮播图的时候颜色保持不变*/
				opacity=0.85
			}/*设置透明度*/
			searchBox.style.background="rgba(201,21,35,"+opacity+")";
		}
}
/*轮播图*/
function banner(){
	/*自动滚动、点随之滚动、图片滑动、吸附回去、定位回去等功能*/
	/*获取对象(1)banner*/
	var banner=document.querySelector('.hm_banner');
	/*(2)屏幕宽度*/
	var w=banner.offsetWidth;
	/*(3)图片盒子*/
	var imageBox=banner.querySelector('ul:first-child');
	/*(4)点盒子*/
	var pointBox=banner.querySelector('ul:last-child');
	/*(5)所有的点*/
	var points=pointBox.querySelectorAll('li');
	/*(6)添加过度*/
	var addTransition=function(){
		imageBox.style.webkitTransition="all.2s";/*兼容*/
		imageBox.style.transition="all.2s";
	}
	/*(7)删除过渡*/
	var removeTransition=function(){
		imageBox.style.webkitTransition="none";/*兼容*/
		imageBox.style.transition="none";
	}
	/*(8)改变位子*/
	var setTranslateX=function(translateX){
		imageBox.style.webkitTransform="TranslateX("+TranslateX+"px)";
		imageBox.style.transform="TranslateX("+TranslateX+"px)";
	}
	/*1.自动滚动起来*/
	var index=1;
	var timer=setInterval(function(){index ++;addTransition();setTranslateX(-index*w)},4000);
	itcast.transitionEnd(imageBox,function(){console.log('transitionEnd');
	if(index>=9){
		index=1;
		removeTransition();
		setTranslateX(-index*w);
	}else if(index<=0){index=8;removeTransition();}
	setTranslateX(-index*w);
	setPoint();}
	);
	/*点随之滚动起来*/
	var setPoint=function(){
		for(var i=0;i<points.length;i++){
			points[i].className="";
		}
		points[index-1].className="now";
	}
	/*3图片滑动touch事件*/
		var startX=0;
		var moveX=0;
		var distanceX=0;
		var isMove=false;
		imageBox.addEventListener('touchstart',function(e){
			clearInterval(timer);
			startX=e.touches[0].clientX;
		})
		imageBox.addEventListener('touchstart',function(e){
			isMove=true;
			moveX=e.touches[0].clientX;
			distanceX=moveX-startX;
			console.log(distanceX);
			var currX=-index*w+distanceX;
			removeTransition();
			setTranslateX(currX);
		})
		imageBox.addEventListener('touchend',function(e){
			if(isMove&&(Math.abs(distanceX)>w/3)){
				if(distanceX>0){
					index--;}
					else{
						index++;
					}
					addTransition();
					setTranslateX(-index*w);
				}
				else{
					addTransition();
					setTranslateX(-index*w);
				}
				startX=0;
				moveX=0;
				distanceX=0;
				isMove=false;
				clearInterval(timer);
				timer=setInterval(function(){
					index ++;
					addTransition();setTranslateX(-index*w);
				},4000);
		})
}
function downTime(){
	var time=5*60*60;
	var timer=null;
	var skTime=document.querySelector('.sk_time');
	var spans=skTime.querySelectorAll('span');
	timer=setInterval(function(){
		if(time<=0){
			clearInterval(timer);
			return false;
		}
		time--;
		/*格式化*/
		var h=Math.floor(time/3600);
		var m=Math.floor(time%3600/60);
		var s=time%60;
		console.log(h);
		console.log(m);
		console.log(s);
		spans[0].innerHTML=Math.floor(h/10);
		spans[1].innerHTML=h%10;
		spans[3].innerHTML=Math.floor(m/10);
		spans[4].innerHTML=m%10;
		spans[6].innerHTML=Math.floor(s/10);
		spans[7].innerHTML=s%10;	
	},1000);
}