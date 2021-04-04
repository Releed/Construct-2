function GetPluginSettings()
{
	return {
		"name":			"Nima",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"NimaPlugin",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Create a Nima animation object.",
		"author":		"Quinn Hoener",
		"help url":		"https://www.scirra.com/manual/106/plugin-reference",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"world",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	true,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
						| pf_position_aces		// compare/set/get x, y...
						| pf_size_aces			// compare/set/get width, height...
						| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
						| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
						| pf_animations			// enables the animations system.  See 'Sprite' for usage
						| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					// 	| pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

var cnd_id = 0;		

// example				
AddObjectParam("Object", "Select the object to test for a collision with.");
AddCondition(cnd_id++, cf_fake_trigger | cf_static, "On collision with another object", "Collisions", "On collision with {0}", "Triggered when the object collides with another object.", "OnCollision");

AddObjectParam("Object", "Select the object to test for overlap with.");
AddCondition(cnd_id++, 0, "Is overlapping another object", "Collisions", "Is overlapping {0}", "Test if the object is overlapping another object.", "IsOverlapping");

AddAnimationParam("Animation", "Enter the name of the animation to check if playing.")
AddCondition(cnd_id++, 0, "Is playing", "Animations", "Is animation {0} playing", "Test which of the object's animations is currently playing.", "IsAnimPlaying");

// AddCmpParam("Comparison", "How to compare the current animation frame number (0-based).");
// AddNumberParam("Number", "The animation frame number to compare to (0-based).");
// AddCondition(cnd_id++, 0, "Compare frame", "Animations", "Animation frame {0} {1}", "Test which animation frame is currently showing.", "CompareFrame");

AddAnimationParam("Animation", "Enter the name of the animation that has finished.")
AddCondition(cnd_id++, cf_trigger, "On finished", "Animations", "On animation {0} finished", "Triggered when an animation has finished.", "OnAnimFinished");

// AddAnimationParam("Animation", "Enter the name of the animation that has looped.")
// AddCondition(cnd_id++, cf_trigger, "On looped", "Animations", "On animation {0} looped", "Triggered when an animation has looped.", "OnAnimLooped");

AddCondition(cnd_id++, cf_trigger, "On any finished", "Animations", "On any animation finished", "Triggered when any animation has finished.", "OnAnyAnimFinished");

AddAnimationParam("Animation", "Enter the Nima animation event to listen for.")
AddCondition(cnd_id++, cf_trigger, "On animation event", "Animations", "On animation event triggered", "Triggered when a custom animation event has triggered.", "OnAnimEvent");

// AddCondition(cnd_id++, cf_trigger, "On frame changed", "Animations", "On frame changed", "Triggered when the current animation frame changes.", "OnFrameChanged");

AddCondition(cnd_id++, 0, "Is mirrored", "Appearance", "Is mirrored", "True if the object has been mirrored with the 'Set Mirrored' action.", "IsMirrored");
AddCondition(cnd_id++, 0, "Is flipped", "Appearance", "Is flipped", "True if the object has been flipped with the 'Set Flipped' action.", "IsFlipped");

AddObjectParam("Object", "Select the object to test for overlap with.");
AddNumberParam("Offset X", "The amount to offset the X co-ordinate (in pixels) before checking for a collision.");
AddNumberParam("Offset Y", "The amount to offset the Y co-ordinate (in pixels) before checking for a collision.");
AddCondition(cnd_id++, 0, "Is overlapping at offset", "Collisions", "Is overlapping {0} at offset (<i>{1}</i>, <i>{2}</i>)", "Test if the object is overlapping another object at an offset position.", "IsOverlappingOffset");

AddCondition(cnd_id++, cf_trigger, "On image URL loaded", "Web", "On image URL loaded", "Triggered after 'Load image from URL' when the image has finished loading.", "OnURLLoaded");

AddCondition(cnd_id++, 0, "Collisions enabled", "Collisions", "Collisions enabled", "True if the object's collisions are enabled and will fire collision events.", "IsCollisionEnabled");

AddCmpParam("Comparison", "How to compare the current animation speed.");
AddNumberParam("Number", "The animation speed to compare to.");
AddCondition(cnd_id++, 0, "Compare speed", "Animations", "Animation speed {0} {1}", "Compare the current animation speed.", "CompareAnimSpeed");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

var act_id = 0;

// example
AddObjectParam("Object", "Choose the object type of the new instance to create.");
AddLayerParam("Layer", "The layer name or number to create the instance on.");
AddAnyTypeParam("Image point", "Use 0 for the object's origin, or the name or number of an image point to spawn the object from.", "0");
AddAction(act_id++, 0, "Spawn another object", "Misc", "Spawn {0} on layer <b>{1}</b> <i>(image point {2})</i>", "Create another object at this object.", "Spawn");

// AddComboParamOption("Normal");
// AddComboParamOption("Additive");
// AddComboParamOption("XOR");
// AddComboParamOption("Copy");
// AddComboParamOption("Destination over");
// AddComboParamOption("Source in");
// AddComboParamOption("Destination in");
// AddComboParamOption("Source out");
// AddComboParamOption("Destination out");
// AddComboParamOption("Source atop");
// AddComboParamOption("Destination atop");
// AddComboParam("Blend mode", "Choose the new blend mode for this object.");
// AddAction(act_id++, 0, "Set blend mode", "Appearance", "Set blend mode to <i>{0}</i>", "Set the background blend mode for this object.", "SetEffect");

AddAction(act_id++, 0, "Stop",		"Animations",	"Stop animation",	"Stop the current animation from playing.", "StopAnim");

AddComboParamOption("current time");
AddComboParamOption("beginning");
AddComboParam("From", "Choose whether to resume or rewind the animation back to the first frame.");
AddAction(act_id++, 0, "Start",	"Animations",	"Start animation from {0}",	"Start the current animation, if it was stopped.", "StartAnim");

AddAnimationParam("Animation", "The name of the animation to set.");
AddComboParamOption("current time");
AddComboParamOption("at time");
AddComboParam("From", "Choose whether to play from the same time or set the time to start the animation at.", 1);
AddNumberParam("Start time", "The animation time to start at.");
AddAction(act_id++, 0, "Set animation", "Animations", "Set animation to <b>{0}</b> (play from {1})", "Set the current animation", "SetAnim");

// AddNumberParam("Frame number", "The animation frame number to set (0-based).");
// AddAction(act_id++, 0, "Set frame", "Animations", "Set animation frame to <b>{0}</b>", "Set the current animation frame number.", "SetAnimFrame");

AddNumberParam("Speed", "The new animation speed, in animation frames per second.");
AddAction(act_id++, 0, "Set speed", "Animations", "Set animation speed to <b>{0}</b>", "Set the current animation speed.", "SetAnimSpeed");

AddComboParamOption("Mirrored");
AddComboParamOption("Not mirrored");
AddComboParam("State", "Choose whether to horizontally mirror the object or set it back to normal.");
AddAction(act_id++, 0, "Set mirrored", "Appearance", "Set <b>{0}</b>", "Set the object horizontally mirrored or back to normal.", "SetMirrored");

AddComboParamOption("Flipped");
AddComboParamOption("Not flipped");
AddComboParam("State", "Choose whether to vertically flip the object or set it back to normal.");
AddAction(act_id++, 0, "Set flipped", "Appearance", "Set <b>{0}</b>", "Set the object vertically flipped or back to normal.", "SetFlipped");

// AddNumberParam("Scale", "The object width and height to set, based on a multiple of its original dimensions, e.g. 1 = original size, 2 = double size, 0.5 = half size etc.", "1");
// AddAction(act_id++, 0, "Set scale", "Size & Position", "Set scale to <i>{0}</i>", "Set the width and height as a multiple of its original size.", "SetScale");

// AddStringParam("URI", "Enter the URL on the web, or data URI, of an image to load.", "\"http://\"");
// AddComboParamOption("Resize to image size");
// AddComboParamOption("Keep current size");
// AddComboParam("Size", "Whether to resize the sprite to the size of the loaded image, or stretch it to the current size.");
// AddComboParamOption("anonymous");
// AddComboParamOption("none");
// AddComboParam("Cross-origin", "The cross-origin (CORS) mode to use for the request.");
// AddAction(act_id++, 0, "Load image from URL", "Web", "Load image from <i>{0}</i> ({1}, cross-origin {2})", "Replace the currently displaying animation frame with an image loaded from a web address or data URI.", "LoadURL");

AddComboParamOption("Disabled");
AddComboParamOption("Enabled");
AddComboParam("Collisions", "Whether to enable or disable collisions for this object.");
AddAction(act_id++, 0, "Set collisions enabled", "Misc", "Set collisions <b>{0}</b>", "Set whether the object will register collision events or not.", "SetCollisions");

// AddNumberParam("Frame number", "The animation frame number to repeat to (0-based).");
// AddAction(act_id++, 0, "Set repeat-to frame", "Animations", "Set repeat-to frame to <b>{0}</b>", "Set the animation frame number to repeat to in a looping animation.", "SetAnimRepeatToFrame");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

var exp_id = 0;

// example
// AddExpression(exp_id++, ef_return_number, "Get animation frame", "Animations", "AnimationFrame", "The current animation frame number (0-based).");

// AddExpression(exp_id++, ef_return_number, "Get animation frame count", "Animations", "AnimationFrameCount", "The number of animation frames in the current animation.");

AddExpression(exp_id++, ef_return_string, "Get animation name", "Animations", "AnimationName", "The name of the current animation.");

AddExpression(exp_id++, ef_return_number, "Get animation speed", "Animations", "AnimationSpeed", "The speed of the current animation, in animation frames per second.");

// AddAnyTypeParam("ImagePoint", "Name or number of image point to get.");
// AddExpression(exp_id++, ef_return_number, "Get image point X",		"Size & Position",	"ImagePointX", "The X position of one of the object's image points.");

// AddAnyTypeParam("ImagePoint", "Name or number of image point to get.");
// AddExpression(exp_id++, ef_return_number, "Get image point Y",		"Size & Position",	"ImagePointY", "The Y position of one of the object's image points.");

// AddExpression(exp_id++, ef_return_number, "Get image width", "Animations", "ImageWidth", "The width of the current animation frame image, in pixels.");
// AddExpression(exp_id++, ef_return_number, "Get image height", "Animations", "ImageHeight", "The height of the current animation frame image, in pixels.");

// AddExpression(exp_id++, ef_return_number, "", "Size & Position", "ImagePointCount", "The number of image points the current frame has.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
		new cr.Property(ept_text, "Nima Data URL", "", "Nima data file from export."),
		new cr.Property(ept_text, "Start Anim", "", "Animation to play on start."),
		new cr.Property(ept_integer, "Base Width", 100, "Default view width of the Nima animation."),
		new cr.Property(ept_integer, "Base Height", 100, "Default view height of the Nima animation.")
	]
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
  assert2(this instanceof arguments.callee, "Constructor called as a function");

  // Save the constructor parameters
  this.instance = instance;
  this.type = type;

  // Set the default property values from the property table
  this.properties = {};

  for (var i = 0; i < property_list.length; i++)
    this.properties[property_list[i].name] = property_list[i].initial_value;

  // Plugin-specific variables
  // this.myValue = 0...
  this.just_inserted = false;
  this.texture_loaded = false;
  this.last_imgsize = new cr.vector2(0, 0);
  this.last_texture = null;
  this.last_texture_id = "";
}

IDEInstance.prototype.OnAfterLoad = function () {
  // Must initialise last_imgsize for correct updating of sprites on layouts without a tab open
  var texture = this.instance.GetTexture(this.properties["Initial frame"], this.properties["Initial animation"]);
  this.last_imgsize = texture.GetImageSize();
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function() {
  this.just_inserted = true;
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function() {
  this.instance.EditTexture();
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name) {
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer) {
  this.last_texture = this.instance.GetTexture(this.properties["Initial frame"], this.properties["Initial animation"]);
  this.last_texture_id = this.last_texture.GetID();

  renderer.LoadTexture(this.last_texture);
  this.texture_loaded = true;

  this.instance.SetHotspot(this.last_texture.GetHotspot());
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer) {
  var texture = this.instance.GetTexture(this.properties["Initial frame"], this.properties["Initial animation"]);
  var texture_id = texture.GetID();

  if (this.last_texture_id !== "" && this.last_texture_id !== texture_id) {
    // Texture has changed: unload old and reload new.
    if (this.last_texture)
      renderer.ReleaseTexture(this.last_texture);

    renderer.LoadTexture(texture);
    this.instance.SetHotspot(texture.GetHotspot());
  }

  this.last_texture = texture;
  this.last_texture_id = texture_id;

  renderer.SetTexture(texture);

  var imgsize = texture.GetImageSize();

  // First draw after insert: use size of texture.
  // Done after SetTexture so the file is loaded and dimensions known, preventing
  // the file being loaded twice.
  if (this.just_inserted) {
    this.just_inserted = false;
    this.instance.SetSize(imgsize);

    RefreshPropertyGrid();    // show new size
  }
  // If not just inserted and the sprite texture has been edited and changed size, scale the texture accordingly.
  else if ((imgsize.x !== this.last_imgsize.x || imgsize.y !== this.last_imgsize.y)
    && (this.last_imgsize.x !== 0 && this.last_imgsize.y !== 0)) {
    var sz = new cr.vector2(imgsize.x / this.last_imgsize.x, imgsize.y / this.last_imgsize.y);
    var instsize = this.instance.GetSize();

    sz.mul(instsize.x, instsize.y);
    this.instance.SetSize(sz);
    this.instance.SetHotspot(texture.GetHotspot());

    RefreshPropertyGrid();    // show new size
  }

  this.last_imgsize = imgsize;

  if (renderer.SupportsFullSmoothEdges()) {
    // Get the object size and texture size
    var objsize = this.instance.GetSize();
    var texsize = texture.GetImageSize();

    // Calculate pixels per texel, then get a quad padded with a texel padding
    var pxtex = new cr.vector2(objsize.x / texsize.x, objsize.y / texsize.y);
    var q = this.instance.GetBoundingQuad(new cr.vector2(pxtex.x, pxtex.y));

    // Calculate the size of a texel in texture coordinates, then calculate texture coordinates
    // for the texel padded quad
    var tex = new cr.vector2(1.0 / texsize.x, 1.0 / texsize.y);
    var uv = new cr.rect(-tex.x, -tex.y, 1.0 + tex.x, 1.0 + tex.y);

    // Render a quad with a half-texel padding for smooth edges
    renderer.Quad(q, this.instance.GetOpacity(), uv);
  } else {
    // Fall back to half-smoothed or jagged edges, depending on what the renderer supports
    renderer.Quad(this.instance.GetBoundingQuad(), this.instance.GetOpacity());
  }
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer) {
  this.texture_loaded = false;
  renderer.ReleaseTexture(this.last_texture);
}

IDEInstance.prototype.OnTextureEdited = function () {
  var texture = this.instance.GetTexture(this.properties["Initial frame"], this.properties["Initial animation"]);
  this.instance.SetHotspot(texture.GetHotspot());

  var imgsize = texture.GetImageSize();

  // If sprite texture has been edited and changed size, scale the texture accordingly.
  if ((imgsize.x !== this.last_imgsize.x || imgsize.y !== this.last_imgsize.y)
    && (this.last_imgsize.x !== 0 && this.last_imgsize.y !== 0)) {
    var sz = new cr.vector2(imgsize.x / this.last_imgsize.x, imgsize.y / this.last_imgsize.y);
    var instsize = this.instance.GetSize();

    sz.mul(instsize.x, instsize.y);
    this.instance.SetSize(sz);

    this.last_imgsize = imgsize;
  }
}