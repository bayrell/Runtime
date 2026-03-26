/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const { use } = require("bay-lang");


var exports = {
	VERSION: '1.0',
	MODULE_NAME: 'Runtime',
}

function add(name)
{
	var module_name = exports.MODULE_NAME;
	
	name = name
		.substr(module_name.length + 1)
		.replace(".", "/")
	;
	
	var path = __dirname + "/" + name + ".js";
	require(path);
}

const ClassException = function(message, code, prev)
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
	this.message = message;
	this.code = code;
	this.prev = prev;
}
ClassException.prototype = Object.create(Error.prototype);
ClassException.prototype.constructor = ClassException;
Object.assign(ClassException.prototype,
{
	_init: function(){},
});
Object.assign(ClassException,
{
	getNamespace: function(){ return "Runtime.Exceptions"; },
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
use.add(ClassException);

add("Runtime.re");
add("Runtime.rtl");
add("Runtime.rs");
add("Runtime.fs");
add("Runtime.Map");
add("Runtime.Vector");
add("Runtime.BaseObject");
add("Runtime.BaseModel");
add("Runtime.BaseDTO");
add("Runtime.BaseLayout");
add("Runtime.BaseProvider");
add("Runtime.BaseStorage");
add("Runtime.BusHttp");
add("Runtime.BusInterface");
add("Runtime.ApiResult");
add("Runtime.Method");
add("Runtime.Chain");
add("Runtime.ChainAsync");
add("Runtime.ClearLayout");
add("Runtime.Component");
add("Runtime.Context");
add("Runtime.Curl");
add("Runtime.Date");
add("Runtime.DateRange");
add("Runtime.DateTime");
add("Runtime.DefaultLayout");
add("Runtime.FactoryInterface");
add("Runtime.Listener");
add("Runtime.Message");
add("Runtime.Money");
add("Runtime.RawString");
add("Runtime.Reference");
add("Runtime.RenderContainer");
add("Runtime.SerializeInterface");
add("Runtime.StringInterface");
add("Runtime.VirtualDom");
add("Runtime.Entity.Entity");
add("Runtime.Entity.Factory");
add("Runtime.Entity.Hook");
add("Runtime.Entity.Provider");
add("Runtime.Exceptions.RuntimeException");
add("Runtime.Exceptions.ApiError");
add("Runtime.Exceptions.AssertException");
add("Runtime.Exceptions.CurlException");
add("Runtime.Exceptions.DataError");
add("Runtime.Exceptions.FieldException");
add("Runtime.Exceptions.IndexOutOfRange");
add("Runtime.Exceptions.ItemNotFound");
add("Runtime.Exceptions.KeyNotFound");
add("Runtime.Hooks.BaseHook");
add("Runtime.Hooks.RuntimeHook");
add("Runtime.Providers.GlobalHash");
add("Runtime.Providers.HookProvider");
add("Runtime.Providers.OutputProvider");
add("Runtime.Providers.RenderContent");
add("Runtime.Providers.RenderProvider");
add("Runtime.Serializer.BaseType");
add("Runtime.Serializer.TypeError");
add("Runtime.Serializer.Allowed");
add("Runtime.Serializer.BooleanType");
add("Runtime.Serializer.ConstantType");
add("Runtime.Serializer.DateTimeType");
add("Runtime.Serializer.IntegerType");
add("Runtime.Serializer.JsonType");
add("Runtime.Serializer.MapType");
add("Runtime.Serializer.ObjectType");
add("Runtime.Serializer.Required");
add("Runtime.Serializer.StringType");
add("Runtime.Serializer.VectorType");
add("Runtime.ModuleDescription");

module.exports = exports;