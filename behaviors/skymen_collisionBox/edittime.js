function GetBehaviorSettings()
{
	return {
		"name":			"Collision Box",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"SkymenCollisionBox",			// this is used to identify this behavior and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"Adds an additionnal collision box to the object",
		"author":		"skymen",
		"help url":		" ",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
					//	| bf_onlyone			// can only be added once to an object, e.g. solid
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
AddObjectParam("Object", "The Object to check overlapping with");
AddCondition(0, cf_none, "Is Overlapping", "General", "{my} is overlapping {0}", "Checks if collision box is overlapping", "IsOverlapping");

AddObjectParam("Object", "The Object to check overlapping with");
AddNumberParam("X Offset", "The X offset to apply");
AddNumberParam("Y Offset", "The Y offset to apply");
AddCondition(1, cf_none, "IsOverlapping at offset", "General", "{my} is overlapping {0} at offset ({1}, {2})", "Checks if collision box is overlapping at offset", "IsOverlappingOffset");

AddCondition(2, cf_none, "Is visible", "General", "{my} is visible", "Checks if collision box is visible", "IsVisible");

AddCmpParam("Compare", "Compare method");
AddNumberParam("Value", "Compare the Width to");
AddCondition(3, cf_none, "Compare Width", "General", "{my} Width {0} {1}", "Compare the collision box's Width", "CompareWidth");

AddCmpParam("Compare", "Compare method");
AddNumberParam("Value", "Compare the Height to");
AddCondition(4, cf_none, "Compare Height", "General", "{my} Height {0} {1}", "Compare the collision box's Height", "CompareHeight");

AddCmpParam("Compare", "Compare method");
AddNumberParam("Value", "Compare the X Offset to");
AddCondition(5, cf_none, "Compare X Offset", "General", "{my} X Offset {0} {1}", "Compare the collision box's X Offset", "CompareXOffset");

AddCmpParam("Compare", "Compare method");
AddNumberParam("Value", "Compare the Y Offset to");
AddCondition(6, cf_none, "Compare Y Offset", "General", "{my} Y Offset {0} {1}", "Compare the collision box's Y Offset", "CompareYOffset");

AddCmpParam("Compare", "Compare method");
AddNumberParam("Value", "Compare the Angle to");
AddCondition(7, cf_none, "Compare Angle", "General", "{my} Angle {0} {1}", "Compare the collision box's Angle", "CompareAngle");

AddCmpParam("Compare", "Compare method");
AddNumberParam("Value", "Compare the Image Point to");
AddCondition(8, cf_none, "Compare Image Point", "General", "{my} Image Point {0} {1}", "Compare the collision box's Image Point", "CompareImagePoint");

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
AddObjectParam("Sprite", "The sprite to put as collision box");
AddAction(0, af_none, "Set Collision Box", "General", "{my} set collision box to {0}", "Set the collision box", "SetBox");

AddNumberParam("Value", "The new image point");
AddAction(1, af_none, "Set image point", "General", "{my} set image point to {0}", "Set the image point", "SetImagePoint");

AddNumberParam("Value", "The new width");
AddAction(2, af_none, "Set width", "General", "{my} set width to {0}", "Set the width", "SetWidth");

AddNumberParam("Value", "The new height");
AddAction(3, af_none, "Set height", "General", "{my} set height to {0}", "Set the height", "SetHeight");

AddNumberParam("Value", "The new angle");
AddAction(4, af_none, "Set angle", "General", "{my} set angle to {0}", "Set the angle", "SetAngle");

AddNumberParam("Value", "The new X Offset");
AddAction(5, af_none, "Set X Offset", "General", "{my} set X Offset to {0}", "Set the X Offset", "SetXOffset");

AddNumberParam("Value", "The new Y Offset");
AddAction(6, af_none, "Set Y Offset", "General", "{my} set Y Offset to {0}", "Set the Y Offset", "SetYOffset");

AddNumberParam("X Offset", "The new X Offset");
AddNumberParam("Y Offset", "The new Y Offset");
AddAction(7, af_none, "Set position Offset", "General", "{my} set position Offset to ({0}, {1})", "Set the position Offset", "SetPositionOffset");

AddNumberParam("Width", "The new Width");
AddNumberParam("Height", "The new Height");
AddAction(8, af_none, "Set size", "General", "{my} set size to ({0}, {1})", "Set the size", "SetSize");

AddComboParamOption("Visible");
AddComboParamOption("Invisible");
AddComboParam("Appearance", "Set appearance");
AddAction(9, af_none, "Set visible", "General", "{my} set {0}", "Set visible", "SetVisible");



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
AddExpression(0, ef_return_number, "Width", "General", "Width", "The collision box's Width");
AddExpression(1, ef_return_number, "Height", "General", "Height", "The collision box's Height");
AddExpression(2, ef_return_number, "XOffset", "General", "XOffset", "The collision box's X Offset");
AddExpression(3, ef_return_number, "YOffset", "General", "YOffset", "The collision box's Y Offset");
AddExpression(4, ef_return_number, "Angle", "General", "Angle", "The collision box's Angle");
AddExpression(5, ef_return_number, "ImagePoint", "General", "ImagePoint", "The collision box's Image Point");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_integer, "Width", 10, "The collision box's Width"),
	new cr.Property(ept_integer, "Height", 10, "The collision box's Height"),
	new cr.Property(ept_integer, "X offset", 0, "The collision box's X offset"),
	new cr.Property(ept_integer, "Y offset", 0, "The collision box's Y offset"),
	new cr.Property(ept_integer, "Angle", 0, "The collision box's Angle"),
	new cr.Property(ept_integer, "Image Point", 0, "The collision box's Image Point"),
	new cr.Property(ept_combo, "Visible", "No", "Wether the collision box is visible or not by default", "Yes|No")
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
