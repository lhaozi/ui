$.extend({
	tabFun:function(headobj,conobj,hdCla,fnType){//tab选项卡切换
		var headA=headobj.children();
		var cons=conobj.children();
		var fnType=fnType||"click";
		headA.bind(fnType,function(){
			var thi=$(this);
			var inds=thi.index();
			thi.addClass(hdCla).siblings().removeClass(hdCla);
			cons.eq(inds).addClass(hdCla).siblings().removeClass(hdCla);
		});
	},
	selectFun:function(obj){//下拉菜单,包含二级，三级菜单
		var th=obj;
		var sel_tit=th.children(".select_tit");
		var select_opt=th.children(".select_opt");
		sel_tit.bind("click",function(e){
			$(".select_opt").css({"display":"none"});
			select_opt.fadeIn(0);
			e.stopPropagation();
		});
		$(document).bind("click",function(){
			select_opt.fadeOut(0);
		});
		select_opt.find("a").bind("click",function(e){
			var thi=$(this);
			var hasclass=thi.hasClass("hasChild") ? true : false ;
			if(!hasclass){
				select_opt.fadeOut(0);
				try{
					if(th.find("input")!="undefined"){
						th.find("input").val($(this).text());
						sel_tit.children("cite").text($(this).text());
					}
				}catch(ev){}
			}
			e.stopPropagation();
		});
		var li=select_opt.find("li");
		li.bind("mouseover",function(){
			var thi=$(this);
			var hasclass=thi.children("a").hasClass("hasChild") ? true : false ;
			var ul=thi.children("ul");
			if(hasclass) ul.addClass("cur");
		});
		li.bind("mouseout",function(){
			var thi=$(this);
			var hasclass=thi.children("a").hasClass("hasChild") ? true : false ;
			var ul=thi.children("ul");
			if(hasclass) ul.removeClass("cur");
		});
	},
	oprateFun:function(obj,classname){//给每条数据加高亮
		obj.bind("mouseover",function(){
			$(this).addClass(classname);
		});
		obj.bind("mouseout",function(e){
				e = window.event || e;
				var s = e.toElement || e.relatedTarget;
				try{
					if(document.all) {
						if (!this.contains(s)) {
							$(this).removeClass(classname);
						}
					} else {
						var reg = this.compareDocumentPosition(s);
						if (!(reg == 20 || reg == 0)) {
							$(this).removeClass(classname);
						}
					}
				}catch(e){console.log(e);};
		});
		
	},
	setStar:function(obj,startag,defcorInd,claname){//手动设置评星
		var a=obj.children(startag);
		var core=obj.children("input");
		var curInd=defcorInd;
		for(var i=0;i<=curInd;i++){
			a.eq(i).addClass(claname);
		}
		a.bind("mouseover",function(){
			var th=$(this);
			var ind=th.index();
			th.siblings().removeClass(claname);
			for(var i=0;i<=ind;i++){
				a.eq(i).addClass(claname);
			}
		});
		a.bind("click",function(){
			var th=$(this);
			var ind=th.index();
			curInd=ind;
			th.siblings().removeClass(claname);
			core.val(curInd+1);
			for(var i=0;i<=ind;i++){
				a.eq(i).addClass(claname);
			}
		});
		a.bind("mouseout",function(){
			var th=$(this);
			var ind=curInd;
			a.removeClass(claname);
			for(var i=0;i<=ind;i++){
				a.eq(i).addClass(claname);
			}
		});
	},
	checkBox:function(obj,type){//复选框
		if(type==1||typeof(type)=="undefined"){//多选
			var check=obj;
			obj.bind("click",function(){
				var th=$(this);
				var ipt=$(this).find("input");
				if(th.hasClass("checked")){
					th.removeClass("checked");
					ipt.attr("checked",false);
				}else{
					th.addClass("checked");
					ipt.attr("checked",true);
				}
			});
		}
	},
	sliderFun:function(obj){//简易焦点图切换
		if(obj.find(".prev").length>0){
			var prev=$(".prev");
			var next=$(".next");
		}else{
			var prev=$('<div class="prev"></div>');
			var next=$('<div class="next"></div>');
			obj.after(next);
			obj.after(prev);
		}
		var objWid=obj.width();
		var ul=obj.children("ul");
		var li=ul.find("li");
		var liLen=li.length;
		var liwid=li.width()+parseInt(li.css("margin-right"))+parseInt(li.css("margin-left"));
		objWid=parseInt(objWid/liwid)*liwid
		ul.width(liLen*liwid);
		var scrWid=parseInt(obj.scrollLeft());
		prev.bind("click",function(){
			obj.stop(false,true);
			scrWid=parseInt(obj.scrollLeft());
			obj.animate({"scrollLeft":scrWid-objWid});
		});
		next.bind("click",function(){
			obj.stop(false,true);
			scrWid=parseInt(obj.scrollLeft());
			obj.animate({"scrollLeft":scrWid+objWid});
		});
	}
});