// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.NimaPlugin = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.NimaPlugin.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
		// Associative array of loaded actors.
		this.actors = [];
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		
		// Nima Data
		this.NimaDataUrl = this.properties[0] || "";
		// The starting animation name to play. 
		this.StartAnim = this.properties[1] || "";
		this.BaseWidth = this.properties[2] || "";
		this.BaseHeight = this.properties[3] || "";
		// Keep track of the currently playing animation. 
		this.CurrentAnimation = null;

		this._Graphics = new Graphics(this.runtime.canvas);

		this._ViewTransform = _mat2d.create();
		this._Graphics.setView(this._ViewTransform);

		this._Actor = null;
		this._ActorInstance = null;

		this._IsPlaying = true;
		this._AnimSpeed = 1.0;

		if ( this.type.actors[this.NimaDataUrl] != null )
		{
			this.setActor(this.type.actors[this.NimaDataUrl]);
		}
		else
		{
			var loader = new ActorLoader();
			var _This = this;
			loader.load(this.NimaDataUrl, function(actor)
			{
				if(!actor || actor.error)
				{
					console.log("Error loading Nima data at url: " + _This.NimaDataUrl);
				}
				else
				{
					_This.type.actors[_This.NimaDataUrl] = actor;
					actor.initialize(_This._Graphics);
					_This.setActor(actor);
				}
			});
		}

	};
	
	instanceProto.setActor = function(actor)
	{
		var actorInstance = actor.makeInstance();
		actorInstance.initialize(this._Graphics);

		this._Actor = actor;
		this._ActorInstance = actorInstance;

		var _This = this;

		this._ActorInstance.addEventListener("animationEvent", function(event)
		{
			_This.CurrAnimEvent = event.name;
			switch(event.name)
			{
				case "_Complete":
					_This.runtime.trigger(cr.plugins_.NimaPlugin.prototype.cnds.OnAnyAnimFinished, _This);
					_This.runtime.trigger(cr.plugins_.NimaPlugin.prototype.cnds.OnAnimFinished, _This);
				break;

				default:
					_This.runtime.trigger(cr.plugins_.NimaPlugin.prototype.cnds.OnAnimEvent, _This);
				break;
			}
		});

		this.CurrentAnimation = actorInstance.getAnimationInstance(this.StartAnim);

		// Make sure the animation has the first frame ready.
		this.CurrentAnimation.advance(0);
		this.CurrentAnimation.apply(this._ActorInstance, 1);
		this._ActorInstance.advance(0);

		this.runtime.tickMe(this);
	}

	instanceProto.tick = function()
	{
		if ( this._IsPlaying )
		{
			var dt = this.runtime.getDt(this) * this._AnimSpeed;

			this.CurrentAnimation.advance(dt);
			this.CurrentAnimation.apply(this._ActorInstance, 1);
			this._ActorInstance._Alpha = this.opacity;
			this._ActorInstance.advance(dt);
		}
		this.runtime.redraw = true;
	}

	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
		if(this._ActorInstance)
		{
			this._ActorInstance.dispose(this._Graphics);
		}
		this.NimaDataUrl = null;
		this.StartAnim = null;
		this.DefaultScale = null;
		this.CurrentAnimation = null;
		this._Actor = null;
		this._ActorInstance = null;
		this._Graphics = null;
		this._ViewTransform = null;
		this._IsPlaying = true;
		this._AnimSpeed = 1.0;
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
		// Sadly don't support Canvas 2D at the moment. ;(
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
		if ( this._ActorInstance != null )
		{
			if (glw.gl !== this.runtime.gl) {
			  console.log("error: gl", glw.gl, this.runtime.gl);
			}

			// suspend glwrap
			var gl = this.runtime.gl;
			glw.endBatch();

			var projection = this._Graphics.projection;
			// var color = instance.extra.render_webgl.color;

			var flip_x = (this.width < 0)?(-1):(1);
			var flip_y = (this.height < 0)?(-1):(1);
			var tx = this.x;
			var ty = this.y;
			var rz = this.angle * flip_x * flip_y;
			var sx = this.width / this.BaseWidth;
			var sy = -this.height / this.BaseHeight;

			_mat4.multiply(projection, glw.matP, glw.matMV);
			_mat4.translate(projection, projection, _vec3.fromValues(tx, ty, 0.0));
			_mat4.rotateZ(projection, projection, rz);
			_mat4.scale(projection, projection, _vec3.fromValues(sx, sy, 1.0));

			// color[3] = instance.opacity;


			// this._Graphics.clear();
			this._ActorInstance.draw(this._Graphics);

			/// resume glwrap

			// the Nima renderer might change this
			glw.lastSrcBlend = gl.ONE;
			glw.lastDestBlend = gl.ONE_MINUS_SRC_ALPHA;
			gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

			// GLBatchJob::doQuad does not bind the element array buffer
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glw.indexBuffer);

			// the Nima renderer changes this
			glw.lastTexture0 = null;
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, null);

			// reload the GLWrap program
			glw.lastProgram = -1;
			glw.switchProgram(0);
		}
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	
// Conditions
	

function Cnds() {};



// For the collision memory in 'On collision'.
	var arrCache = [];
	
	function allocArr()
	{
		if (arrCache.length)
			return arrCache.pop();
		else
			return [0, 0, 0];
	};
	
	function freeArr(a)
	{
		a[0] = 0;
		a[1] = 0;
		a[2] = 0;
		arrCache.push(a);
	};
	
	function makeCollKey(a, b)
	{
		// comma separated string with lowest value first
		if (a < b)
			return "" + a + "," + b;
		else
			return "" + b + "," + a;
	};
	
	function collmemory_add(collmemory, a, b, tickcount)
	{
		var a_uid = a.uid;
		var b_uid = b.uid;

		var key = makeCollKey(a_uid, b_uid);
		
		if (collmemory.hasOwnProperty(key))
		{
			// added already; just update tickcount
			collmemory[key][2] = tickcount;
			return;
		}
		
		var arr = allocArr();
		arr[0] = a_uid;
		arr[1] = b_uid;
		arr[2] = tickcount;
		collmemory[key] = arr;
	};
	
	function collmemory_remove(collmemory, a, b)
	{
		var key = makeCollKey(a.uid, b.uid);
		
		if (collmemory.hasOwnProperty(key))
		{
			freeArr(collmemory[key]);
			delete collmemory[key];
		}
	};
	
	function collmemory_removeInstance(collmemory, inst)
	{
		var uid = inst.uid;
		var p, entry;
		for (p in collmemory)
		{
			if (collmemory.hasOwnProperty(p))
			{
				entry = collmemory[p];
				
				// Referenced in either UID: must be removed
				if (entry[0] === uid || entry[1] === uid)
				{
					freeArr(collmemory[p]);
					delete collmemory[p];
				}
			}
		}
	};
	
	var last_coll_tickcount = -2;
	
	function collmemory_has(collmemory, a, b)
	{
		var key = makeCollKey(a.uid, b.uid);
		
		if (collmemory.hasOwnProperty(key))
		{
			last_coll_tickcount = collmemory[key][2];
			return true;
		}
		else
		{
			last_coll_tickcount = -2;
			return false;
		}
	};
	
	var candidates1 = [];
	
	Cnds.prototype.OnCollision = function (rtype)
	{	
		if (!rtype)
			return false;
			
		var runtime = this.runtime;
			
		// Static condition: perform picking manually.
		// Get the current condition.  This is like the 'is overlapping' condition
		// but with a built in 'trigger once' for the l instances.
		var cnd = runtime.getCurrentCondition();
		var ltype = cnd.type;
		var collmemory = null;
		
		// Create the collision memory, which remembers pairs of collisions that
		// are already overlapping
		if (cnd.extra["collmemory"])
		{
			collmemory = cnd.extra["collmemory"];
		}
		else
		{
			collmemory = {};
			cnd.extra["collmemory"] = collmemory;
		}
		
		// Once per condition, add a destroy callback to remove destroyed instances from collision memory
		// which helps avoid a memory leak. Note the spriteCreatedDestroyCallback property is not saved
		// to savegames, so loading a savegame will still cause a callback to be created, as intended.
		if (!cnd.extra["spriteCreatedDestroyCallback"])
		{
			cnd.extra["spriteCreatedDestroyCallback"] = true;
			
			runtime.addDestroyCallback(function(inst) {
				collmemory_removeInstance(cnd.extra["collmemory"], inst);
			});
		}
		
		// Get the currently active SOLs for both objects involved in the overlap test
		var lsol = ltype.getCurrentSol();
		var rsol = rtype.getCurrentSol();
		var linstances = lsol.getObjects();
		var rinstances;
		
		// Iterate each combination of instances
		var l, linst, r, rinst;
		var curlsol, currsol;
		
		var tickcount = this.runtime.tickcount;
		var lasttickcount = tickcount - 1;
		var exists, run;
		
		var current_event = runtime.getCurrentEventStack().current_event;
		var orblock = current_event.orblock;
		
		// Note: don't cache lengths of linstances or rinstances. They can change if objects get destroyed in the event
		// retriggering.
		for (l = 0; l < linstances.length; l++)
		{
			linst = linstances[l];
			
			if (rsol.select_all)
			{
				linst.update_bbox();
				this.runtime.getCollisionCandidates(linst.layer, rtype, linst.bbox, candidates1);
				rinstances = candidates1;
			}
			else
				rinstances = rsol.getObjects();
			
			for (r = 0; r < rinstances.length; r++)
			{
				rinst = rinstances[r];
				
				if (runtime.testOverlap(linst, rinst) || runtime.checkRegisteredCollision(linst, rinst))
				{
					exists = collmemory_has(collmemory, linst, rinst);
					run = (!exists || (last_coll_tickcount < lasttickcount));
					
					// objects are still touching so update the tickcount
					collmemory_add(collmemory, linst, rinst, tickcount);
					
					if (run)
					{						
						runtime.pushCopySol(current_event.solModifiers);
						curlsol = ltype.getCurrentSol();
						currsol = rtype.getCurrentSol();
						curlsol.select_all = false;
						currsol.select_all = false;
						
						// If ltype === rtype, it's the same object (e.g. Sprite collides with Sprite)
						// In which case, pick both instances
						if (ltype === rtype)
						{
							curlsol.instances.length = 2;	// just use lsol, is same reference as rsol
							curlsol.instances[0] = linst;
							curlsol.instances[1] = rinst;
							ltype.applySolToContainer();
						}
						else
						{
							// Pick each instance in its respective SOL
							curlsol.instances.length = 1;
							currsol.instances.length = 1;
							curlsol.instances[0] = linst;
							currsol.instances[0] = rinst;
							ltype.applySolToContainer();
							rtype.applySolToContainer();
						}
						
						current_event.retrigger();
						runtime.popSol(current_event.solModifiers);
					}
				}
				else
				{
					// Pair not overlapping: ensure any record removed (mainly to save memory)
					collmemory_remove(collmemory, linst, rinst);
				}
			}
			
			cr.clearArray(candidates1);
		}
		
		// We've aleady run the event by now.
		return false;
	};
	
	var rpicktype = null;
	var rtopick = new cr.ObjectSet();
	var needscollisionfinish = false;
	
	var candidates2 = [];
	var temp_bbox = new cr.rect(0, 0, 0, 0);
	
	function DoOverlapCondition(rtype, offx, offy)
	{
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
		
		if (rsol.select_all)
		{
			this.update_bbox();
			
			// Make sure queried box is offset the same as the collision offset so we look in
			// the right cells
			temp_bbox.copy(this.bbox);
			temp_bbox.offset(offx, offy);
			this.runtime.getCollisionCandidates(this.layer, rtype, temp_bbox, candidates2);
			rinstances = candidates2;
		}
		else if (orblock)
		{
			// Normally the instances to process are in the else_instances array. However if a parent normal block
			// already picked from rtype, it will have select_all off, no else_instances, and just some content
			// in 'instances'. Look for this case in the first condition only.
			if (this.runtime.isCurrentConditionFirst() && !rsol.else_instances.length && rsol.instances.length)
				rinstances = rsol.instances;
			else
				rinstances = rsol.else_instances;
		}
		else
		{
			rinstances = rsol.instances;
		}
		
		rpicktype = rtype;
		needscollisionfinish = (ltype !== rtype && !inverted);
		
		if (do_offset)
		{
			oldx = this.x;
			oldy = this.y;
			this.x += offx;
			this.y += offy;
			this.set_bbox_changed();
		}
		
		for (r = 0, lenr = rinstances.length; r < lenr; r++)
		{
			rinst = rinstances[r];
			
			// objects overlap: true for this instance, ensure both are picked
			// (if ltype and rtype are same, e.g. "Sprite overlaps Sprite", don't pick the other instance,
			// it will be picked when it gets iterated to itself)
			if (this.runtime.testOverlap(this, rinst))
			{
				ret = true;
				
				// Inverted condition: just bail out now, don't pick right hand instance -
				// also note we still return true since the condition invert flag makes that false
				if (inverted)
					break;
					
				if (ltype !== rtype)
					rtopick.add(rinst);
			}
		}
		
		if (do_offset)
		{
			this.x = oldx;
			this.y = oldy;
			this.set_bbox_changed();
		}
		
		cr.clearArray(candidates2);
		return ret;
	};
	
	typeProto.finish = function (do_pick)
	{
		if (!needscollisionfinish)
			return;
		
		if (do_pick)
		{
			var orblock = this.runtime.getCurrentEventStack().current_event.orblock;
			var sol = rpicktype.getCurrentSol();
			var topick = rtopick.valuesRef();
			var i, len, inst;
			
			if (sol.select_all)
			{
				// All selected: filter down to just those in topick
				sol.select_all = false;
				cr.clearArray(sol.instances);
			
				for (i = 0, len = topick.length; i < len; ++i)
				{
					sol.instances[i] = topick[i];
				}
				
				// In OR blocks, else_instances must also be filled with objects not in topick
				if (orblock)
				{
					cr.clearArray(sol.else_instances);
					
					for (i = 0, len = rpicktype.instances.length; i < len; ++i)
					{
						inst = rpicktype.instances[i];
						
						if (!rtopick.contains(inst))
							sol.else_instances.push(inst);
					}
				}
			}
			else
			{
				if (orblock)
				{
					var initsize = sol.instances.length;
				
					for (i = 0, len = topick.length; i < len; ++i)
					{
						sol.instances[initsize + i] = topick[i];
						cr.arrayFindRemove(sol.else_instances, topick[i]);
					}
				}
				else
				{
					cr.shallowAssignArray(sol.instances, topick);
				}
			}
			
			rpicktype.applySolToContainer();
		}
		
		rtopick.clear();
		needscollisionfinish = false;
	};
	
	Cnds.prototype.IsOverlapping = function (rtype)
	{
		return DoOverlapCondition.call(this, rtype, 0, 0);
	};
	
	Cnds.prototype.IsOverlappingOffset = function (rtype, offx, offy)
	{
		return DoOverlapCondition.call(this, rtype, offx, offy);
	};

	// the example condition
	
	Cnds.prototype.MyCondition = function (myparam)
	
	{

		// return true if number is positive
		
		return myparam >= 0;
	
	};

	
	Cnds.prototype.IsMirrored = function ()
	{
		return this.width < 0;
	};
	
	Cnds.prototype.IsFlipped = function ()
	{
		return this.height < 0;
	};

	Cnds.prototype.IsCollisionEnabled = function ()
	{
		return this.collisionsEnabled;
	};
	
	Cnds.prototype.IsAnimPlaying = function(animName)
	{
		if ( this.CurrentAnimation == null )
			return false;

		return this.CurrentAnimation._Animation._Name == animName;
	}
	
	Cnds.prototype.OnAnimFinished = function(animName)
	{
		return this.CurrentAnimation._Animation._Name == animName;
	}

	Cnds.prototype.OnAnyAnimFinished = function()
	{
		return true;
	}

	Cnds.prototype.OnAnimEvent = function(eventName)
	{
		return this.CurrAnimEvent == eventName;
	}


// ... other conditions here ...
	
	
pluginProto.cnds = new Cnds();
	
	

//////////////////////////////////////
	
// Actions
	

function Acts() {};


// the example action
	
	Acts.prototype.MyAction = function (myparam)
	
	{

		// alert the message

		alert(myparam);
	
	};


	Acts.prototype.SetMirrored = function (m)
	{
		var neww = cr.abs(this.width) * (m === 0 ? -1 : 1);
		
		if (this.width === neww)
			return;
			
		this.width = neww;
		this.set_bbox_changed();
	};
	
	Acts.prototype.SetFlipped = function (f)
	{
		var newh = cr.abs(this.height) * (f === 0 ? -1 : 1);
		
		if (this.height === newh)
			return;
			
		this.height = newh;
		this.set_bbox_changed();
	};

	Acts.prototype.SetCollisions = function (set_)
	{
		if (this.collisionsEnabled === (set_ !== 0))
			return;		// no change
		
		this.collisionsEnabled = (set_ !== 0);
		
		if (this.collisionsEnabled)
			this.set_bbox_changed();		// needs to be added back to cells
		else
		{
			// remove from any current cells and restore to uninitialised state
			if (this.collcells.right >= this.collcells.left)
				this.type.collision_grid.update(this, this.collcells, null);
			
			this.collcells.set(0, 0, -1, -1);
		}
	};

	Acts.prototype.SetCollisions = function (set_)
	{
		if (this.collisionsEnabled === (set_ !== 0))
			return;		// no change
		
		this.collisionsEnabled = (set_ !== 0);
		
		if (this.collisionsEnabled)
			this.set_bbox_changed();		// needs to be added back to cells
		else
		{
			// remove from any current cells and restore to uninitialised state
			if (this.collcells.right >= this.collcells.left)
				this.type.collision_grid.update(this, this.collcells, null);
			
			this.collcells.set(0, 0, -1, -1);
		}
	};

	Acts.prototype.SetAnim = function(animName, fromChoice, startTime)
	{
		var currTime = this.CurrentAnimation._Time;
		this.CurrentAnimation = this._ActorInstance.getAnimationInstance(animName);

		// Current Time
		if ( fromChoice === 0 )
		{
			this.CurrentAnimation._Time = currTime;
		}
		else
		{
			this.CurrentAnimation._Time = startTime;
		}
	}

	Acts.prototype.StopAnim = function()
	{
		this._IsPlaying = false;
	}

	Acts.prototype.StartAnim = function(from)
	{
		this._IsPlaying = true;

		// Start from beginning
		if ( from === 1 )
		{
			this.CurrentAnimation._Time = this.CurrentAnimation._Min;
		}
	}
	
	Acts.prototype.SetAnimSpeed = function(newSpeed)
	{
		this._AnimSpeed = newSpeed;
	}

// ... other actions here ...
	
	

pluginProto.acts = new Acts();
	
	

//////////////////////////////////////
	
// Expressions
	

function Exps() {};
	
	

// the example expression
	
Exps.prototype.MyExpression = function (ret)	
// 'ret' must always be the first parameter - always return the expression's result through it!
	{

	ret.set_int(1337);
	// return our value

	// ret.set_float(0.5);	
	// for returning floats
	
	// ret.set_string("Hello");
	// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	Exps.prototype.AnimationName = function (ret)	
	{
		ret.set_string(this.CurrentAnimation._Animation._Name);
	}
	
	Exps.prototype.AnimationSpeed = function (ret)	
	{
		ret.set_float(this._AnimSpeed);
	}


	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());