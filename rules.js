var bayrell_rtl = require('bayrell_rtl');
var rtl = bayrell_rtl.rtl;


base_path = '';
if (typeof __dirname != 'undefined') base_path = rtl.clone(__dirname);
else if (typeof global.__dirname != 'undefined') base_path = rtl.clone(global.__dirname);


module.exports = {
	'type': 1,
	'base_path': base_path,
	'files': [
		'Descriptions/ProviderDescription',
		'Descriptions/ProviderFactoryDescription',
		'Exceptions/AssertError',
		'Exceptions/IndexOutOfRange',
		'Exceptions/KeyNotFound',
		'Exceptions/RuntimeException',
		'Exceptions/UnknownError',
		'Interfaces/ContextInterface',
		//'Interfaces/ContextObjectInterface',
		'Interfaces/FactoryInterface',
		'Interfaces/MapInterface',
		'Interfaces/ModuleDescriptionInterface',
		'Interfaces/SerializeInterface',
		'Lib/re',
		'Lib/rs',
		'Lib/rtl',
		'Providers/AssertProvider',
		'Providers/AssertProviderInterface',
		'Providers/SerializeStringProviderInterface',
		'Types/Map',
		'Types/Vector',		
		'Context',
		'ContextObject',
		'CoreObject',
		'ModuleDescription',
		'RuntimeConstant',
	],
};
