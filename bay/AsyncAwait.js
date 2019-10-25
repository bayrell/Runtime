"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var isBrowser = function(){return typeof window !== "undefined" && this === window;}
var use = null;
if (isBrowser())
use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ?Runtime.rtl.find_class : null;
else use = require('bayrell').use;

if (typeof Runtime == 'undefined') Runtime = {};
if (!isBrowser())
{
	if (module.exports == undefined) module.exports = {};
	if (module.exports.Runtime == undefined) module.exports.Runtime = {};
}

Runtime.AsyncTask = function()
{
	use('Runtime.CoreStruct').apply(this, arguments);
};
Runtime.AsyncTask.prototype = Object.create(use('Runtime.CoreStruct').prototype);
Runtime.AsyncTask.prototype.constructor = Runtime.AsyncTask;
Object.assign(Runtime.AsyncTask.prototype,
{
	_init: function()
	{
		var defProp = use("Runtime.rtl.defProp");
		var a = Object.getOwnPropertyNames(this);
		this.__pos = null;
		this.__err = null;
		this.__vars = use('Runtime.Dict').create({});
		this.__res = null;
		this.__res_name = null;
		this.__f = null;
		if (a.indexOf("pos") == -1) defProp(this, "pos");
		if (a.indexOf("err") == -1) defProp(this, "err");
		if (a.indexOf("vars") == -1) defProp(this, "vars");
		if (a.indexOf("res") == -1) defProp(this, "res");
		if (a.indexOf("res_name") == -1) defProp(this, "res_name");
		if (a.indexOf("f") == -1) defProp(this, "f");
		Runtime.CoreStruct.prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.AsyncTask"))
		{
			this.__pos = o.__pos;
			this.__err = o.__err;
			this.__vars = o.__vars;
			this.__res = o.__res;
			this.__res_name = o.__res_name;
			this.__f = o.__f;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "pos") this.__pos = v;
		else if (k == "err") this.__err = v;
		else if (k == "vars") this.__vars = v;
		else if (k == "res") this.__res = v;
		else if (k == "res_name") this.__res_name = v;
		else if (k == "f") this.__f = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "pos")return this.__pos;
		else if (k == "err")return this.__err;
		else if (k == "vars")return this.__vars;
		else if (k == "res")return this.__res;
		else if (k == "res_name")return this.__res_name;
		else if (k == "f")return this.__f;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.AsyncTask";
	},
});
Object.assign(Runtime.AsyncTask, use("Runtime.CoreStruct"));
Object.assign(Runtime.AsyncTask,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.AsyncTask";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.AsyncTask",
			"name": "Runtime.AsyncTask",
			"annotations": Collection.create([]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("pos");
			a.push("err");
			a.push("vars");
			a.push("res");
			a.push("res_name");
			a.push("f");
		}
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		return use("Runtime.Collection").create([]);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});

if (isBrowser()) window["class.Runtime.AsyncTask"] = Runtime.AsyncTask;
else{ use.add(Runtime.AsyncTask); module.exports.Runtime.AsyncTask = Runtime.AsyncTask; }


Runtime.AsyncThread = function()
{
	use('Runtime.CoreStruct').apply(this, arguments);
};
Runtime.AsyncThread.prototype = Object.create(use('Runtime.CoreStruct').prototype);
Runtime.AsyncThread.prototype.constructor = Runtime.AsyncThread;
Object.assign(Runtime.AsyncThread.prototype,
{
	_init: function()
	{
		var Collection = use("Runtime.Collection");
		var defProp = use("Runtime.rtl.defProp");
		var a = Object.getOwnPropertyNames(this);
		this.__err = new Collection();
		this.__tasks = new Collection();
		if (a.indexOf("err") == -1) defProp(this, "err");
		if (a.indexOf("tasks") == -1) defProp(this, "tasks");
		Runtime.CoreStruct.prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.AsyncThread"))
		{
			this.__err = o.__err;
			this.__tasks = o.__tasks;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "err") this.__err = v;
		else if (k == "tasks") this.__tasks = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "err")return this.__err;
		if (k == "tasks")return this.__tasks;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.AsyncThread";
	},
	last: function()
	{
		return this.tasks.last();
	},
	pos: function()
	{
		return this.tasks.last().pos;
	},
	copyLast: function(obj)
	{
		return this.copy({
			"tasks": this.tasks.setIm(t.tasks.count() - 1, this.tasks.last().copy(obj))
		});
	},
	setVar: function(var_name, value)
	{
		var item = this.tasks.last();
		return t.copyLast({ "vars": item.vars.setIm(var_name, var_name) });
	},
	getVar: function(var_name)
	{
		var item = this.tasks.last();
		return vars.get(var_name);
	},
	call: function(f, res_name)
	{
		var tasks = this.tasks.pushIm(new Runtime.AsyncTask{"pos":0,"f":f,"res_name":res_name});
		return this.copy({ "tasks": tasks });
	},
	ret: function(res)
	{
		var item = this.tasks.last();
		t = this.copy({ "tasks": this.tasks.removeLastIm() });
		return t.setVar(item.res_name,res);
	},
	ret_void: function()
	{
		return this.copy({ "tasks": this.tasks.removeLastIm() });
	},
	jump: function(pos)
	{
		return this.copyLast({"pos":pos});
	},
	catch_push: function(catch_pos)
	{
		var err = t.err.pushIm({ "catch_pos": catch_pos, "count": t.tasks.count() - 1 });
		return t.copy({ "err": err });
	},
	catch_pop: function()
	{
		var err = this.err.removeLastIm();
		return t.copy({ "err": err });
	},
	resolve: function(res)
	{
		setTimeout(()=>{this.run(this.ret(res))},1);
		return null;
	},
});
Object.assign(Runtime.AsyncThread, use("Runtime.CoreStruct"));
Object.assign(Runtime.AsyncThread,
{
	run: function(t)
	{
		while (t.tasks != null and t.tasks.count() > 0)
		{
			try
			{
				var item = t.last();
				t = item.f(t);
				while (t.err.count() > 0 && t.err.last().count >= t.tasks.count())
				{
					t.copy({ "err": t.err.removeLastIm() });
				}
			}
			catch (var e)
			{
				if (t.err.count() > 0)
				{
					var item = t.err.last();
					var err = t.err.removeLastIm();
					var tasks = t.tasks.slice(0, item.count + 1);
					t = t.copy({ "err": err, "tasks": tasks }).copyLast({ "pos": item.catch_pos });
				}
				else
				{
					throw e;
				}
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.AsyncThread";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.AsyncThread",
			"name": "Runtime.AsyncThread",
			"annotations": Collection.create([]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("tasks");
		}
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		return use("Runtime.Collection").create([]);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
};

if (isBrowser()) window["class.Runtime.AsyncThread"] = Runtime.AsyncThread;
else{ use.add(Runtime.AsyncThread); module.exports.Runtime.AsyncThread = Runtime.AsyncThread; }
