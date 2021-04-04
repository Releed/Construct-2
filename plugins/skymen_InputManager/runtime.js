// ECMAScript 5 strict mode
"use strict";




assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.SkymenInputManager = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.SkymenInputManager.prototype;
		
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

	instanceProto.onCreate = function()
	{
		this.inputs = {};
this.lastTrigger = "";
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

	
	
	var InstanceFunctionsObject = {}
	for( var k in InstanceFunctionsObject )
	{
		instanceProto[k] = InstanceFunctionsObject[k];
	}


	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	var CndsObject =
	{
IsDown (input) {
  return this.inputs[input];
},
OnDown (input) {
  return this.lastTrigger === input;
},
OnUp (input) {
  return this.lastTrigger === input;
},
AnyUp () {
  return true;
},
AnyDown () {
  return true;
}
	};

	for( var k in CndsObject )
	{
		Cnds.prototype[k] = CndsObject[k];
	}
	
	pluginProto.cnds = new Cnds();


	//////////////////////////////////////
	// Actions
	function Acts() {};

	var ActsObject =
	{
SetUp (input) {
  this.inputs[input] = false;
  this.lastTrigger = input;
  this.runtime.trigger(cr.plugins_.SkymenInputManager.prototype.cnds.OnUp, this);
  this.runtime.trigger(cr.plugins_.SkymenInputManager.prototype.cnds.AnyUp, this);
},
SetDown (input) {
  this.inputs[input] = true;
  this.lastTrigger = input;
  this.runtime.trigger(cr.plugins_.SkymenInputManager.prototype.cnds.OnDown, this);
  this.runtime.trigger(cr.plugins_.SkymenInputManager.prototype.cnds.AnyDown, this);
}
	};

	for( var k in ActsObject )
	{
		Acts.prototype[k] = ActsObject[k];
	}

	
	pluginProto.acts = new Acts();


	//////////////////////////////////////
	// Expressions
	function Exps() {};

	var ExpsObject =
	{
GetLast (ret) {
  ret.set_string(this.lastTrigger)
}
	};

	for( var k in ExpsObject )
	{
		Exps.prototype[k] = ExpsObject[k];
	}
	
	pluginProto.exps = new Exps();

	instanceProto.EXPS = pluginProto.exps;
	instanceProto.CNDS = pluginProto.cnds;
	instanceProto.ACTS = pluginProto.acts;
}());