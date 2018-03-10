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


module.exports = {
	VERSION: '0.2.0',
	'Exceptions': {
		'AssertError': require("./Exceptions/AssertError.js"),
		'IndexOutOfRange': require("./Exceptions/IndexOutOfRange.js"),
		'RuntimeException': require("./Exceptions/RuntimeException.js"),
		'KeyNotFound': require("./Exceptions/KeyNotFound.js"),
		'UnknownError': require("./Exceptions/UnknownError.js"),
	},
	'Interfaces': {
		'ContextInterface': require("./Interfaces/ContextInterface.js"),
		'FactoryInterface': require("./Interfaces/FactoryInterface.js"),
		'MapInterface': require("./Interfaces/MapInterface.js"),
		'ModuleDescriptionInterface': require("./Interfaces/ModuleDescriptionInterface.js"),
		'SerializeInterface': require("./Interfaces/SerializeInterface.js"),
	},
	'Providers': {
		'AssertProviderInterface': require("./Providers/AssertProviderInterface.js"),
		'SerializeStringProviderInterface': require("./Providers/SerializeStringProviderInterface.js"),
	},
	'Lib': {
		'rtl': require("./Lib/rtl.js"),
		're': require("./Lib/re.js"),
		'rs': require("./Lib/rs.js"),
		'Utils': require("./Lib/Utils.js"),
	},
	'Types': {
		'Map': require("./Types/Map.js"),
		'Vector': require("./Types/Vector.js"),
	},
	'Context': require("./Context.js"),
	'ContextObject': require("./ContextObject.js"),
	'CoreObject': require("./CoreObject.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	'RuntimeConstant': require("./RuntimeConstant.js"),
};


