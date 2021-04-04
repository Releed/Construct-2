function GetPluginSettings()
{
	return {
		"name":			"智能随机(Smart Random)",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"BHT_Smart_Random",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"在非重复阈值的范围内生成非重复整数",
		"author":		"David Taylor/Black Hornet Technologies",
		"help url":		"http://blackhornettechnologies.com/construct2/plugins/BHTSmartRandom.aspx",
		"category":		"数据与存储||Data & Storage",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0
	};
};

AddAction(0, af_none, "开始随机化", "智能随机", "开始随机化数据.", "给定开始和结束的设置,开始随机化.", "Randomize");

AddNumberParam("起始值", "起始值.", "1");
AddNumberParam("结束值", "结束值.", "10");
AddNumberParam("阈值", "循环重复时必须强制唯一值的数量.", "1");
AddAction(1, af_none, "重置随机", "智能随机", "生成 {{0}-{1}} (包含)范围内的唯一随机数,重复的不会超过 <b>{2}</b> 个值.", "使用新设置生成随机范围.", "New");

AddExpression(0, ef_return_number, "Get next value", "智能随机", "Next", "返回范围内的下一个随机值.");
AddExpression(1, ef_return_number, "Get Start value", "智能随机", "Start", "返回范围内的起始值.");
AddExpression(2, ef_return_number, "Get End value", "智能随机", "End", "返回范围内的结束值.");
AddExpression(3, ef_return_number, "Get Threshold value", "智能随机", "Threshold", "返回阈值.");
AddExpression(4, ef_return_number, "Peek at the next value without removing it", "智能随机", "Peek", "返回下一个值,但不删除它.");

////////////////////////////////////////
ACESDone();

var property_list = [
	new cr.Property(ept_integer, 	"Start",				1,		"起始值."),
	new cr.Property(ept_integer, 	"End",					10,		"结束值."),
	new cr.Property(ept_integer, 	"Repeat threshold",		1,		"重复阈值\n循环重复时必须强制唯一值的数量.")
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