var bayrell_rtl = require('bayrell_rtl');
var rtl = bayrell_rtl.rtl;


base_path = '';
if (typeof __dirname != 'undefined') base_path = rtl.clone(__dirname);
else if (typeof global.__dirname != 'undefined') base_path = rtl.clone(global.__dirname);


module.exports = {
	'type': 1,
	'base_path': base_path,
	'files': [
		'BayrellAsset',
		'BayrellError',
		'BayrellObject',
		'BayrellDataObject',
		'BayrellObserver',
		'BayrellObservedObject',
		'BayrellTranslate',
		'BayrellCommonParser',
		'BayrellList',
		'BayrellListItem',
		'BayrellModuleInfo',
		'BayrellStringList',
		'BayrellXML',
		're',
		'rtl',
		'rtls',
		'AssetRtl',
		'ModuleInfo',
	],
};
