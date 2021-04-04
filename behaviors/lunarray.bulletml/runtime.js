// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

Math.clip = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
/////////////////////////////////////
// Behavior class
cr.behaviors.lunarray_BulletML_bhv = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var behaviorProto = cr.behaviors.lunarray_BulletML_bhv.prototype;
		
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
    this.MLScript = "";
    this.MLObjs = [];
    this.MLBulletSprite = [];
    this.MLtimer = 0;
    this.MLloop = -1;
    this.sideMargin = 4;
    this.topMargin = 4;
    this.width = 300;
    this.height = 400;
    this.paused = false;
    this.fallback = (this.properties[0] === 0);
	};
	
	behinstProto.onDestroy = function ()
	{
		// called when associated object is being destroyed
		// note runtime may keep the object and behavior alive after this call for recycling;
		// release, recycle or reset any references here as necessary
	};
	
	// called when saving the full state of the game
	behinstProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your behavior's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	behinstProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};

	behinstProto.tick = function ()
	{
  }
  
	behinstProto.initializeObjs = function ()
  {
  }

  behinstProto.tick3 = function()
  {
    //var dt = this.runtime.getDt(this.inst);
    
    if (!this.enemybml) return;
    
    var now = new Date().getTime();
    var prev = this.prev;
    var elapsed = now - prev;
    var timescale = (this.inst.my_timescale === -1) ? this.runtime.timescale:this.inst.my_timescale;

    var w = (16/timescale) - elapsed;
    
    if (w <= 0) { 
      this.MLtimer += 1;
      this.prev = now;
    }

    if (!this.MLpaused) {

      for (var i=0; i < this.MLObjs.length; i++) {
          var o = this.MLObjs[i];
          if (o !== undefined) {
            if (o.alive && !o.paused) {
              if (o.instance !== undefined) {
                if (w <= 0) o.move();
                o.instance.x += (o.x - o.instance.x) * 0.1 * timescale;
                o.instance.y += (o.y - o.instance.y) * 0.1 * timescale;
                o.instance.angle = cr.to_radians(o.d);
                o.instance.set_bbox_changed();
              }
            } 
          }
      }
    
    }

    var len = this.MLObjs.length;
    for(i = 0; i < len; i++ ) {
       if (!this.MLObjs[i].alive) {
         if (this.MLObjs[i].cleanup) this.runtime.DestroyInstance(this.MLObjs[i].instance);
         this.MLObjs[i].instance = undefined;
       } else {
         this.MLObjs.push(this.MLObjs[i]);
       }
    }
    this.MLObjs.splice(0, len);

    if ((len === 1) && (this.MLObjs[0].end)) {
   		this.runtime.trigger(cr.behaviors.lunarray_BulletML_bhv.prototype.cnds.BulletMLOnEnd, this.inst);
    } else {
      if (this.fallback) {
        this.MLloop = -1;
        window.requestAnimationFrame(this.tick3.bind(this));
      } else {
        this.MLloop = setTimeout(this.tick3.bind(this), 1);
      }
    }
  }
	
  
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	behaviorProto.cnds = new Cnds();

	Cnds.prototype.BulletMLOnEnd = function()
  {
    return true;
  }

	Cnds.prototype.BulletMLIsPaused = function()
  {
    return this.MLpaused;
  }

	//////////////////////////////////////
	// Actions
	behaviorProto.acts = {};
	var acts = behaviorProto.acts;

 	acts.LoadBulletML = function (bml_)
	{
    this.MLpaused = true;
    this.MLScript = bml_;
    this.MLBulletSprite = {};

    for (var i=0; i < this.MLObjs.length; i++) {
      var o = this.MLObjs[i];
      o.alive = false;
      o.paused = true;
      if (i > 0) this.runtime.DestroyInstance(o.instance);
      delete this.MLObjs[i];
    }

    this.MLObjs = [];
    this.MLDelayObjs = [];
    this.MLtimer = 0;

    var bml = jQuery.parseXML(bml_);

    if (bml === undefined) return;
    this.bulletml = bml.getElementsByTagName('bulletml')[0];
    if (!this.bulletml) {
        console.log('No <bulletml> in the XML: ' + xmlfile);
        return;
    }
    this.MLpaused = false;
  };

 	acts.RunBML = function (rank_, target_, visual_, layer_, imgpt_)
	{
    if (this.MLloop > -1) {
      clearTimeout(this.MLloop);
      this.MLloop = -1;
    } 
    for (var i=1; i < this.MLObjs.length; i++) {
      var o = this.MLObjs[i];
      o.paused = true;
      this.runtime.DestroyInstance(o.instance);
      delete this.MLObjs[i];
    }
    this.MLObjs.splice(0, 0);
    this.MLObjs = [];

    this.prev = new Date().getTime();
    this.MLtarget = target_;
    this.MLBulletSprite["default"] = visual_; 
    this.MLbulletLayer = layer_; 
    this.MLrunner = new BulletMLRunner(this.bulletml, false);
    this.MLtimer = 0;
    this.MLObjs = [];
    this.enemybml = new Enemy(this.inst, this.MLrunner, this.MLtarget.instances[0], this.inst.x, this.inst.y, 0, 0, true, this, "", rank_, this.MLbulletLayer, imgpt_);
    this.MLObjs.push(this.enemybml);

    this.MLloop = setTimeout(this.tick3.bind(this), 1);
	};


	acts.SetBullet = function (tag_, obj2_)
	{
    this.MLBulletSprite[tag_] = obj2_;
  }

	acts.SetTickMode = function (sel_)
	{
    if (sel_) this.fallback = false;
  }

	acts.SetParam = function (horz_, vert_, width_, height_, offsetX_, offsetY_)
	{
    this.MLtopMargin = vert_;
    this.MLsideMargin = horz_;
    this.MLwidth = width_;
    this.MLheight = height_;
    this.MLoffsetX = offsetX_;
    this.MLoffsetY = offsetY_;
  }

	acts.Pause = function ()
	{
    this.MLpaused = true;
    for (var i=0; i < this.MLObjs.length; i++) {
          var o = this.MLObjs[i];
          if (o !== undefined) {
            o.paused = true;
          }
    }      
  }

	acts.Resume = function (tag_)
	{
      for (var i=0; i < this.MLObjs.length; i++) {
            var o = this.MLObjs[i];
            if (o !== undefined) {
              o.x = o.instance.x;
              o.y = o.instance.y;
              o.paused = false;
            }
      }      
      this.MLpaused = false;
  }

	//////////////////////////////////////
	// Expressions
	function Exps() {};
	behaviorProto.exps = new Exps();
	var exps = behaviorProto.exps;
	
}());