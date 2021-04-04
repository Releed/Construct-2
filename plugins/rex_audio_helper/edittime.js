function GetPluginSettings()
{
	return {
		"name":			"Audio helper",
		"id":			"Rex_audio_helper",
		"version":		"0.1",   		
		"description":	"音频对象的一些辅助模式--需要官方音频插件做前置",
		"author":		"Rex.Rainbow",
		"help url":		"https://rexrainbow.github.io/C2RexDoc/c2rexpluginsACE/plugin_rex_audio_helper.html",
		"category":		"Rex - Media",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddStringParam("Tag", "一个用来备注的标签，后续用来引用此音频。", '""');
AddCondition(1, 0, "正在淡出", "淡出", 
             "音频 <i>{0}</i> 正在淡出", 
             "如果音频渐弱，则返回true.", "IsFading");
             
//////////////////////////////////////////////////////////////
// Actions     
AddAudioFileParam("音频文件", "选择一个音频文件（必须为.ogg格式）.");
AddComboParamOption("不循环");
AddComboParamOption("循环");
AddComboParam("循环", "是否循环播放音频 (重复).", 0);
AddAnyTypeParam("结束音量", '通过线性插值从 (1~0) 映射到 (0db~-60db). 或通过字符串（例如"0dB"）设置dB音量', 1);
AddStringParam("标签 (可选项)", "一个用来备注的标签，后续用来引用此音频.", '""');
AddNumberParam("音频淡入时间", "淡入时间，以秒为单位.", 1);
AddAnyTypeParam("起始音量", '通过线性插值从 (1~0) 映射到 (0db~-60db). 或通过字符串（例如"0dB"）设置dB音量', '"-60dB"');
AddAction(1, 0, "音频播放(文件)", "Playback", 
          "播放音频 <b>{0}</b> (标签 <i>{3}</i>) 以<b>{1}</b>方式  起始音量 <i>{5}</i> 结束音量 <i>{2}</i> 淡入时间 <i>{4}</i> 秒", 
          "音频文件淡入播放.", "Play");    

AddStringParam("Tag", "The tag identifying the sound to stop.  Leave empty to affect the last played sound.", '""');
AddNumberParam("Fade-out", "The duration of fade-out, in second.", 1);
AddAnyTypeParam("Stop volume", 'Mapping from (1~0) to (0db~-60db) with linear interpolation. Or set volume in dB by string like "0dB"', '"-60dB"');
AddAction(2, 0, "Stop", "Playback", 
         "Stop <i>{0}</i> with fade-out volume to <i>{2}</i> in <i>{1}</i> second", 
         "Stop a sound from playing with fade-out.", "Stop");

AddStringParam("Tag", "The tag identifying the sound to loop.  Leave empty to affect the last played sound.", '""');
AddAnyTypeParam("Volume", 'Mapping from (1~0) to (0db~-60db) with linear interpolation. Or set volume in dB by string like "0dB"', 1);
AddNumberParam("Fade", "The duration of fade, in second.", 1);
AddAction(3, 0, "Set volume", "Volume", 
          "Set <b>{0}</b> volume to <i>{1}</i> with fade to <i>{2}</i> second", 
          "Set the volume (loudness) of a sound with fade.", "SetVolume");

AddComboParamOption("Sounds");
AddComboParamOption("Music");
AddComboParam("Folder", "Choose the folder which contains the audio file.");
AddStringParam("Audio file name", "A string with the name of the audio file to play, without the file extension.  For example, to play myfile.ogg, use only \"myfile\".");
AddComboParamOption("not looping");
AddComboParamOption("looping");
AddComboParam("Loop", "Whether or not to initially play the sound in a loop (repeating).", 0);
AddAnyTypeParam("End volume", 'Mapping from (1~0) to (0db~-60db) with linear interpolation. Or set volume in dB by string like "0dB"', 1);
AddStringParam("Tag (optional)", "A tag, which can be anything you like, to use to reference this sound in future.", '""');
AddNumberParam("Fade-in time", "The duration of fade-in, in second.", 1);
AddAnyTypeParam("Start volume", 'Mapping from (1~0) to (0db~-60db) with linear interpolation. Or set volume in dB by string like "0dB"', '"-60dB"');
AddAction(4, 0, "Play (by name)", "Playback", 
          "Play <b>{1}</b> {2} from {0} (tag <i>{4}</i>) with fade-in volume from <i>{6}</i> to <i>{3}</i> in <i>{5}</i> second", 
          "Play an audio file using a string for the filename with fade.", "PlayByName");

AddStringParam("Tag", "The audio tag to pause or resume.");
AddComboParamOption("Pause");
AddComboParamOption("Resume");
AddComboParam("State", "Whether to pause or resume the sound with the given tag.");
AddNumberParam("Fade", "The duration of fade, in second.", 1);
AddAction(5, 0, "Set paused", "Playback", 
          "{1} tag <i>{0}</i> with fade to <i>{2}</i> second", 
          "Pause or resume audio with a given tag with fade.", "SetPaused");

AddStringParam("Audio file", "Audio file string", "");
AddAction(50, 0, "Preload", "Preload", 
          "Preload <b>{0}</b>", 
          "Download an audio file from the server without playing it. This ensures it will play immediately.", "Preload");      
//////////////////////////////////////////////////////////////
// Expressions


ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_combo,	"Audio effect",	"No",	"Use audio effect to do fading.", "No|Yes"),
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
	return new IDEInstance(instance, this);
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

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
