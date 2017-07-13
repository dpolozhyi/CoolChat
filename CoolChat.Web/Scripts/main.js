document.addEventListener("load", function(event) {
    var hideButton = getHideButton();

	var mq = window.matchMedia( "(max-width: 768px)" )

	var hidden = false;

	var minMode = false;

	mq.addListener(function(changed) {
    	if(changed.matches) {
       		hidden = true;
       		minMode = true;
    	}
    	else{
    		minMode = false;
    	}
	});

	function getHideButton() {
	    return document.getElementById('hide-button');
	}

	function sideBarHover(className){
		console.log(className)
		return className == "chat-list" || className == "hide" || className == "fa fa-arrow-left" ||
			className == "room-list" || className == "show-chat-list" || className == "fa fa-bars";
	}

	function showSideBar(full){
		if(full){
			ext("chat-list").css('marginLeft', '0px');
			ext("chat-list").css('width', '100%');
			ext("chat-area").css('marginLeft', '100%');
			ext("conversation").css('marginLeft', '100%');
    		ext("new-message").css('marginLeft', '100%');
		}
		else{
			ext("chat-list").css('width', '25%');
			ext("chat-list").css('marginLeft', '0px');
    		ext("hide").css('marginLeft', '-50px');
			ext("hide").css('transform', 'translateY(-50%)');
    		ext("chat-area").css('backgroundColor', '#e74c3c');
    		ext("chat-area").css('width', '75%');
    		ext("conversation").css('width', '75%');
    		ext("new-message").css('width', '75%');
		}
	}

	function hideSideBar(){
		ext("chat-list").css('width', '25%');
    	ext("chat-list").css('marginLeft', '-25%');
    	ext("hide").css('marginLeft', '-25%');
		ext("hide").css('transform', 'translateY(-50%) rotate(180deg)');
		ext("hide").css('opacity', '0.5');
    	ext("chat-area").css('width', '100%');
    	ext("chat-area").css('backgroundColor', '#27ae60');
    	ext("conversation").css('width', '100%');
    	ext("new-message").css('width', '100%');
    	ext("chat-area").css('marginLeft', '-4px');
		ext("conversation").css('marginLeft', '0');
    	ext("new-message").css('marginLeft', '0');
	}

	function changeChatListState(minimized){
		if(hidden){
    		showSideBar(minimized);
    		hidden = false;
    	}
    	else{
    		hideSideBar();
    		hidden = true;
    	}
	}

    hideButton.onclick = function(){
    	console.log(document.getElementsByClassName("chat-list"));
    	changeChatListState(false);
    }

    showChatList.onclick = function(){
		changeChatListState(true);
    }

    document.addEventListener("mousemove", function(event) {
    	if(event.clientX < 5 && hidden && !minMode){
    		showSideBar();
    		hidden = false;
    	}
    });

    document.addEventListener("click", function(event) {
    	console.log(event);
    	if(!sideBarHover(event.target.className) && event.clientX > 20 && !minMode){
    		hideSideBar();
    		hidden = true;
    	}
    });
});

function ext(selector) {
	if (!(this instanceof ext)) {
        return new ext(selector);
    }
	this.item = document.getElementsByClassName(selector)[0];
	return this;
}

ext.prototype = {

	item: null,

	css: function(style, value){
		console.log(this);
		if(this.item != null){
			this.item.style[style] = value;
		}
		return this;
	}

}