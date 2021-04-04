function GetBehaviorSettings()
{
	return {
		"name":			"Plus",
		"id":			"Textbox_Plus",
		"version":		"1.01",
		"description":	"An easier way to work with text box.",
		"author":		"PlayLive",
		"help url":		"https://www.scirra.com/forum/behavior-textbox_t188383",
		"category":		"Addon",
		"flags":		0 | bf_onlyone
	};
};

////////////////////////////////////////
// Conditions
AddCondition(0, cf_trigger, "On focus", "Plus", "On Focus", "Triggered when the textbox is in focus.", "OnFocus");
AddCondition(1, cf_trigger, "On unfocused", "Plus", "On Blur", "Triggered when the text box is out of focus.", "OnBlur");

////////////////////////////////////////
// Actions
AddStringParam("Add Class", "Add class name's separated by spaces.");
AddAction(0, af_none, "Add Class", "Plus", "Add Class <i>{0}</i>", "Add class name to object.", "AddClass");

AddStringParam("Remove Class", "Remove class name's separated by spaces.");
AddAction(1, af_none, "Remove Class", "Plus", "Remove Class <i>{0}</i>", "Remove the object class name.", "RemClass");

AddAnyTypeParam("Append Text", "Enter the text to append to the object's content.", "\"\"");
AddAction(2, af_none, "Append text", "Plus", "Append text <i>{0}</i>", "Add text to the end of the existing text.", "AppendText");
/*
AddComboParamOption("disable");
AddComboParamOption("enable");
AddComboParam("Enable", "Enable or disable context menu.", 1);
AddAction(3, af_none, "Context Menu", "Plus", "Set context menu to <b>{0}</b>", "Enable or disable context menu.", "ContextMenu");
*/
AddComboParamOption("Disable");
AddComboParamOption("Enable");
AddComboParam("Selectable text", "Set whether text can be selected.", 1);
AddAction(4, af_none, "Selectable text", "Plus", "Selectable text <b>{0}</b>", "Enable or disable selectable text.", "Selectable");

AddAction(5, af_none, "Select All", "Plus", "select all text", "Select all text in the text box.", "SelectAll");

AddAction(6, af_none, "Scroll Top", "Plus", "Scroll to the top line of a textarea", "Scroll to the top line of a textarea.", "ScrollTop");

AddAction(7, af_none, "Scroll Bottom", "Plus", "Scroll to bottom line of a textarea", "Scroll to the bottom line of a textarea.", "ScrollBottom");

AddNumberParam("Scroll to (%)", "Scroll to (%).", "0");
AddAction(8, af_none, "Scroll to (%)", "Plus", "Scroll to {0}%", "Scroll to the custom position (in percentage) of this object.", "ScrollTo");

AddNumberParam("Scroll to (position)", "Scroll to (position).", "0");
AddAction(9, af_none, "Scroll to (position)", "Plus", "Scroll to {0} position", "Scroll to the custom position of this object.", "ScrollToPosition");

////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_string, "Get object ID", "Plus", "ID", "Get the object ID.");
AddExpression(1, ef_return_string, "Get object Class", "Plus", "Class", "Get the object Class.");
AddExpression(2, ef_return_number, "Get scroll height", "Plus", "ScrollHeight", "Get scroll height of a textarea.");
AddExpression(3, ef_return_number, "Get scroll position", "Plus", "ScrollPosition", "Get scroll position of a textarea.");

ACESDone();
////////////////////////////////////////
// Property grid properties for this plugin
var property_list = [
/* [00] */	new cr.Property(ept_text,	"Class (optional)",			"",				"An Class for the control allowing it to be styled with CSS from the page HTML."),
/* [01] */	new cr.Property(ept_combo,	"Auto font size",			"None",			"For best performance disable default auto font size.", 	"None|Default|Small|Big|Large|Extreme"),
/* [02] */	new cr.Property(ept_text, 	"Font",						"Segoe UI",		"Choose the font to display."),
/* [03] */	new cr.Property(ept_combo, 	"Font Style",				"Normal",		"Choose the style to display.",								"Normal|Bold|Italic|Bold and Italic"),
/* [04] */	new cr.Property(ept_color,	"Color",					cr.RGB(0, 0, 0),"Color of the text."),
/* [05] */	new cr.Property(ept_combo,	"Alignment (horizontal)",	"Left",			"Horizontal alignment of the text.",						"Left|Center|Right"),
/* [06] */	new cr.Property(ept_combo,	"Alignment (vertical)",		"Top",			"Vertical alignment of the text.",							"Top|Center|Bottom"),
/* [07] */	new cr.Property(ept_combo,	"Background type",			"Solid", 		"Choose whether the background is solid or transparent.",	"Transparent|Solid"),
/* [08] */	new cr.Property(ept_combo,	"Border",					"Yes",			"Choose whether the text box has borders.",					"No|Yes"),
/* [09] */	new cr.Property(ept_combo,	"Context menu",				"Yes",			"The contextmenu event is triggered when the right mouse button is clicked on this object.",	"No|Yes"),
/* [10] */	new cr.Property(ept_combo,	"Selectable",				"Yes",			"Set whether text can be selected.",						"No|Yes"),
/* [11] */	new cr.Property(ept_combo,	"Text decoration",			"None",			"Choose a decoration for the text box.",					"None|Underline|Line-Through|Overline"),
/* [12] */	new cr.Property(ept_combo,	"Text restrict",			"None",			"Restrict string in textbox.",								"None|Letters|Numbers|Letters and Numbers|Custom only"),
/* [13] */	new cr.Property(ept_combo,	"Text transform",			"None",			"Text in uppercase, lowercase or capitalize.",				"None|Capitalize|Lowercase|Uppercase"),
/* [14] */	new cr.Property(ept_integer,"Max length",				0,				"Maximum character limit.\n0 for unlimited."),
/* [--] */	// ----------------------	Advanced
/* [15] */	new cr.Property(ept_text,	"Webfont URL",				"",				"Set the webfont URL for the text box."),
/* [16] */	new cr.Property(ept_text,	"Webfont name",				"",				"The webfont name for the text box."),
/* [17] */	new cr.Property(ept_text,	"Background",				"",				"eg:\nrgb(0, 0, 0)"),
/* [18] */	new cr.Property(ept_text,	"Borders",					"",				"eg:\n2px solid rgb(0, 0, 0)"),
/* [19] */	new cr.Property(ept_text,	"Border radius",			"",				"eg:\n2px"),
/* [20] */	new cr.Property(ept_text,	"Outline",					"",				"eg:\nrgb(0, 0, 0) solid thick\n*0 to disable"),
/* [21] */	new cr.Property(ept_text,	"Padding",					"",				"eg:\n2px"),
/* [22] */	new cr.Property(ept_text,	"Shadow (text)",			"",				"eg:\n2px 2px 2px rgb(0, 0, 0)"),
/* [23] */	new cr.Property(ept_text,	"Shadow (box)",				"",				"eg:\n2px 2px 2px rgb(0, 0, 0)"),
/* [24] */	new cr.Property(ept_text,	"Text restrict (allow)",	"",				"eg:\nabc123\nTo add a new line use space-bar twice.")
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
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}