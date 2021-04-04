// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.WrapH = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.WrapH.prototype;
	
	
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

	/////////////////////////////////////
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
	
	
	// <editor-fold defaultstate="collapsed" desc="Behavior Core Methods">
	behinstProto.onCreate = function()
	{
		this.direction = 0;
		
		if (this.properties)
		{
			this.direction = this.properties[0];
		}
		
	};
	
	
	behinstProto.tick = function ()
	{
		var inst = this.inst;
		inst.update_bbox();
		var bbox = inst.bbox;
		var layer = inst.layer;
		
		if (this.direction === 0 || this.direction === 2)
		{			
			if (bbox.right < layer.viewLeft)
			{
				var x = layer.viewRight - 1 + inst.x - bbox.left;

				inst.x = x;
				inst.set_bbox_changed();
			}
			else if (bbox.left > layer.viewRight)
			{
				var x = layer.viewLeft + 1 - (bbox.right - inst.x);

				inst.x = x;
				inst.set_bbox_changed();
			}
		}

		if (this.direction === 1 || this.direction === 2)
		{
			if (bbox.top > layer.viewBottom)
			{
				var y = layer.viewTop + 1 - inst.y + bbox.top;
				
				inst.y = y;
				inst.set_bbox_changed();
			}
			else if (bbox.bottom < layer.viewTop)
			{
				var y = layer.viewBottom - 1 - inst.y + bbox.bottom;

				inst.y = y;
				inst.set_bbox_changed();
			}
		}
		
	};
	
	
	behinstProto.tick2 = function()
	{
	};
	
	
	behinstProto.onDestroy = function ()
	{
	};
	
	
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="JSON Persistence">
	behinstProto.saveToJSON = function ()
	{
		return {
			// Example:
			// "px": this.parallaxX,
			// "py": this.parallaxY,
			
		};
	};
	
	behinstProto.loadFromJSON = function (o)
	{
		// Example:
		// this.parallaxX = o["px"];
		// this.parallaxY = o["py"];
		
	};
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="Editor Debugging">
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	behinstProto.getDebuggerValues = function (propsections)
	{
		propsections.push({
			"title": this.type.name,
			"properties": [
				
				// Example :
				//{"name": "Parallax X", "value": this.parallaxX},
				//{"name": "Parallax Y", "value": this.parallaxY},
				
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		// Example :
		//if      (name === "") this.MyValue1 = value;
		//else if (name === "") this.MyValue2 = value;
		
		
		
	};
	/**END-PREVIEWONLY**/
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="ACE Conditions">
	//////////////////////////////////////
	// Conditions
	function Cnds() {};


	
	behaviorProto.cnds = new Cnds();
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="ACE Actions">
	function Acts() {};


	
	
	behaviorProto.acts = new Acts();
	// </editor-fold>


	// <editor-fold defaultstate="collapsed" desc="ACE Expressions">
	function Exps() {};


	
	behaviorProto.exps = new Exps();
	// </editor-fold>

}());
