function GetBehaviorSettings()
{
	return {
		"name":			"Skin",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"SkymenSkin",			// this is used to identify this behavior and is saved to the project; never change it
		"version":      "2.3",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"允许您设置和同步皮肤.",
		"author":		"skymen",
		"help url":		" ",
		"category":		"一般||General",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
						//| bf_onlyone			// can only be added once to an object, e.g. solid
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
AddCondition(0, cf_none, "使用默认皮肤", "General", " {my}: 使用默认皮肤", "测试当前是否正在使用默认外观.", "IsDefault");

AddStringParam("Skin tag", "测试当前是否正在使用指定皮肤tag.");
AddCondition(1, cf_none, "Has skin", "General", " {my}: 正在使用皮肤 <b>{0}</b> ", "测试当前是否正在使用指定皮肤.", "IsSkin");

AddStringParam("Sub Skin tag", "测试当前是否正在使用指定子皮肤tag.");
AddCondition(2, cf_none, "Has sub skin", "General", " {my}: 正在使用子皮肤 {0} ", "测试当前是否正在使用指定子皮肤.", "IsSubSkin");

AddCondition(3, cf_none, "Is default hidden", "General", "隐藏默认皮肤", "测试默认外观当前是否处于隐藏状态.", "IsDefaultHidden");

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
AddStringParam("Skin tag", "你要设置的皮肤tag.");
AddAction(0, af_none, "Set Skin", "General", "{my}: 设置皮肤 {0}", "设置当前指定皮肤.", "SetSkin");

AddStringParam("Sub skin tag", "你要设置的子皮肤tag.");
AddAction(1, af_none, "Set Sub Skin", "General", "{my}: 设置子皮肤 {0}", "设置当前指定的子皮肤.", "SetSubSkin");

AddStringParam("Skin tag", "你要设置的皮肤tag.");
AddStringParam("Sub skin tag", "你要设置的子皮肤tag.");
AddAction(2, af_none, "Setup", "General", "{my}: Set skin to {0} and sub skin to {1}", "Set the current skin and sub skin.", "Setup");

AddAction(3, af_none, "Use Default", "General", "{my}: Use default", "Set to use default skin.", "UseDefault");

AddComboParamOption("Don't hide default skin");
AddComboParamOption("Hide default skin");
AddComboParam("Hide", "Set hide default.");
AddAction(4, af_none, "Set Hide Default", "General", "{my}: {0}", "Set hide default skin.", "HideDefault");

AddNumberParam("Image Point", "The new image point to pin the skin to.");
AddAction(5, af_none, "Set Image Point", "General", "{my}: Set image point to {0}", "Set image point.", "SetImagePoint");

AddComboParamOption("Sync Animation");
AddComboParamOption("Sync Frame");
AddComboParamOption("Sync Animation and Frame");
AddComboParamOption("No Sync");
AddComboParam("Sync Mode", "Set sync mode.");
AddAction(6, af_none, "Set Sync Mode", "General", "{my}: {0}", "Set sync mode.", "SyncMode");

AddComboParamOption("Yes");
AddComboParamOption("No");
AddComboParam("Sync Z Order", "Set sync mode.");
AddAction(7, af_none, "Set Sync Z-Order", "General", "{my}: Sync z-order: {0}", "Set sync z-order.", "SyncZOrder");

AddAction(8, af_none, "Update Z-Order", "General", "{my}: Update z-order", "Update z-order.", "UpdateZOrder");

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
AddExpression(0, ef_return_string, "Skin", "General", "Skin", "返回当前皮肤.");

AddExpression(1, ef_return_string, "SubSkin", "General", "SubSkin", "返回当前子皮肤.");

AddExpression(2, ef_return_string, "SkinBaseTag", "General", "SkinBaseTag", "返回皮肤基础标签tag.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_text, 	"Skin Base Tag",		"",		"此皮肤插件的tag，不是单个皮肤的."),
	new cr.Property(ept_text, 	"Skin Tag",		"",		"指定一个皮肤的tag."),
	new cr.Property(ept_text, 	"Sub Skin Tag",		"",		"指定一个子皮肤的tag."),
	new cr.Property(ept_combo,		"Sync mode",	"No Sync",		"Yes：子皮肤将与精灵的动画同步.", "Sync Animation|Sync Frame|Sync Animation and Frame|No Sync"),
	new cr.Property(ept_combo,		"Use Default Skin",	"No",		"Yes：皮肤将被禁用，并且将使用默认皮肤.", "Yes|No"),
	new cr.Property(ept_combo,		"Hide Default Skin",	"Yes",		"Yes： 如果启用了皮肤，它将隐藏默认皮肤.", "Yes|No"),
	new cr.Property(ept_integer, "Pin Image point", 0, "图片指向固定."),
	new cr.Property(ept_combo, "Sync Z-order", "Yes", "Yes：它将遵循对象的Z-order.", "Yes|No"),
	new cr.Property(ept_combo, "Size sync mode", "Sync scale percentage", "选择如何同步皮肤的大小", "No sync|Sync exact size|Sync scale percentage")
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
