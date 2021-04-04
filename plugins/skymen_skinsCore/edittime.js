function GetPluginSettings()
{
	return {
		"name":			"Skin Group",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"skymen_skinsCore",				// this is used to identify this plugin and is saved to the project; never change it
		"version":      "1.4",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"允许您设置和同步皮肤.",
		"author":		"skymen",
		"help url":		" ",
		"category":		"一般||General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
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
				
// example				
AddCondition(0, cf_none, "皮肤为空", "General", "检查皮肤是否为空", "检查是否未添加皮肤.", "IsEmpty");

AddStringParam("输入要检查的tag", "皮肤检查.");
AddCondition(1, cf_none, "Has Skin", "General", "检查 {0} 皮肤是否存在", "检查是否已添加给定的皮肤.", "HasSkin");

AddStringParam("Skin tag", "要检查的skin tag.");
AddStringParam("Sub skin tag", "要检查的子skin tag.");
AddCondition(2, cf_none, "Has Sub Skin", "General", "检查 {0} 里的子皮肤 {1} 是否存在", "检查给定的皮肤是否具有给定的子皮肤.", "HasSubSkin");

AddStringParam("Skin tag", "输入要检查的Skin.");
AddCondition(3, cf_trigger, "On Skin Added", "Triggers", "指定皮肤 {0} 添加后", "检查是否已添加给定的皮肤.", "OnSkin");

AddStringParam("Skin tag", "输入要检查的Skin.");
AddStringParam("Sub skin tag", "输入要检查的子Skin.");
AddCondition(4, cf_trigger, "On sub Skin Added", "Triggers", "指定皮肤 {0} 里的子皮肤 <b>{1}</b> 添加后", "检查是否已将给定的子皮肤添加到给定的皮肤.", "OnSubSkin");

AddCondition(5, cf_trigger, "On Any Skin Added", "Triggers", "任意皮肤添加后", "当添加了任何皮肤后.", "OnAnySkin");

AddStringParam("Skin tag", "tag是父皮肤.");
AddCondition(6, cf_trigger, "指定皮肤添加任意子皮肤后", "Triggers", "任意子皮肤添加到 <b>{0}</b> 皮肤后", "检查是否将任何子皮肤添加到给定的皮肤.", "OnAnySubSkin");

AddCondition(7, cf_trigger, "任意皮肤添加任意子皮肤后", "Triggers", "任意<b>皮肤</b>添加任意<b>子皮肤</b>后", "检查是否已将任何子皮肤添加到任何皮肤.", "OnAnySubAnySkin");

AddCondition(8, cf_looping, "For each skin", "Loops", "For each skin", "为每个皮肤重复该事件.", "ForEachSkin");

AddStringParam("Skin tag", "皮肤检查.");
AddCondition(9, cf_looping, "For each sub skin", "Loops", "For each sub skin", "对每个子皮肤重复该事件.", "ForEachSubSkin");

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
AddObjectParam("对象", "用作皮肤的对象");
AddStringParam("Skin tag", "皮肤的tag，调用时用.");
AddComboParamOption("将所有动画添加为子皮肤");
AddComboParamOption("将特定动画添加为子皮肤");
AddComboParam("模式", "如果设置为所有动画，则所有精灵的动画都将作为子皮肤添加.", 0);
AddStringParam("动画名称", "如果设置为【将所有动画添加为子皮肤】则被忽略,否则指定动画作为子皮肤.");
AddStringParam("Sub Skin tag", "如果设置为【将所有动画添加为子皮肤】则被忽略,否则指定动画作为子皮肤.");
AddAction(0, af_none, "添加一个皮肤", "General", "添加皮肤 {0} 标签为 {1} 模式：<b>{2}</b>", "添加一个新皮肤.", "AddSkin");

AddObjectParam("对象", "用作皮肤的对象");
AddStringParam("Skin tag", "皮肤的tag，调用时用.");
AddStringParam("Sub Skin tag", "子皮肤的tag，调用时用.");
AddStringParam("动画名称", "设置为子皮肤的动画,留空为默认动画.");
AddAction(1, af_none, "添加一个子皮肤", "General", "Add animation {3} of {0} as sub skin {2} of skin {1}", "添加一个子皮肤.", "AddSubSkin");

AddStringParam("Skin tag", "皮肤的tag，调用时用.");
AddAction(2, af_none, "删除皮肤", "General", "删除皮肤 {0}", "删除一个皮肤.", "RemoveSkin");

AddStringParam("Skin tag", "去除皮肤的tag.");
AddStringParam("Sub Skin tag", "去除皮肤的子皮肤tag.");
AddAction(3, af_none, "删除子皮肤", "General", "Remove sub skin {1} from skin {0}", "删除一个子皮肤.", "RemoveSubSkin");

AddAction(4, af_none, "初始化皮肤设置", "General", "完毕后初始化皮肤.", "设置初始外观后，需要调用此操作.", "Init");

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
AddExpression(0, ef_return_string, "CurSkin", "Loops", "CurSkin", "返回当前皮肤的标签tag.");

AddExpression(1, ef_return_string, "CurSubSkin", "Loops", "CurSubSkin", "返回当前子皮肤的标签tag.");

AddExpression(2, ef_return_string, "LastSkin", "Triggers", "LastSkin", "返回最后一个皮肤的标签tag.");

AddExpression(3, ef_return_string, "LastSubSkin", "Triggers", "LastSubSkin", "返回最后一个子皮肤的标签tag.");

AddExpression(4, ef_return_string, "RandomSkin", "General", "RandomSkin", "返回一个随机皮肤.");

AddStringParam("Skin tag", "皮肤检查.");
AddExpression(5, ef_return_string, "RandomSubSkin", "General", "RandomSubSkin", "返回一个给定皮肤的随机子皮肤.");

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
	new cr.Property(ept_text,		"tag",	"",	"该皮肤组的标签")		// a string
	];

	
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
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}