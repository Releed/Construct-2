// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.ParallaxBG = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.ParallaxBG.prototype;
	
	
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
		// setting properties
		this.parallaxX = this.properties[0];
		this.parallaxY = this.properties[1];
		
		this.enabled = (this.properties[2] === 0) ? true :false;
		this.onlyWarp = (this.properties[3] === 0) ? true : false;
		
		
		this.wrapX = (this.properties[4] === 0) ? true : false;
		this.wrapY = (this.properties[5] === 0) ? true : false;
		
		
		// Anchor coordinates
		this.anchorX = this.inst.x;
		this.anchorY = this.inst.y;
		
		// Position of the object relative to the anchor
		this.anchoredPositionX = 0.0;
		this.anchoredPositionY = 0.0;
		
		this.tileWidth = this.inst.width;
		this.tileHeight = this.inst.height;
		
		
		this.offsetX = 0;
		this.offsetY = 0;
		
		
		this.initLayoutScrollX = this.inst.layer.layout.scrollX;
		this.initLayoutScrollY = this.inst.layer.layout.scrollY;
		
		
		// Initializing tile size to texture size for TiledBackground objects
		this.initTileWidth = true;
		this.initTileHeight = true;
	};
	
	
	
	
	behinstProto.tick = function ()
	{
		var isTiledBG = (typeof this.inst.texture_img === "undefined") ? false : true;
		
		
		if (this.initTileWidth === true)
		{
			this.initTileWidth = false;
			
			
			if (isTiledBG === true)
			{
				this.tileWidth = this.inst.texture_img.width;
			}
		}
		
		
		if (this.initTileHeight === true)
		{
			this.initTileHeight = false;
			
			if (isTiledBG === true)
			{
				this.tileHeight = this.inst.texture_img.height;
			}
		}
		
		
	};
	
	
	behinstProto.tick2 = function()
	{
		if (this.enabled === false)
		{
			return;
		}
		
		
		this.updateAnchoredPosition();
		
		// Cancelling anchored position when scrolling is disabled
		if (this.onlyWarp === true) 
		{
			this.anchoredPositionX = 0;
			this.anchoredPositionY = 0;
		}
		
		
		// wrapping Horizontally
		if (this.wrapX === true)
		{
			this.wrapAroundViewportX();
		}
		else if (this.wrapX === false)
		{
			this.offsetX = 0;
		}
		
		
		// wrapping vertically
		if (this.wrapY === true)
		{
			this.wrapAroundViewportY();
		}
		else if (this.wrapY === false)
		{
			this.offsetY = 0;
		}
		
		
		// Positionning the object
		this.inst.x = this.anchorX + this.anchoredPositionX + this.offsetX;
		this.inst.y = this.anchorY + this.anchoredPositionY + this.offsetY;
		
		this.inst.set_bbox_changed();
		
	};
	
	
	behinstProto.onDestroy = function ()
	{
	};
	
	
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="Utility Methods">
	
	behinstProto.getViewWidth = function()
	{
		return Math.abs(this.inst.layer.viewRight - this.inst.layer.viewLeft);
	};
	
	
	behinstProto.getViewHeight = function()
	{
		return Math.abs(this.inst.layer.viewTop - this.inst.layer.viewBottom);
	};
	
	
	behinstProto.wrapAroundViewportX = function()
	{
		// variables
		var viewLeft = this.inst.layer.viewLeft;
		var viewRight = this.inst.layer.viewRight;
		var viewWidth = Math.abs(viewRight - viewLeft);
		
		var posX = this.anchoredPositionX + this.anchorX;
		
		var objectWidth = Math.ceil(viewWidth/this.tileWidth + 2) * this.tileWidth;
		
		
		// Setting the object width
		this.inst.width = objectWidth;
		
		
		// Computing the offset
		this.offsetX = 0;
		
		while (posX + this.offsetX + this.tileWidth > viewLeft)
		{
			this.offsetX -= this.tileWidth;
		}
		
		while (posX + this.offsetX + objectWidth - this.tileWidth < viewRight)
		{
			this.offsetX += this.tileWidth;
		}
	};
	
	
	behinstProto.wrapAroundViewportY = function()
	{
		// variables
		var viewTop = this.inst.layer.viewTop;
		var viewBot = this.inst.layer.viewBottom;
		var viewHeight = Math.abs(viewBot - viewTop);
		
		var posY = this.anchoredPositionY + this.anchorY;
		
		var objectHeight = Math.ceil(viewHeight/this.tileHeight + 2) * this.tileHeight;
		
		
		// Setting the object height
		this.inst.height = objectHeight;
		
		
		// Computing the offset
		this.offsetY = 0;
		
		while (posY + this.offsetY + this.tileHeight > viewTop)
		{
			this.offsetY -= this.tileHeight;
		}
		
		while (posY + this.offsetY + objectHeight - this.tileHeight < viewBot)
		{
			this.offsetY += this.tileHeight;
		}
	};
	
	
	behinstProto.getLayoutScrollX = function()
	{
		return this.inst.layer.layout.scrollX; //- this.getViewWidth()/2;
	};
	
	
	behinstProto.getLayoutScrollY = function()
	{
		return this.inst.layer.layout.scrollY; //- this.getViewHeight()/2;
	};
	
	
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
			"tw": this.tileWidth,
			"th": this.tileHeight,
			"anchorx": this.anchorX,
			"anchory": this.anchorY,
			"iy": this.initY, // Deprecated, left here for backward compat
			"ow": this.onlyWarp
		};
	};
	
	behinstProto.loadFromJSON = function (o)
	{
		this.parallaxX = o["px"];
		this.parallaxY = o["py"];
		this.enabled = o["e"];
		this.tileWidth = o["tw"];
		this.tileHeight = o["th"];
		this.anchorX = o["anchorx"];
		this.anchorY = o["anchory"];
		this.initY = o["iy"]; // Deprecated, left here for backward compat
		this.onlyWarp = o["ow"];
		
		// we make sure to not initialize the tile size, since it was just loaded from storage.
		//this.tileSizeInit = true;
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
				{"name": "Parallax X", "value": this.parallaxX},
				{"name": "Parallax Y", "value": this.parallaxY},
				
				{"name": "Tile Width", "value": this.tileWidth},
				{"name": "Tile Height", "value": this.tileHeight},
				
				{"name": "AnchorX", "value": this.anchorX},
				{"name": "AnchorY", "value": this.anchorY},
				
				{"name": "No Scrolling", "value": this.onlyWarp},
				{"name": "Enabled", "value": this.enabled}
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		if      (name === "Parallax X") this.parallaxX = value;
		else if (name === "Parallax Y") this.parallaxY = value;
		
		else if (name === "Tile Width") this.tileWidth = value;
		else if (name === "Tile Height") this.tileHeight = value;
		
		else if (name === "AnchorX") this.anchorX = value;
		else if (name === "AnchorY") this.anchorY = value;
		
		else if (name === "Enabled") this.enabled = value;
		else if (name === "No Scrolling") this.onlyWarp = value;
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

	Acts.prototype.ResetY = function()
	{
		// DEPRECATED
	};
	
	
	Acts.prototype.SetTileWidth = function(v)
	{
		this.tileWidth = v;
		this.initTileWidth = false;
		this.inst.width = this.tileWidth;
	};
	
	Acts.prototype.SetTileHeight = function(v)
	{
		this.tileHeight = v;
		this.initTileHeight = false;
		this.inst.height = this.tileHeight;
	};
	
	
	Acts.prototype.SetAnchorX = function(v)
	{
		this.anchorX = v;
	};
	
	Acts.prototype.SetAnchorY = function(v)
	{
		this.anchorY = v;
	};
	
	
	Acts.prototype.SetParallaxX = function(v)
	{
		this.parallaxX = v;
	};
	
	Acts.prototype.SetParallaxY = function(v)
	{
		this.parallaxY = v;
	};
	
	
	Acts.prototype.SetOnlyWrap = function(v)
	{
		this.onlyWarp = (v === 1);
	};
	
	Acts.prototype.SetEnabled = function (en)
	{
		this.enabled = (en === 1);
	};
	
	
	behaviorProto.acts = new Acts();
	// </editor-fold>


	// <editor-fold defaultstate="collapsed" desc="ACE Expressions">
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
	
	
	Exps.prototype.TileWidth = function(ret)
	{
		ret.set_int(this.tileWidth);
	};
	
	Exps.prototype.TileHeight = function(ret)
	{
		ret.set_int(this.tileHeight);
	};
	
	
	behaviorProto.exps = new Exps();
	// </editor-fold>

}());
