"use strict";
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

function runWebApp(env, module_name, app_name)
{
	/* Use */
	var rtl = use("Runtime.rtl");
	var Collection = use("Runtime.Collection");
	var Dict = use("Runtime.Dict");
	var Context = use("Runtime.Context");

	/* Get enviroment */
	if (env == undefined) env = {};
	env = Dict.from(env);

	/* Create context */
	var context = Context.create(null, Dict.from(env));
	var ctx = context;
	
	/* Set context params */
	context = context.copy
	(
		context,
		{
			"start_time": Date.now(),
		}
	);
	
	/* Set entry point */
	context = context.constructor.setMainModule(ctx, context, module_name);
	context = context.constructor.setMainClass(ctx, context, app_name);
	context = context.constructor.setEntryPoint(ctx, context, app_name);

	/* Set global context */
	rtl.setContext(context);

	/* Run app */
	(async () => {
		try
		{
			/* Init context */
			context = await context.constructor.init(ctx, context);
			
			/* Start context */
			context = await context.constructor.start(ctx, context);
			
			/* Set global context */
			window["globalContext"] = context;
			rtl.setContext(context);
			
			/* Run app */
			await context.constructor.run(ctx, context);
		}
		catch (e)
		{
			console.log( e.stack );
		}
	})();
}