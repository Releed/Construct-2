// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.Textbox_Plus = function(runtime) {
	this.runtime = runtime;
};

(function () {
	/////////////////////////////////////
	var behaviorProto = cr.behaviors.Textbox_Plus.prototype;

	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype) {
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};
	
	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function() {};

	/////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.inst = inst;
		this.type = type;
		this.behavior = type.behavior;
		this.runtime = type.runtime;
		/////////////////////////////////////
		this.trigger_once = true;
		this.autoFontSize = 0;
		this.class = "";
	};
	
	var behinstProto = behaviorProto.Instance.prototype;

	behinstProto.onCreate = function() {};

	//////////////////////////////////////
	// Style
	behinstProto.Style = function() {
		var textbox = this.inst;
		//////////////////////////////////////
		this.inst.elem.addEventListener("focus", function (e) {
			setTimeout(function() {
				e.stopPropagation();
				textbox.runtime.trigger(cr.behaviors.Textbox_Plus.prototype.cnds.OnFocus, textbox);
			}, 0);
		}, false);
		//////////////////////////////////////
		this.inst.elem.addEventListener("blur", function (e) {
    		setTimeout(function() {
        		e.stopPropagation();
				textbox.runtime.trigger(cr.behaviors.Textbox_Plus.prototype.cnds.OnBlur, textbox);
    		}, 0);
		}, false);
		//////////////////////////////////////
		this.inst.elem.maxLength = this.properties[14] > 0 ? this.properties[14] : 1000000;
		this.inst.elem.style.textAlign = ["left","center","right"][this.properties[5]];
		this.inst.elem.style.background = this.properties[7] ? this.properties[17] : "none";
		this.inst.elem.style.border = this.properties[8] ? this.properties[18] : "none";
		this.inst.elem.style.textDecoration = ["no","underline","line-through","overline"][this.properties[11]];
		this.inst.elem.style.textTransform = ["no","capitalize","lowercase","uppercase"][this.properties[13]];
		this.inst.elem.style.borderRadius = (this.properties[19]);
		this.inst.elem.style.outline = (this.properties[20]);
		this.inst.elem.style.padding = (this.properties[21]);
		this.inst.elem.style.textShadow = (this.properties[22]);
		this.inst.elem.style.boxShadow = (this.properties[23]);
		//////////////////////////////////////
		// Class
		var loop = this.properties[0].split(" ");
		for (var i = 0; i < loop.length; i++) {
			if (!this.class.match(loop[i]))
				this.class += (this.class.length) ? " "+loop[i] : loop[i];
		};
		this.inst.elem.setAttribute("class", this.class);
		//////////////////////////////////////
		// Color
		var r = (this.properties[4])&0xFF;
		var g = (this.properties[4]>>8)&0xFF;
		var b = (this.properties[4]>>16)&0xFF;
		this.inst.elem.style.color = "rgb("+r+","+g+","+b+")";
		//////////////////////////////////////
		// Selectable
		if(!this.properties[10]) {
			this.inst.elem.disabled = true;
			$(this.inst.elem).css("user-select", "none");
			$(this.inst.elem).css("cursor", "default");
		};
		//////////////////////////////////////
		// Context menu
		if (!this.properties[9]) {
			this.inst.elem.disabled = false;
			$(this.inst.elem).bind("contextmenu", function(event) { event.preventDefault(); return false; });
		};
		//////////////////////////////////////
		// Text restrict
		if(this.properties[12])
			this.inst.elem.setAttribute("onkeypress", "return cr.behaviors.Textbox_Plus.prototype.fncs.OnKey(this, event, "+this.properties[12]+", '"+this.properties[24]+"')");
		//////////////////////////////////////
		// Vertical align
		if(this.inst.elem.type === "textarea") {
			var vertical = [0,2,1.01][this.properties[6]];
			if(vertical) {
				var height = this.inst.elem.offsetHeight;
				this.inst.elem.style.height = 0;
				var padding = Math.max(0, height/vertical - this.inst.elem.scrollHeight/vertical);
				this.inst.elem.style.paddingTop = padding +"px";
				this.inst.elem.style.height = height - padding +"px";
			};
		};
		//////////////////////////////////////
		// Font
		if (this.properties[15])
		{
			var webfont = document.createElement("link");
			webfont.href = this.properties[15];
			webfont.rel = "stylesheet";
			webfont.type = "text/css";
			if (typeof webfont != "undefined") {
				document.getElementsByTagName("head")[0].appendChild(webfont);
				this.inst.elem.style.fontFamily = this.properties[16] || "PlayLive";
			};
		} else {
			this.inst.elem.style.fontFamily = this.properties[2] || "Arial";
			this.inst.elem.style.fontWeight = this.properties[3] == 1 || this.properties[3] == 3 ? "bold" : "none";
			this.inst.elem.style.fontStyle = this.properties[3] > 1 ? "italic" : "none";
		};
		//////////////////////////////////////
		// Auto font size
		switch(this.properties[1]) {
			case 0:
				this.autoFontSize = -1;
				break;
			case 1:
				this.autoFontSize = 0.2;
				break;
			case 2:
				this.autoFontSize = 0.4;
				break;
			case 3:
				this.autoFontSize = 0.1;
				break;
			case 4:
				this.autoFontSize = 0;
				break;
			case 5:
				this.autoFontSize = 0.5;
				break;
		};
		this.updatePosition();
		//////////////////////////////////////
	};
	
	//////////////////////////////////////
	behinstProto.onDestroy = function () {};
	behinstProto.saveToJSON = function () { return {}; };
	behinstProto.loadFromJSON = function (get) {};
	//////////////////////////////////////

	behinstProto.tick = function () {
		var dt = this.runtime.getDt(this.inst);
		/////////////////////////////////////
		if (this.trigger_once) {
			this.trigger_once = false;
			this.Style();
		};
	};

	behinstProto.updatePosition = function () {
		if (this.autoFontSize == 0.5)
			jQuery(this.inst.elem).css("font-size", ((this.inst.layer.getScale(true) / this.runtime.devicePixelRatio) + this.autoFontSize) + "em");
		else if (this.autoFontSize != -1)
			jQuery(this.inst.elem).css("font-size", ((this.inst.layer.getScale(true) / this.runtime.devicePixelRatio) - this.autoFontSize) + "em");
	};

	/////////////////////////////////////
	// Functions
	function Fncs() {};

	Fncs.prototype.OnKey = function (obj, evt, type, dictionary) {
		var key = (evt.which) ? evt.which : evt.keyCode;
		var custom = (dictionary.indexOf(String.fromCharCode(key)) != -1) || (key == 13 && dictionary.indexOf("  ") != -1) ? true : false;
		/////////////////////////////////////
		// Letters
		if(type == 1) {
			if(custom || key > 64 && key < 91 || key > 96 && key < 123)
				return true;
			else
				return false;
		};
		/////////////////////////////////////
	    // Numbers
		if(type == 2) {
		    if(custom || key > 47 && key < 58)
		    	return true;
			else
				return false;
		};
		/////////////////////////////////////
		// Letters and Numbers
		if(type == 3) {
		    if(custom || key > 47 && key < 58 || key > 64 && key < 91 || key > 96 && key < 123)
		    	return true;
			else
				return false;
		};
		/////////////////////////////////////
		// Custom
		if(type == 4) {
			if(custom)
		    	return true;
			else
				return false;
		};
	};

	behaviorProto.fncs = new Fncs();

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.OnFocus = function () {
		return true;
	};
	
	Cnds.prototype.OnBlur = function () {
		return true;
	};
	
	behaviorProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.AddClass = function (class_) {
		if (this.runtime.isDomFree)
			return false;
		/////////////////////////////////////
		var loop = class_.split(" ");
		for (var i = 0; i < loop.length; i++) {
			if (!this.class.match(loop[i]))
				this.class += (this.class.length) ? " "+loop[i] : loop[i];
		};
		/////////////////////////////////////
		this.inst.elem.setAttribute("class", this.class);
	};

	Acts.prototype.RemClass = function (class_) {
		if (this.runtime.isDomFree)
			return false;
		/////////////////////////////////////
		var loop = class_.split(" ");
		for (var i = 0; i < loop.length; i++) {
			this.class = this.class.replace(loop[i], "").replace("  ", " ").trim();
		};
		/////////////////////////////////////
		this.inst.elem.setAttribute("class", this.class);
	};

	Acts.prototype.AppendText = function (text_) {
		if (this.runtime.isDomFree)
			return false;
		/////////////////////////////////////
		this.inst.elem.value += text_;
		this.inst.runtime.trigger(cr.plugins_.TextBox.prototype.cnds.OnTextChanged, this.inst);
	};
/*
	Acts.prototype.ContextMenu = function (enable_) {
		if (this.runtime.isDomFree)
			return false;
		/////////////////////////////////////
		enable_ = (enable_ == 1);
		$(this.inst.elem).bind("contextmenu", function(e) { return enable_; });
	};
*/
	Acts.prototype.Selectable = function (selectable_)
	{
		if (this.runtime.isDomFree)
			return;
		/////////////////////////////////////
		this.inst.elem.disabled = selectable_ ? false : true;
		$(this.frame).css("user-select", selectable_ ? "auto" : "none");
		$(this.frame).css("cursor", selectable_ ? "auto" : "default");
	};

	Acts.prototype.SelectAll = function ()
	{
		if (this.runtime.isDomFree)
			return;
		/////////////////////////////////////
        this.inst.elem.select();
	};

	Acts.prototype.ScrollTop = function ()
	{
		if (this.runtime.isDomFree)
			return;
		/////////////////////////////////////
        this.inst.elem.scrollTop = 0;
	};
	
	Acts.prototype.ScrollBottom = function ()
	{
		if (this.runtime.isDomFree)
			return;
		/////////////////////////////////////
		this.inst.elem.scrollTop = this.elem.scrollHeight;
	};

	Acts.prototype.ScrollTo = function (to_) {
		if (this.runtime.isDomFree)
			return;
		/////////////////////////////////////
		to_ /= 100;
		this.frame.scrollTop = this.frame.scrollHeight;
		this.frame.scrollTop *= to_;
	};

	Acts.prototype.ScrollToPosition = function (to_) {
		if (this.runtime.isDomFree)
			return;
		/////////////////////////////////////
		this.frame.scrollTop = to_;
	};

	behaviorProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.ID = function (ret) {
		ret.set_string(this.inst.elem.id);
	};

	Exps.prototype.Class = function (ret) {
		ret.set_string(this.class);
	};

	Exps.prototype.ScrollHeight = function (ret)
	{
		ret.set_float(this.inst.elem.scrollHeight);
	};
	
	Exps.prototype.ScrollPosition = function (ret)
	{
		ret.set_float(this.inst.elem.scrollTop);
	};

	behaviorProto.exps = new Exps();
	
}());