/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


module.exports = {
	VERSION: '0.2.0',
	'Exceptions': {},
	'Interfaces': {},
	'Lib': {},
	'Types': {},
};

function combine(obj1, obj2){
	for (var key in obj2){
		if (typeof obj2[key] == 'object'){
			if (obj1[key] == undefined || obj1[key] == null || typeof obj1[key] != 'object')
				obj1[key] = {};
			combine(obj1[key], obj2[key]);
		}
		else{
			obj1[key] = obj2[key];
		}
	}
}


combine( module.exports.Lib, require("./Lib/rtl.js") );
combine( module.exports.Lib, require("./Lib/re.js") );
combine( module.exports, require("./RuntimeError.js") );
combine( module.exports, require("./CoreObject.js") );
combine( module.exports, require("./Exception.js") );
combine( module.exports.Exceptions, require("./Exceptions/ClassException.js") );
combine( module.exports.Interfaces, require("./Interfaces/AssertInterface.js") );
combine( module.exports.Interfaces, require("./Interfaces/ContextInterface.js") );
combine( module.exports.Interfaces, require("./Interfaces/MapInterface.js") );
combine( module.exports.Exceptions, require("./Exceptions/IndexOutOfRange.js") );
combine( module.exports.Exceptions, require("./Exceptions/KeyNotFound.js") );
combine( module.exports.Exceptions, require("./Exceptions/StopIterator.js") );
combine( module.exports.Exceptions, require("./Exceptions/UnknownError.js") );
combine( module.exports.Types, require("./Types/IndexValue.js") );
combine( module.exports.Types, require("./Types/Iterator.js") );
combine( module.exports.Types, require("./Types/Map.js") );
combine( module.exports.Types, require("./Types/Vector.js") );
