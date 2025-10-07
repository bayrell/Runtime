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


var exports = {
	VERSION: '0.11.8',
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

add("Runtime.re");
add("Runtime.rtl");
add("Runtime.rs");
add("Runtime.fs");
add("Runtime.Map");
add("Runtime.Vector");
add("Runtime.BaseObject");
add("Runtime.BaseProvider");
add("Runtime.BaseStruct");
add("Runtime.Callback");
add("Runtime.Context");
add("Runtime.Date");
add("Runtime.DateTime");
add("Runtime.Reference");
add("Runtime.Entity.Entity");
add("Runtime.Entity.Hook");
add("Runtime.Entity.Provider");
add("Runtime.Exceptions.AbstractException");
add("Runtime.Exceptions.ApiError");
add("Runtime.Exceptions.AssertException");
add("Runtime.Exceptions.CurlException");
add("Runtime.Exceptions.IndexOutOfRange");
add("Runtime.Exceptions.ItemNotFound");
add("Runtime.Exceptions.KeyNotFound");
add("Runtime.Exceptions.RuntimeException");
add("Runtime.Hooks.BaseHook");
add("Runtime.Hooks.RuntimeHook");
add("Runtime.Providers.HookProvider");
add("Runtime.Providers.OutputProvider");
add("Runtime.ModuleDescription");

module.exports = exports;