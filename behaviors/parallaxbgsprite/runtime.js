// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.ParallaxBGSprite = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.ParallaxBGSprite.prototype;
	
	
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
		
		this.enabled = (this.properties[2] === 0)?true:false;
		this.onlyWarp = (this.properties[3] === 0)?true:false;
		
		this.spacingX = this.properties[4];
		this.spacingY = this.properties[5];
		
		
		this.wrapX = (this.properties[6] === 0) ? true : false;
		this.wrapY = (this.properties[7] === 0) ? true : false;
		
		
		// Anchor coordinates
		this.anchorX = this.inst.x;
		this.anchorY = this.inst.y;
		
		this.initialized = false;
		
		// Position of the object relative to the anchor
		this.anchoredPositionX = 0.0;
		this.anchoredPositionY = 0.0;
		
		this.initLayoutScrollX = this.inst.layer.layout.scrollX;
		this.initLayoutScrollY = this.inst.layer.layout.scrollY;
		
		//this.tileWidth = this.inst.width;
		//this.tileHeight = this.inst.height;
		
		this.offsetX = 0;
		this.offsetY = 0;
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
		
		
		// Updating tile size
		this.tileWidth = this.getTileWidth();
		this.tileHeight = this.getTileHeight();
		
		
		
		if (this.initialized === false)
		{
			this.resetInstances();
			this.initialized = true;
		}
		
		
		
		// Updating the sprite count
		if (this.inst.get_iid() === 0)
		{
			var currentSpriteCount = this.inst.type.instances.length;
			var computedSpriteCount = this.computeSpriteCount();
			
			if (currentSpriteCount < computedSpriteCount)
			{
				for (var i=0; i<computedSpriteCount - currentSpriteCount; i++)
				{
					this.addNewSprite();
				}
			}
			else if (currentSpriteCount > computedSpriteCount)
			{
				for (var i=0; i<currentSpriteCount - computedSpriteCount; i++)
				{
					this.deleteLastSprite();
				}
			}
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
		var iid = this.inst.get_iid();
		
		
		var spriteOffsetX = iid * this.getTileWidth();
		var spriteOffsetY = iid * this.getTileHeight();
		
		
		if (this.wrapX === true && this.wrapY === false)
		{
			spriteOffsetY = 0;
		}
		else if (this.wrapX === false && this.wrapY === true)
		{
			spriteOffsetX = 0;
		}
		else if (this.wrapX === true && this.wrapY === true)
		{
			var columns = this.computeColumnCount();
			
			//console.log(columns);
			
			spriteOffsetX = Math.floor(iid % columns) * this.getTileWidth();
			spriteOffsetY = Math.floor(iid / columns) * this.getTileHeight();
		}
		else
		{
			// we set the offset to zero but it doesn't matter since only one sprite will exist.
			spriteOffsetX = 0;
			spriteOffsetY = 0;
		}
		
		
		this.inst.x = this.anchorX + this.anchoredPositionX + this.offsetX + spriteOffsetX;
		this.inst.y = this.anchorY + this.anchoredPositionY + this.offsetY + spriteOffsetY;
		
		
		this.inst.set_bbox_changed();
		
		//this.updateBGSprites();
	};
	
	
	behinstProto.onDestroy = function ()
	{
	};
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="Utility Methods">
	///
	/// Returns a behavior instance in an object instance by name.
	///
	function GetBehavior(inst, behaviorName)
	{
		var behaviors = inst.behavior_insts;
		
		for (var i=0; i<behaviors.length; i++)
		{
			if (behaviors[i].type.name === behaviorName)
			{
				return behaviors[i];
			}
		}
		
		//console.log("Can't find behavior " + behaviorName);
		
		return null;
	}
	
	
	behinstProto.getViewWidth = function()
	{
		return Math.abs(this.inst.layer.viewRight - this.inst.layer.viewLeft);
	};
	
	
	behinstProto.getViewHeight = function()
	{
		return Math.abs(this.inst.layer.viewTop - this.inst.layer.viewBottom);
	};
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="Parallax Scrolling Methods">
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
	
	
	// <editor-fold defaultstate="collapsed" desc="Sprite Instances Manipulation">
	behinstProto.resetInstances = function()
	{
		if (this.inst.get_iid() !== 0)
		{
			//console.log("this is the first sprite!");
			return;
		}
		
		
		var instances = this.inst.type.instances;
		var count = instances.length;
		
		// ====================================================
		// Deleting all background sprites of this object type
		// ====================================================	
		for(var i=0; i<count; i++)
		{
			var instance = instances[i];
			
			if (instance.get_iid() > 0)
			{
				this.runtime.DestroyInstance(instance);
			}
		}
		
		// ====================================================
		// Creating background sprite instances
		// ====================================================
		var spriteCount = this.computeSpriteCount();
		
		for (var i=0; i<spriteCount-1; i++)
		{
			this.addNewSprite();
		}
	};
	
	
	behinstProto.getTileWidth = function()
	{
		return this.inst.width + this.spacingX;
	};
	
	
	behinstProto.getTileHeight = function()
	{
		return this.inst.height + this.spacingY;
	};
	
	
	behinstProto.getSpriteWidth = function()
	{
		return this.inst.width + this.spacingX;
	};
	
	
	behinstProto.deleteLastSprite = function()
	{
		var instances = this.inst.type.instances;
		
		if (instances.length >= 2)
		{
			var lastInst = instances[instances.length - 1];
			
			this.runtime.DestroyInstance(lastInst);
		}
	};
	
	
	behinstProto.addNewSprite = function()
	{
		var newSprite = this.runtime.createInstance(this.inst.type, this.inst.layer);
			
		newSprite.y = this.inst.y;
		newSprite.x = this.inst.x;
		
		var parallax = GetBehavior(newSprite, "ParallaxBGSprite");
		
		parallax.parallaxX = this.parallaxX;
		parallax.parallaxY = this.parallaxY;
		
		parallax.spacingX = this.spacingX;
		parallax.spacingY = this.spacingY;
		
		parallax.anchorX = this.anchorX;
		parallax.anchorY = this.anchorY;
		
		parallax.enabled = this.enabled;
		
		parallax.onlyWarp = this.onlyWarp;
		
		parallax.wrapX = this.wrapX;
		parallax.wrapY = this.wrapY;
		
	};
	
	
	behinstProto.computeColumnCount = function()
	{
		var viewWidth = this.getViewWidth();
		var spriteWidth = this.getTileWidth();
		
		if (Math.abs(spriteWidth) <= 0.0001)
		{
			spriteWidth = 1.0;
		}
		
		return Math.ceil(viewWidth / spriteWidth) + 2;
	};
	
	
	///
	/// Returns the number of sprite instances that should exist right now.
	behinstProto.computeSpriteCount = function()
	{
		var viewWidth = this.getViewWidth();
		var viewHeight = this.getViewHeight();
		var spriteWidth = this.getTileWidth();
		var spriteHeight = this.getTileHeight();
		
		if (Math.abs(spriteWidth) <= 0.0001)
		{
			spriteWidth = 1.0;
		}
		
		if (Math.abs(spriteHeight) <= 0.0001)
		{
			spriteHeight = 1.0;
		}
		
		var spriteCountX = Math.ceil(viewWidth / spriteWidth) + 2;
		
		var spriteCountY = Math.ceil(viewHeight / spriteHeight) + 2;
		
		
		
		
		if (this.wrapX === false && this.wrapY === true)
		{
			return spriteCountY + 1;
		}
		else if (this.wrapX === true && this.wrapY === false)
		{
			return spriteCountX + 1;
		}
		else if (this.wrapX === true && this.wrapY === true)
		{
			return spriteCountX * spriteCountY;
		}
		else
		{
			return 1;
		}
	};
	
	
	behinstProto.wrapAroundViewportX = function()
	{
		// variables
		var viewLeft = this.inst.layer.viewLeft;
		var viewRight = this.inst.layer.viewRight;
		var viewWidth = Math.abs(viewRight - viewLeft);
		
		var posX = this.anchoredPositionX + this.anchorX;
		
		var objectWidth = Math.ceil(viewWidth/this.tileWidth + 2) * this.tileWidth;
		
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
	
	
	
	// </editor-fold>
	
		
	// <editor-fold defaultstate="collapsed" desc="JSON Persistence">
	behinstProto.saveToJSON = function ()
	{
		return {
			"px": this.parallaxX,
			"py": this.parallaxY,
			"e": this.enabled,
			//"iy": this.initY,
			"ow": this.onlyWarp,
			"gapx": this.spacingX,
			"gapy": this.spacingY,
			"anchorx": this.anchorX,
			"anchory": this.anchorY
		};
	};
	
	
	behinstProto.loadFromJSON = function (o)
	{
		this.parallaxX = o["px"];
		this.parallaxY = o["py"];
		this.enabled = o["e"];
		//this.initY = o["iy"];
		this.onlyWarp = o["ow"];
		this.spacingX = o["gapx"];
		this.spacingY = o["gapy"];
		this.anchorX = o["anchorx"];
		this.anchorY = o["anchory"];
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
				{"name": "No Scrolling", "value": this.onlyWarp},
				{"name": "Enabled", "value": this.enabled},
				{"name": "Spacing X", "value": this.spacingX},
				{"name": "Spacing Y", "value": this.spacingY},
				{"name": "Anchor X", "value": this.anchorX},
				{"name": "Anchor Y", "value": this.anchorY}
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		if      (name === "Parallax X") this.parallaxX = value;
		else if (name === "Parallax Y") this.parallaxY = value;
		else if (name === "Enabled") this.enabled = value;
		else if (name === "No Scrolling") this.onlyWarp = value;
		else if (name === "Spacing X") this.spacingX = value;
		else if (name === "Spacing Y") this.spacingY = value;
		else if (name === "Anchor X") this.anchorX = value;
		else if (name === "Anchor Y") this.anchorY = value;
	};
	/**END-PREVIEWONLY**/
	// </editor-fold>


	// <editor-fold defaultstate="collapsed" desc="ACE Conditions">
	function Cnds() {};

	
	
	behaviorProto.cnds = new Cnds();
	// </editor-fold>
	
	
	// <editor-fold defaultstate="collapsed" desc="ACE Actions">
	function Acts() {};

	Acts.prototype.ResetY = function()
	{
		//this.resetY();
	};
	
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
	
	
	Acts.prototype.SetOnlyWrap = function(v)
	{
		this.onlyWarp = (v === 1);
	};
	
	Acts.prototype.SetEnabled = function (en)
	{
		this.enabled = (en === 1);
	};
	
	
	Acts.prototype.SetSpacingX = function (v)
	{
		this.spacingX = v;
	};
	
	Acts.prototype.SetSpacingY = function (v)
	{
		this.spacingY = v;
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
	
	
	Exps.prototype.SpacingX = function(ret)
	{
		ret.set_float(this.spacingX);
	};
	
	
	Exps.prototype.SpacingY = function(ret)
	{
		ret.set_float(this.spacingY);
	};
	
	
	behaviorProto.exps = new Exps();
	// </editor-fold>

}());


