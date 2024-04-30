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
	var obj = require(path);
}

add("Runtime.lib");
add("Runtime.io");
add("Runtime.re");
add("Runtime.rtl");
add("Runtime.rs");
add("Runtime.fs");
add("Runtime.Collection");
add("Runtime.Dict");
add("Runtime.Map");
add("Runtime.Monad");
add("Runtime.Vector");
add("Runtime.BaseObject");
add("Runtime.BaseHook");
add("Runtime.BaseProvider");
add("Runtime.BaseStruct");
add("Runtime.Callback");
add("Runtime.Context");
add("Runtime.Date");
add("Runtime.DateTime");
add("Runtime.Entity");
add("Runtime.Reference");
add("Runtime.Entity.Hook");
add("Runtime.Entity.Provider");
add("Runtime.Exceptions.RuntimeException");
add("Runtime.Exceptions.ApiException");
add("Runtime.Exceptions.AssignStructValueError");
add("Runtime.Exceptions.FileNotFound");
add("Runtime.Exceptions.IndexOutOfRange");
add("Runtime.Exceptions.KeyNotFound");
add("Runtime.Exceptions.UnknownError");
add("Runtime.Hooks.RuntimeHook");
add("Runtime.Providers.HookProvider");
add("Runtime.Providers.OutputProvider");
add("Runtime.ModuleDescription");

module.exports = exports;