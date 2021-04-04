function GetBehaviorSettings()
{
	return {
		"name": "Parallaxer",
		"id": "Parallaxer",	
		"version": "1.3.0.0",
		"description": "Parallax scrolling for single background objects.",
		"author": "Zouhair Serrar",
		"help url": "http://www.gameplaypassion.com",
		"category": "ParallaxBG",
		"flags": 0
	};
};


// <editor-fold defaultstate="collapsed" desc="Conditions">

// </editor-fold>


// <editor-fold defaultstate="collapsed" desc="Actions">
AddAnyTypeParam("Parallax X", "The horizontal scroll rate in percentage (e.g 100 is full speed, 50 is half-speed, 200 is double speed).", "100");
AddAction(0, af_none, "Set Parallax X", "", "Set {my} Parallax X to <b>{0}</b>", "Set value of Parallax X", "SetParallaxX");

AddAnyTypeParam("Parallax Y", "The vertical scroll rate in percentage (e.g 100 is full speed, 50 is half-speed, 200 is double speed).", "100");
AddAction(1, af_none, "Set Parallax Y", "", "Set {my} Parallax Y to <b>{0}</b>", "Set value of Parallax Y", "SetParallaxY");

AddAnyTypeParam("Anchor X", "The x coordinate of the anchor point.", "0");
AddAction(5, af_none, "Set Anchor X", "", "Set {my} Anchor X to <b>{0}</b>", "Set the X coordinate of the anchor point.", "SetAnchorX");

AddAnyTypeParam("Anchor Y", "The Y coordinate of the anchor point.", "0");
AddAction(6, af_none, "Set Anchor Y", "", "Set {my} Anchor Y to <b>{0}</b>", "Set value of Anchor Y", "SetAnchorY");

AddAnyTypeParam("State", "Set whether to enable or disable the behavior.", "enabled");
AddAction(3, af_none, "Set Enabled", "", "Set {my} <b>{0}</b>", "Set whether this behavior is enabled.", "SetEnabled");
// </editor-fold>


// <editor-fold defaultstate="collapsed" desc="Expressions">
AddExpression(0, ef_return_number, "ParallaxX", "", "ParallaxX", "Return the value of Parallax X.");

AddExpression(1, ef_return_number, "ParallaxY", "", "ParallaxY", "Return the value of Parallax Y.");

AddExpression(5, ef_return_number, "AnchorX", "", "AnchorX", "Return the value of Anchor X.");

AddExpression(6, ef_return_number, "AnchorY", "", "AnchorY", "Return the value of Anchor X.");
// </editor-fold>


ACESDone();


// <editor-fold defaultstate="collapsed" desc="Properties">
var property_list = [
new cr.Property(ept_integer, "Parallax X", 100, "The horizontal scroll rate in percentage (e.g 100 is full speed, 50 is half-speed, 200 is double speed)."),
new cr.Property(ept_integer, "Parallax Y", 100, "The vertical scroll rate in percentage (e.g 100 is full speed, 50 is half-speed, 200 is double speed)."),
new cr.Property(ept_combo, "Initial State", "Enabled", "Whether to initially have the behavior enabled or disabled.", "Enabled|Disabled")
];
// </editor-fold>


// <editor-fold defaultstate="collapsed" desc="SDK code">
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
};

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
};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
};
// </editor-fold>