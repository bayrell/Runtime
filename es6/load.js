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
	"/assets/BayrellRtl/Lib/fs.js",
	"/assets/BayrellRtl/Lib/rs.js",
	"/assets/BayrellRtl/Lib/re.js",
	"/assets/BayrellRtl/Lib/rtl.js",
	"/assets/BayrellRtl/Types/Map.js",
	"/assets/BayrellRtl/Types/PathInfo.js",
	"/assets/BayrellRtl/Types/Vector.js",
	"/assets/BayrellRtl/CoreObject.js",
	"/assets/BayrellRtl/RuntimeConstant.js",
	"/assets/BayrellRtl/Exceptions/RuntimeException.js",
	"/assets/BayrellRtl/Interfaces/CloneableInterface.js",
	"/assets/BayrellRtl/Interfaces/ContextInterface.js",
	"/assets/BayrellRtl/Interfaces/FactoryInterface.js",
	"/assets/BayrellRtl/Interfaces/MapInterface.js",
	"/assets/BayrellRtl/Interfaces/ModuleDescriptionInterface.js",
	"/assets/BayrellRtl/Interfaces/SerializeInterface.js",
	"/assets/BayrellRtl/Interfaces/StringInterface.js",
	"/assets/BayrellRtl/Providers/AssertInterface.js",
	"/assets/BayrellRtl/Providers/LogInterface.js",
	"/assets/BayrellRtl/Providers/SerializeStringInterface.js",
])

.load([
	"/assets/BayrellRtl/Context.js",
	"/assets/BayrellRtl/ContextFactory.js",
	"/assets/BayrellRtl/ContextObject.js",
	"/assets/BayrellRtl/ModuleDescription.js",
	"/assets/BayrellRtl/ProviderDescription.js",
	"/assets/BayrellRtl/Exceptions/AssertError.js",
	"/assets/BayrellRtl/Exceptions/IndexOutOfRange.js",
	"/assets/BayrellRtl/Exceptions/KeyNotFound.js",
	"/assets/BayrellRtl/Exceptions/UnknownError.js",
	"/assets/BayrellRtl/Lib/Utils.js",
	"/assets/BayrellRtl/Types/Pipe.js",	
])

.load([
	"/assets/BayrellRtl/NewInstanceContainer.js",
])

.success(function(){
	$load.deliver('BayrellRtl_loaded');
});

