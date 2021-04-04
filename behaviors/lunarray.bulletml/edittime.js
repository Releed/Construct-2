function GetBehaviorSettings()
{
	return {
		"name":			"BulletML",			
		"id":			"lunarray_BulletML_bhv",
		"version":		"1.0",					
		"description":	"Run bulletML script ",
		"author":		"lunarray",
		"help url":		"",
		"category":		"General",
		"flags":		0
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
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>, and {my} for the current behavior icon & name
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
//AddCondition(0, cf_none, "Is moving", "My category", "{my} is moving", "Description for my condition!", "IsMoving");

AddCondition(0, cf_trigger, "BulletML on finished", "BulletML", "{my} is finished", "Triggering when BulletML is finished playing", "BulletMLOnEnd");

AddCondition(1, cf_none, "BulletML is paused", "BulletML", "{my} is paused", "Check whether BulletML is paused", "BulletMLIsPaused");
////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
AddStringParam("Script", "The bulletML script, load using AJAX or something");
AddAction(0, af_none, "Load BulletML", "BulletML", "{my} load bulletML {0}", "Load a bulletml", "LoadBulletML");

AddNumberParam("Rank", "The rank of the bullet barrage, higher is usually harder");
AddObjectParam("Target", "The target of the bullet barrage. If multiple target exists, will target first target.");
AddObjectParam("Default Bullet", "Set sprite visual for unnamed bullets. Will also use this sprite for unassigned bullets.");
AddLayerParam("Bullet Layer", "Set layer for bullets");
AddNumberParam("Image Point", "Set imagepoint for bullets");
AddAction(1, af_none, "Run action", "BulletML", "Run script with rank <b>{0}</b>", "Load script for BulletML", "RunBML");

AddStringParam("Label", "The label for the bullet in the script. Use (default) to change default bullet.");
AddObjectParam("Visual", "Set sprite for this bullet");
AddAction(2, af_none, "Set bullet visual", "BulletML", "Set {1} as visual of bullet type <b>{0}</b> ", "Set bullet visual for BulletML", "SetBullet");

AddNumberParam("Horizontal Margin", "The left and side margin of BulletML boundary", 4);
AddNumberParam("Vertical Margin", "The top and bottom margin of BulletML boundary", 4);
AddNumberParam("Width", "Width of the screen", 300);
AddNumberParam("Height", "Height of the screen", 400);
AddNumberParam("OffsetX", "The left origin of the BulletML boundary", 0);
AddNumberParam("OffsetY", "The top origin of the BulletML boundary", 0);
AddAction(3, af_none, "Set margins", "BulletML", "Set width, height to (<b>{2},{3}</b>) and margin to <b>{0},{1}</b> ", "Set bulletml margins", "SetParam");

AddAction(4, af_none, "Pause", "BulletML", "Pause BulletML", "Pause BulletML based movement, enabling other behavior managed movement", "Pause");

AddAction(5, af_none, "Resume", "BulletML", "Resume BulletML", "Resume BulletML based movement", "Resume");

AddComboParamOption("Fallback compatibility mode (use requestAnimationFrame)");
AddComboParamOption("Turbo mode (use setTimeout)");
AddComboParam("Select tick mode", "Choose the tick mode that affects compatibility between browsers");
AddAction(6, af_none, "Set tick mode", "BulletML", "Set tick mode to {0}", "Set tick mode for BulletML", "SetTickMode");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
		new cr.Property(ept_combo, 		"Tick Mode",		"Fallback Mode",			"Set the tick mode for compatibility.", "Fallback Mode|Turbo Mode")
];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of the behavior in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// any other properties here, e.g...
	// this.myValue = 0;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
