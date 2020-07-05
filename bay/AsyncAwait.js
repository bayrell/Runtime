"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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

if (typeof use == "undefined")
{
	if (typeof window === "undefined" || this !== window) use = require('bayrell').use;
}

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
	_init: function(ctx)
	{
		this.pos = null;
		this.err = null;
		this.vars = use('Runtime.Dict').from({});
		this.res = null;
		this.res_name = null;
		this.f = null;
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
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
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "pos") this.__pos = v;
		else if (k == "err") this.__err = v;
		else if (k == "vars") this.__vars = v;
		else if (k == "res") this.__res = v;
		else if (k == "res_name") this.__res_name = v;
		else if (k == "f") this.__f = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "pos")return this.__pos;
		else if (k == "err")return this.__err;
		else if (k == "vars")return this.__vars;
		else if (k == "res")return this.__res;
		else if (k == "res_name")return this.__res_name;
		else if (k == "f")return this.__f;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
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
		return new IntrospectionInfo(ctx,{
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.AsyncTask",
			"name": "Runtime.AsyncTask",
			"annotations": Collection.from([]),
		});
	},
	getFieldsList: function(ctx,f)
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
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(ctx)
	{
		return use("Runtime.Collection").create([]);
	},
	getMethodInfoByName: function(ctx,field_name)
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
	_init: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		this.err = new Collection(ctx);
		this.tasks = new Collection(ctx);
		Runtime.CoreStruct.prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.AsyncThread"))
		{
			this.__err = o.__err;
			this.__tasks = o.__tasks;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "err") this.__err = v;
		else if (k == "tasks") this.__tasks = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "err")return this.__err;
		if (k == "tasks")return this.__tasks;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.AsyncThread";
	},
	lastTask: function(ctx)
	{
		return this.tasks.last(ctx);
	},
	pos: function(ctx)
	{
		return this.tasks.last(ctx).pos;
	},
	copyLastTask: function(ctx, obj)
	{
		return this.copy(ctx,{
			"tasks": this.tasks.setIm(ctx, this.tasks.count(ctx) - 1, this.tasks.last(ctx).copy(ctx,obj))
		});
	},
	setVar: function(ctx, var_name, value)
	{
		var item = this.tasks.last(ctx);
		if (item == null) return this;
		return this.copyLastTask(ctx, { "vars": item.vars.setIm(ctx, var_name, value) });
	},
	getVar: function(ctx, var_name)
	{
		var item = this.tasks.last(ctx);
		return item.vars.get(ctx, var_name);
	},
	getErr: function(ctx)
	{
		var item = this.tasks.last(ctx);
		return item.err;
	},
	call: function(ctx, f, res_name)
	{
		var tasks = this.tasks.pushIm(ctx, new Runtime.AsyncTask(ctx, {"pos":"0","f":f,"res_name":res_name} ));
		return this.copy(ctx, { "tasks": tasks });
	},
	ret: function(ctx, res)
	{
		var item = this.tasks.last(ctx);
		var t = this.copy(ctx, { "tasks": this.tasks.removeLastIm(ctx) });
		return t.setVar(ctx, item.res_name, res);
	},
	ret_void: function(ctx)
	{
		return this.copy(ctx, { "tasks": this.tasks.removeLastIm(ctx) });
	},
	jump: function(ctx, pos)
	{
		return this.copyLastTask(ctx, {"pos":pos});
	},
	catch_push: function(ctx, catch_pos)
	{
		var err = this.err.pushIm(ctx, { "catch_pos": catch_pos, "count": this.tasks.count(ctx) - 1 });
		return this.copy(ctx, { "err": err });
	},
	catch_pop: function(ctx)
	{
		var err = this.err.removeLastIm(ctx);
		return this.copy(ctx, { "err": err });
	},
	resolve: function(ctx, res)
	{
		setTimeout(()=>{ this.constructor.run(ctx,this.ret(ctx,res)) },1);
		return null;
	},
});
Object.assign(Runtime.AsyncThread, use("Runtime.CoreStruct"));
Object.assign(Runtime.AsyncThread,
{
	run: function(ctx, t)
	{
		while (t.tasks != null && t.tasks.count() > 0)
		{
			try
			{
				var item = t.lastTask(ctx);
				t = item.f(t);
				if (t == null)
				{
					break;
				}
				while (t.err.count(ctx) > 0 && t.err.last(ctx).count >= t.tasks.count(ctx))
				{
					t.copy(ctx, { "err": t.err.removeLastIm(ctx) });
				}
			}
			catch (e)
			{
				if (t.err.count(ctx) > 0)
				{
					var item = t.err.last(ctx);
					var err = t.err.removeLastIm(ctx);
					var tasks = t.tasks.slice(ctx, 0, item.count + 1);
					t = t
						.copy(ctx,{"err": err, "tasks": tasks})
						.copyLastTask(ctx,{"pos": item.catch_pos, "err": e})
					;
				}
				else
				{
					console.log(e.stack);
					break;
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
		return new IntrospectionInfo(ctx,{
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.AsyncThread",
			"name": "Runtime.AsyncThread",
			"annotations": Collection.from([]),
		});
	},
	getFieldsList: function(ctx,f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("tasks");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		return use("Runtime.Collection").from([]);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});

if (isBrowser()) window["class.Runtime.AsyncThread"] = Runtime.AsyncThread;
else{ use.add(Runtime.AsyncThread); module.exports.Runtime.AsyncThread = Runtime.AsyncThread; }
