// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var lastFile = "";
var importList = [];

//Import function
function importfile(filename){
	var filetype = filename.replace(/.*\./i,"");

	if (importList.indexOf(filename)==-1){ //Only imports if file of same name not already imported
		if (filetype=="js"){
			var fileref=document.createElement("script");
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
			importList.push(filename);
		} else if (filetype=="css"){
			var fileref=document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
			importList.push(filename);
		}
		if (typeof fileref!="undefined"){
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	}
};

//Remove function
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i] === what) return i;
            ++i;
        }
        return -1;
    };
};

function removefile(filename){
	var filetype = filename.replace(/.*\./i,"");
	var tagtype = (filetype=="js") ? "script" : (filetype=="css") ? "link" : "none";
	var attrtype = (filetype=="js") ? "src" : (filetype=="css") ? "href" : "none";

	var removeList=document.getElementsByTagName(tagtype);
	for (var i=removeList.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		if (removeList[i] && removeList[i].getAttribute(attrtype)!=null && removeList[i].getAttribute(attrtype).indexOf(filename)!=-1);
		removeList[i].parentNode.removeChild(removeList[i]); //remove element by calling parentNode.removeChild()
	}
	importList.splice(importList.indexOf(filename), 1);
};

/////////////////////////////////////
// Plugin class
cr.plugins_.mck_import = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.mck_import.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;

	};

	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		if (this.properties[0] != ""){
			importfile(this.properties[0]);
			lastFile = this.properties[0];
		}
	};

	instanceProto.onDestroy = function ()
	{
	};

	// only called if a layout object
	instanceProto.draw = function(ctx)
	{
	};

	instanceProto.drawGL = function(glw)
	{
	};

	//////////////////////////////////////
	// Conditions
	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	cnds.CompareFile = function (text, case_)
	{
			return this.properties[0] === text;
	};

	//////////////////////////////////////
	// Actions
	pluginProto.acts = {};
	var acts = pluginProto.acts;
	
	acts.SetFile = function (setName)
	{
		importfile(setName);
		lastFile = setName;
	};

	acts.RemFile = function (remName)
	{
		removefile(remName);
	};

	//////////////////////////////////////
	// Expressions
	pluginProto.exps = {};
	var exps = pluginProto.exps;

	exps.GetFile = function (ret)
	{
		if (lastFile != ""){
			ret.set_string(lastFile);
		} else if (this.properties[0] != ""){
			ret.set_string(this.properties[0]);
		} else {
			ret.set_string("");
		}
	};

}());