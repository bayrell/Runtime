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
	"/assets/bayrell_rtl_es6/Lib/rs.js",
	"/assets/bayrell_rtl_es6/Lib/re.js",
	"/assets/bayrell_rtl_es6/Lib/rtl.js",
	"/assets/bayrell_rtl_es6/Types/Map.js",
	"/assets/bayrell_rtl_es6/Types/PathInfo.js",
	"/assets/bayrell_rtl_es6/Types/Vector.js",
	"/assets/bayrell_rtl_es6/CoreObject.js",
	"/assets/bayrell_rtl_es6/RuntimeConstant.js",
	"/assets/bayrell_rtl_es6/Exceptions/RuntimeException.js",
	"/assets/bayrell_rtl_es6/Interfaces/ModuleDescriptionInterface.js",
	"/assets/bayrell_rtl_es6/Interfaces/ContextInterface.js",
	"/assets/bayrell_rtl_es6/Interfaces/FactoryInterface.js",
	"/assets/bayrell_rtl_es6/Interfaces/MapInterface.js",
	"/assets/bayrell_rtl_es6/Interfaces/SerializeInterface.js",
	"/assets/bayrell_rtl_es6/Providers/AssertInterface.js",
	"/assets/bayrell_rtl_es6/Providers/LogInterface.js",
	"/assets/bayrell_rtl_es6/Providers/SerializeStringInterface.js",
])

.load([
	"/assets/bayrell_rtl_es6/Context.js",
	"/assets/bayrell_rtl_es6/ContextFactory.js",
	"/assets/bayrell_rtl_es6/ContextObject.js",
	"/assets/bayrell_rtl_es6/ModuleDescription.js",
	"/assets/bayrell_rtl_es6/ProviderDescription.js",
	"/assets/bayrell_rtl_es6/Lib/Utils.js",
	"/assets/bayrell_rtl_es6/Exceptions/AssertError.js",
	"/assets/bayrell_rtl_es6/Exceptions/IndexOutOfRange.js",
	"/assets/bayrell_rtl_es6/Exceptions/KeyNotFound.js",
	"/assets/bayrell_rtl_es6/Exceptions/UnknownError.js",
])

.success(function(){
	$load.deliver('bayrell_rtl_loaded');
});

