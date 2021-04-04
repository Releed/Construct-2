function GetPluginSettings()
{
	return {
		"name":			"圆形菜单",			// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"CircleMenu",			// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.34",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"创建漂亮的圆形菜单.",
		"author":		"PlayLive",
		"help url":		"https://www.scirra.com/forum/viewtopic.php?f=153&t=183038&p=1074467#p1074467",
		"reference":	"http://zikes.github.io/circle-menu/",
		"category":		"杂项||Mis",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"world",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	true,					// only used when "type" is "world".  Enables an angle property on the object.
		"dependency":	"circle.js;"+
						"circle.css;font-awesome.css;"+
						"font-awesome.eot;font-awesome.otf;font-awesome.svg;font-awesome.ttf;font-awesome.woff;font-awesome.woff2",
		"flags":		pf_position_aces		// compare/set/get x, y...
	};
};

////////////////////////////////////////
// Conditions
AddCondition(0, cf_trigger, "On Update",	"Menu", "On Update",	"Triggered when the menu is updated.",		"OnUpdate");
AddCondition(1, cf_trigger, "On Open",		"Menu", "On Open",		"Triggered when the menu opens.",			"OnOpen");
AddCondition(2, cf_trigger, "On Close",		"Menu", "On Close",		"Triggered when the menu closes.",			"OnClose");
AddCondition(3, cf_trigger, "On Select",	"Menu", "On Select",	"Triggered when an item is selected.",		"OnSelect");
AddCondition(4, cf_trigger, "On Delete",	"Menu", "On Delete",	"Triggered when an item is deleted.",		"OnDelete");
AddCondition(5, cf_trigger, "On Clear",		"Menu", "On Clear",		"Triggered when the menu is clean.",		"OnClear");
AddCondition(6, cf_none,	"Is Open",		"Menu", "Is Open",		"True when the menu is opened.",			"IsOpen");

AddStringParam("Tag", "The tag to compare with item selected.", "\"\"");
AddCondition(7, cf_none,	"Compare tag",	"Menu",	"Tag is {0}",	"Compare the item selected currently entered into the Circle Menu.", "CompareTag");

////////////////////////////////////////
// Actions
AddAction(0, af_none, "Open",	"Menu",	"Open",	"Open Circle Menu.",	"Open");
AddAction(1, af_none, "Close",	"Menu",	"Close","Close Circle Menu.",	"Close");

AddAnyTypeParam("Item", "Delete item by tag(string) or position(number).", "");
AddAction(2, af_none, "Delete item", "Menu", "Delete item: <i>{0}</i>", "Delete item of the Circle Menu.", "Delete");

AddAction(3, af_none, "Clear", "Menu", "Clear", "Remove all items from the Circle Menu.", "Clear");

AddStringParam("Text", "Enter the text to set the object's content to. Font 'awesome' is recommended (http://fontawesome.io/icons).\n*accepts html code.", "\"\"");
AddNumberParam("Degree", "Measured in degrees where 1/360 are on the right and angle travels in a clockwise direction.\nNegatives numbers are on the left and angle travels in a anticlockwise direction.\n0 turns off.", "360");
AddStringParam("Background", "The background style.\neg. rgb(255, 255, 255)", "\"linear-gradient(to bottom right, rgb(200, 0, 0), rgb(240, 0, 0))\"");
AddStringParam("Border", "The border style.\neg. 2px solid rgb(255, 255, 255)", "\"2px solid rgb(255, 255, 255)\"");
AddStringParam("Color", "Text color.\neg. rgb(255, 255, 255)", "\"rgb(255, 255, 255)\"");
AddNumberParam("Font size", "Font size in percentage(%).", "120");
AddAction(4, af_none, "Set button style", "Menu", "Set button style: <i>{0}</i> ({1})", "Set the button style from Circle Menu.", "SetStyle");

AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between differents items.", "\"\"");
AddStringParam("Icon", "Visit: 'http://fontawesome.io/icons' (v4.7.0) to view the icons.\ne.g. navicon", "\"\"");
AddComboParamOption("none");
AddComboParamOption("spin");
AddComboParamOption("pulse");
AddComboParam("Animated", "Set animated (none | spin | pulse).\n*pulse works well with 'spinner', 'refresh', and 'cog'.", 0);
AddStringParam("Background", "The background style.\neg. rgb(255, 255, 255)", "\"linear-gradient(to bottom right, rgb(32, 32, 32), rgb(128, 128, 128))\"");
AddStringParam("Border", "The border style.\neg. 2px solid rgb(255, 255, 255)", "\"2px solid rgb(255, 255, 255)\"");
AddStringParam("Color", "Icon color.\neg. rgb(255, 255, 255)", "\"rgb(255, 255, 255)\"");
AddNumberParam("Font size", "Font size in percentage(%).", "100");
AddAction(5, af_none, "Add item (font awesome)", "Menu", "Add item: <i>{1}</i> (<i>{2}</i>)", "Add item(icon format) to Circle Menu.", "AddItemIcon");

AddStringParam("Tag", "A tag, which can be anything you like, to distinguish between differents item selected.", "\"\"");
AddStringParam("Text", "Enter the text to add to object's content.\n*accepts html code.", "\"\"");
AddStringParam("Font", "The font name to set.", "\"Arial\"");
AddComboParamOption("normal");
AddComboParamOption("bold");
AddComboParamOption("italic");
AddComboParamOption("bold and italic");
AddComboParam("Style", "Choose the style for the given font face.");
AddStringParam("Background", "The background style.\neg. rgb(255, 255, 255)", "\"linear-gradient(to bottom right, rgb(32, 32, 32), rgb(128, 128, 128))\"");
AddStringParam("Border", "The border style.\neg. 2px solid rgb(255, 255, 255)", "\"2px solid rgb(255, 255, 255)\"");
AddStringParam("Color", "Text color.\neg. rgb(255, 255, 255)", "\"rgb(255, 255, 255)\"");
AddNumberParam("Font size", "Font size in percentage(%).", "100");
AddAction(6, af_none, "Add item (text)", "Menu", "Add item: <i>{1}</i> (<i>{2}</i> - {3})", "Add item(text format) to Circle Menu.", "AddItemText");

AddComboParamOption("Invisible");
AddComboParamOption("Visible");
AddComboParam("Visibility", "Choose whether the object is hidden or shown.");
AddAction(7, af_none, "Set visible", "Menu", "Set <i>{0}</i>", "Set whether the object is hidden or shown.", "Visibility");

////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_string, "Get the Circle Menu ID('ul')",		"Menu", "GetID",			"Get the Circle Menu ID('ul').");
AddExpression(1, ef_return_number, "Get the number of items",			"Menu", "GetItemCount",		"Get the number of items.");
AddExpression(2, ef_return_string, "Get the tags of the items",			"Menu", "GetItemTags",		"Get the tags of the items.");
AddExpression(3, ef_return_string, "Get the tag of the item selected",	"Menu", "GetItemSelected",	"Get the tag of the item selected.");

ACESDone();
////////////////////////////////////////
var property_list = [
/* [00] */	new cr.Property(ept_text,	"ID (optional)","",		"控件的ID，设置后允许使用页面HTML中的CSS对其进行样式设置."),
/* [01] */	new cr.Property(ept_combo,	"Icon",			"red",	"设置按钮样式.", "none|black|blue|green|red|white|yellow"),
/* [02] */	new cr.Property(ept_integer,"Angle start",	"0",	"0为禁用.\nAn object specifying the position of the items in relation to the center, measured in degrees where 0/360 are on the right and angle travels in a clockwise direction. An alternative to the direction option, if you want more control."),
/* [03] */	new cr.Property(ept_integer,"Angle end",	"0",	"0为禁用.\nAn object specifying the position of the items in relation to the center, measured in degrees where 0/360 are on the right and angle travels in a clockwise direction. An alternative to the direction option, if you want more control."),
/* [04] */	new cr.Property(ept_integer,"Circle radius","80",	"The radius of the circle that determines the distance of the items from the center."),
/* [05] */	new cr.Property(ept_integer,"Delay",		"1000",	"触发菜单后，延迟是指项目开始移回到中心之前等待的时间，以毫秒为单位. \n 悬停(hover)效果最好"),
/* [06] */	new cr.Property(ept_integer,"Depth",		"0",	"Z-index."),
/* [07] */	new cr.Property(ept_combo,	"Direction",	"full",	"The direction of the items in relation to the center. top will place the items above the center, in a 90 degree semicircle centered upwards. Top-half will create a full 180 degree semicircle. full will create a full 360 degree circle, with the first item appearing at the top.", "top|left|right|bottom|top-left|top-right|bottom-left|bottom-right|top-half|left-half|right-half|bottom-half|full"),
/* [08] */	new cr.Property(ept_integer,"Item diameter","30",	"每个项目的直径大小，以像素为单位。 用于设置每个项目的CSS属性，包括宽度，高度和边框半径."),
/* [09] */	new cr.Property(ept_integer,"Speed",		"500",	"动画速度，以毫秒为单位。 决定项目从中心移入或移出所需的总时间."),
/* [10] */	new cr.Property(ept_integer,"Step in",		"-20",	"菜单关闭时，每个项目回收间隔的毫秒数。 负数将从最后一项开始执行."),
/* [11] */	new cr.Property(ept_integer,"Step out",		"20",	"菜单打开时，每个项目弹出间隔的毫秒数。 负数将从最后一项开始执行."),
/* [12] */	new cr.Property(ept_combo,	"Transition",	"ease",	"CSS计时功能，用于控制动画的打开/关闭.", "ease|ease-in|ease-out|ease-in-out|linear|cubic-bezier"),
/* [13] */	new cr.Property(ept_combo,	"Trigger",		"hover","触发菜单的方式. \n none:无触发方式 \n click:点击触发 \n hover:悬停触发", "none|click|hover")
];
////////////////////////////////////////

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
}

IDEInstance.prototype.OnCreate = function()
{
	this.instance.SetHotspot(new cr.vector2(0, 0));
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
	this.instance.SetSize(new cr.vector2(48, 48));
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
	var quad = this.instance.GetBoundingQuad();
	renderer.Fill(quad, cr.RGB(224, 224, 224));
	renderer.Outline(quad, cr.RGB(30, 30, 30));
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}