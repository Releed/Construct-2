// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");


/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.SkymenCollisionBox = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.SkymenCollisionBox.prototype;
		
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

	behinstProto.onCreate = function()
	{
		// Load properties
		this.width = this.properties[0];
		this.height = this.properties[1];
		this.xOffset = this.properties[2];
		this.yOffset = this.properties[3];
		this.angle = this.properties[4];
		this.imagePoint = this.properties[5];
		this.visible = this.properties[6] === 0;

		this.box = null;
		
		// object is sealed after this call, so make sure any properties you'll ever need are created, e.g.
		// this.myValue = 0;
	};

	behinstProto.tick = function ()
	{
		if (this.box === null) return

		if (this.width != this.box.width) {
			this.box.width = this.width
			this.box.set_bbox_changed();
		}
		if (this.height != this.box.height) {
			this.box.height = this.height
			this.box.set_bbox_changed();
		}
		if (this.xOffset != this.box.x - this.inst.getImagePoint(this.imagePoint, true)) {
			this.box.x = this.xOffset + this.inst.getImagePoint(this.imagePoint, true)
			this.box.set_bbox_changed();
		}
		if (this.yOffset != this.box.y - this.inst.getImagePoint(this.imagePoint, false)) {
			this.box.y = this.yOffset + this.inst.getImagePoint(this.imagePoint, false)
			this.box.set_bbox_changed();
		}
		if (this.angle != this.box.angle) {
			this.box.angle = this.angle
			this.box.set_bbox_changed();
		}
		if (this.visible != this.box.visible) {
			if (!this.visible !== !this.box.visible) {
				this.box.visible = !!this.visible;
				this.runtime.redraw = true;
			}
		}
		
		// called every tick for you to update this.inst as necessary
		// dt is the amount of time passed since the last tick, in case it's a movement
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	var rpicktype = null;
	var rtopick = new cr.ObjectSet();
	var needscollisionfinish = false;

	var candidates2 = [];
	var temp_bbox = new cr.rect(0, 0, 0, 0);

	function DoOverlapCondition(rtype, offx, offy) {
		if (!rtype)
			return false;

		var do_offset = (offx !== 0 || offy !== 0);
		var oldx, oldy, ret = false, r, lenr, rinst;
		var cnd = this.runtime.getCurrentCondition();
		var ltype = cnd.type;
		var inverted = cnd.inverted;
		var rsol = rtype.getCurrentSol();
		var orblock = this.runtime.getCurrentEventStack().current_event.orblock;
		var rinstances;

		if (rsol.select_all) {
			this.update_bbox();

			// Make sure queried box is offset the same as the collision offset so we look in
			// the right cells
			temp_bbox.copy(this.bbox);
			temp_bbox.offset(offx, offy);
			this.runtime.getCollisionCandidates(this.layer, rtype, temp_bbox, candidates2);
			rinstances = candidates2;
		}
		else if (orblock) {
			// Normally the instances to process are in the else_instances array. However if a parent normal block
			// already picked from rtype, it will have select_all off, no else_instances, and just some content
			// in 'instances'. Look for this case in the first condition only.
			if (this.runtime.isCurrentConditionFirst() && !rsol.else_instances.length && rsol.instances.length)
				rinstances = rsol.instances;
			else
				rinstances = rsol.else_instances;
		}
		else {
			rinstances = rsol.instances;
		}

		rpicktype = rtype;
		needscollisionfinish = (ltype !== rtype && !inverted);

		if (do_offset) {
			oldx = this.x;
			oldy = this.y;
			this.x += offx;
			this.y += offy;
			this.set_bbox_changed();
		}

		for (r = 0, lenr = rinstances.length; r < lenr; r++) {
			rinst = rinstances[r];

			// objects overlap: true for this instance, ensure both are picked
			// (if ltype and rtype are same, e.g. "Sprite overlaps Sprite", don't pick the other instance,
			// it will be picked when it gets iterated to itself)
			if (this.runtime.testOverlap(this, rinst)) {
				ret = true;

				// Inverted condition: just bail out now, don't pick right hand instance -
				// also note we still return true since the condition invert flag makes that false
				if (inverted)
					break;

				if (ltype !== rtype)
					rtopick.add(rinst);
			}
		}

		if (do_offset) {
			this.x = oldx;
			this.y = oldy;
			this.set_bbox_changed();
		}

		cr.clearArray(candidates2);
		return ret;
	};

	Cnds.prototype.IsOverlapping = function (rtype) {
		return this.box != null && DoOverlapCondition.call(this.box, rtype, 0, 0);
	};

	Cnds.prototype.IsOverlappingOffset = function (rtype, offx, offy) {
		return this.box != null && DoOverlapCondition.call(this.box, rtype, offx, offy);
	};
	
	Cnds.prototype.IsVisible = function () {
		return this.visible
	};

	Cnds.prototype.CompareWidth = function (cmp, value) {
		return cr.do_cmp(this.width, cmp, value);
	};

	Cnds.prototype.CompareHeight = function (cmp, value) {
		return cr.do_cmp(this.height, cmp, value);
	};

	Cnds.prototype.CompareXOffset = function (cmp, value) {
		return cr.do_cmp(this.xOffset, cmp, value);
	};

	Cnds.prototype.CompareYOffset = function (cmp, value) {
		return cr.do_cmp(this.yOffset, cmp, value);
	};

	Cnds.prototype.CompareAngle = function (cmp, value) {
		return cr.do_cmp(this.angle, cmp, value);
	};

	Cnds.prototype.CompareImagePoint = function (cmp, value) {
		return cr.do_cmp(this.imagePoint, cmp, value);
	};

	// ... other conditions here ...
	
	behaviorProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action

	Acts.prototype.SetBox = function (type) {
		this.box = this.inst.runtime.createInstance(type, this.inst.layer)
	};

	Acts.prototype.SetImagePoint = function (value) {
		this.omagePoint = value
	};

	Acts.prototype.SetWidth = function (value) {
		this.width = value
	};

	Acts.prototype.SetHeight = function (value) {
		this.height = value
	};

	Acts.prototype.SetAngle = function (value) {
		this.angle = value
	};

	Acts.prototype.SetXOffset = function (value) {
		this.xOffset = value
	};

	Acts.prototype.SetYOffset = function (value) {
		this.yOffset = value
	};
	
	Acts.prototype.SetPositionOffset = function (x, y) {
		this.xOffset = x
		this.yOffset = y
	};
	Acts.prototype.SetSize = function (width, height) {
		this.width = width
		this.height = height
	};

	Acts.prototype.SetVisible = function (visible) {
		this.visible = visible === 0
	};

	// ... other actions here ...
	
	behaviorProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	// the example expression
	Exps.prototype.Width = function (ret) {
		ret.set_float(this.width);
	};
	Exps.prototype.Height = function (ret) {
		ret.set_float(this.height);
	};
	Exps.prototype.XOffset = function (ret) {
		ret.set_float(this.xOffset);
	};
	Exps.prototype.YOffset = function (ret) {
		ret.set_float(this.yOffset);
	};
	Exps.prototype.Angle = function (ret) {
		ret.set_float(this.angle);
	};
	Exps.prototype.ImagePoint = function (ret) {
		ret.set_int(this.imagePoint);
	};
	
	// ... other expressions here ...
	
	behaviorProto.exps = new Exps();
	
}());