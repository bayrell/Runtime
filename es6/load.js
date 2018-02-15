/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


$load([
	"/assets/bayrell_rtl_es6/Lib/rs.js",
	"/assets/bayrell_rtl_es6/Lib/rtl.js",
	"/assets/bayrell_rtl_es6/Types/Map.js",
	"/assets/bayrell_rtl_es6/Types/Vector.js",
	"/assets/bayrell_rtl_es6/CoreObject.js",
	"/assets/bayrell_rtl_es6/RuntimeConstant.js",
	"/assets/bayrell_rtl_es6/Context.js",
	"/assets/bayrell_rtl_es6/Exceptions/RuntimeException.js",
])

.load([
	"/assets/bayrell_rtl_es6/Exceptions/AssertError.js",
	"/assets/bayrell_rtl_es6/Exceptions/IndexOutOfRange.js",
	"/assets/bayrell_rtl_es6/Exceptions/KeyNotFound.js",
	"/assets/bayrell_rtl_es6/Exceptions/UnknownError.js",
	"/assets/bayrell_rtl_es6/Providers/AssertProvider.js",
])

.success(function(){
	$load.deliver('bayrell_rtl_loaded');
});

