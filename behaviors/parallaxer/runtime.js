// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.Parallaxer = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.Parallaxer.prototype;
	
	
	// <editor-fold defaultstate="collapsed" desc="SDK init code">
	
	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype)
	{
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};
	
	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function()
	{
	};
	
	///////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.type = type;
		this.behavior = type.behavior;
		this.inst = inst;				// associated object instance to modify
		this.runtime = type.runtime;
	};
	
	var behinstProto = behaviorProto.Instance.prototype;
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="Behavior core methods">
	behinstProto.onCreate = function()
	{
		// setting properties
		this.parallaxX = this.properties[0];
		this.parallaxY = this.properties[1];
		
		this.enabled = (this.properties[2] === 0) ? true : false;
		
		// Anchor coordinates
		this.anchorX = this.inst.x;
		this.anchorY = this.inst.y;
		
		// Position of the object relative to the anchor
		this.anchoredPositionX = 0.0;
		this.anchoredPositionY = 0.0;
		
		this.initLayoutScrollX = this.inst.layer.layout.scrollX;
		this.initLayoutScrollY = this.inst.layer.layout.scrollY;
	};
	
	
	behinstProto.tick = function ()
	{
	};
	
	
	behinstProto.tick2 = function()
	{
		if (this.enabled === false)
		{
			return;
		}
		
		this.updateAnchoredPosition();
		
		this.inst.x = this.anchorX + this.anchoredPositionX;
		this.inst.y = this.anchorY + this.anchoredPositionY;
		
		this.inst.set_bbox_changed();
	};
	
	
	behinstProto.onDestroy = function ()
	{
	};
	// </editor-fold>
	
	
	behinstProto.getViewWidth = function()
	{
		return Math.abs(this.inst.layer.viewRight - this.inst.layer.viewLeft);
	};
	
	
	behinstProto.getViewHeight = function()
	{
		return Math.abs(this.inst.layer.viewTop - this.inst.layer.viewBottom);
	};
	
	
	// <editor-fold defaultstate="collapsed" desc="Utility Methods">
	
	behinstProto.updateAnchoredPosition = function()
	{
		// Updating the Anchored X coordinate
		var scrollX = this.inst.layer.layout.scrollX - this.anchorX;
		
		var parallaxFactorX = Math.abs(1.0 - this.parallaxX/100.0);
		
		if (this.parallaxX > 100)
		{
			parallaxFactorX = -Math.abs(this.parallaxX/100.0);
		}
		
		this.anchoredPositionX = scrollX * parallaxFactorX;
		
		if (this.parallaxX <= 0)
		{
			this.anchoredPositionX =  this.inst.layer.layout.scrollX - this.initLayoutScrollX;
		}
		
		// Updating the Anchored Y coordinate
		var scrollY = this.inst.layer.layout.scrollY - this.anchorY;
		var parallaxFactorY = Math.abs(1.0 - this.parallaxY/100.0);
		
		if (this.parallaxY > 100)
		{
			parallaxFactorY = -Math.abs(this.parallaxY/100.0);
		}
		
		this.anchoredPositionY = scrollY * parallaxFactorY;
		
		if (this.parallaxY <= 0)
		{
			this.anchoredPositionY = this.inst.layer.layout.scrollY - this.initLayoutScrollY;
		}
	};
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="JSON Persistence">
	behinstProto.saveToJSON = function ()
	{
		return {
			"px": this.parallaxX,
			"py": this.parallaxY,
			"e": this.enabled,
			"anchorx": this.anchorX,
			"anchory": this.anchorY
		};
	};
	
	
	behinstProto.loadFromJSON = function (o)
	{
		this.parallaxX = o["px"];
		this.parallaxY = o["py"];
		this.enabled = o["e"];
		this.anchorX = o["anchorx"];
		this.anchorY = o["anchory"];
	};
	// </editor-fold>
	
	
	// // <editor-fold defaultstate="collapsed" desc="Editor Debugging">
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	behinstProto.getDebuggerValues = function (propsections)
	{
		propsections.push({
			"title": this.type.name,
			"properties": [
				{"name": "Parallax X", "value": this.parallaxX},
				{"name": "Parallax Y", "value": this.parallaxY},
				{"name": "AnchorX", "value": this.anchorX},
				{"name": "AnchorY", "value": this.anchorY},
				{"name": "Enabled", "value": this.enabled}
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		if      (name === "Parallax X") this.parallaxX = value;
		else if (name === "Parallax Y") this.parallaxY = value;
		else if (name === "AnchorX")
		{
			this.anchorX = value;
		}
		else if (name === "AnchorY")
		{
			this.anchorY = value;
		}
		else if (name === "Enabled") this.enabled = value;
	};
	/**END-PREVIEWONLY**/
	// </editor-fold>


	// // <editor-fold defaultstate="collapsed" desc="ACE Conditions">
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	
	
	behaviorProto.cnds = new Cnds();
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="ACE Actions">
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.SetParallaxX = function(v)
	{
		this.parallaxX = v;
	};
	
	Acts.prototype.SetParallaxY = function(v)
	{
		this.parallaxY = v;
	};
	
	Acts.prototype.SetAnchorX = function(v)
	{
		this.anchorX = v;
	};
	
	Acts.prototype.SetAnchorY = function(v)
	{
		this.anchorY = v;
	};
	
	Acts.prototype.SetEnabled = function (en)
	{
		this.enabled = (en === 1);
	};
	
	
	behaviorProto.acts = new Acts();
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="ACE Expressions">
	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.ParallaxX = function(ret)
	{
		ret.set_int(this.parallaxX);
	};
	
	Exps.prototype.ParallaxY = function(ret)
	{
		ret.set_int(this.parallaxY);
	};
	
	Exps.prototype.AnchorX = function(ret)
	{
		ret.set_int(this.anchorX);
	};
	
	Exps.prototype.AnchorY = function(ret)
	{
		ret.set_int(this.anchorY);
	};
	
	
	behaviorProto.exps = new Exps();
	// </editor-fold>

}());


