var bayrell_rtl = require('bayrell_rtl');
var rtl = bayrell_rtl.rtl;


base_path = '';
if (typeof __dirname != 'undefined') base_path = rtl.clone(__dirname);
else if (typeof global.__dirname != 'undefined') base_path = rtl.clone(global.__dirname);


module.exports = {
	'type': 1,
	'base_path': base_path,
	'files': [
		'Exceptions/AssertError',
		'Exceptions/IndexOutOfRange',
		'Exceptions/KeyNotFound',
		'Exceptions/RuntimeException',
		'Exceptions/UnknownError',
		'Interfaces/CloneableInterface',
		'Interfaces/ContextInterface',
		'Interfaces/FactoryInterface',
		'Interfaces/MapInterface',
		'Interfaces/ModuleDescriptionInterface',
		'Interfaces/SerializeInterface',
		'Interfaces/StringInterface',
		'Providers/AssertInterface',
		'Providers/LogInterface',
		'Providers/SerializeStringInterface',
		'Lib/fs',
		'Lib/re',
		'Lib/rs',
		'Lib/rtl',
		'Lib/Utils',
		'Types/Map',
		'Types/PathInfo',
		'Types/Pipe',
		'Types/Vector',		
		'Context',
		'ContextFactory',
		'ContextObject',
		'CoreObject',
		'ModuleDescription',
		'NewInstanceContainer',
		'ProviderDescription',
		'RuntimeConstant',
	],
};
