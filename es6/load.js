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


$load([
	"/assets/Runtime/rs.js",
	"/assets/Runtime/re.js",
	"/assets/Runtime/rtl.js",
	"/assets/Runtime/Map.js",
	"/assets/Runtime/Utils.js",
	"/assets/Runtime/Vector.js",
	"/assets/Runtime/CoreObject.js",
	"/assets/Runtime/RuntimeConstant.js",
	"/assets/Runtime/Exceptions/RuntimeException.js",
	"/assets/Runtime/Interfaces/AssetsInterface.js",
	"/assets/Runtime/Interfaces/CloneableInterface.js",
	"/assets/Runtime/Interfaces/ContextInterface.js",
	"/assets/Runtime/Interfaces/FactoryInterface.js",
	"/assets/Runtime/Interfaces/ModuleDescriptionInterface.js",
	"/assets/Runtime/Interfaces/SerializeInterface.js",
	"/assets/Runtime/Interfaces/StringInterface.js",
	"/assets/Runtime/Interfaces/SubscribeInterface.js",
])

.load([
	"/assets/Runtime/Context.js",
	"/assets/Runtime/ContextObject.js",
	"/assets/Runtime/Emitter.js",
	"/assets/Runtime/SerializeContainer.js",
	"/assets/Runtime/VectorString.js",
	"/assets/Runtime/Exceptions/IndexOutOfRange.js",
	"/assets/Runtime/Exceptions/KeyNotFound.js",
	"/assets/Runtime/Exceptions/UnknownError.js",
])

.load([
	"/assets/Runtime/ModuleDescription.js",
])

.success(function(){
	$load.deliver('Runtime_loaded');
});

