<?php

/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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

namespace Runtime;

class Callback 
{
	protected $obj;
	protected $name;
	function __construct($obj, $name)
	{
		if (gettype($obj) == "string")
		{
			$obj = \Runtime\rtl::find_class($obj);
			if (!class_exists($obj)){
				throw new \Exception($obj . " not found ");
			}
			if (!method_exists($obj, $name)){
				throw new \Exception("Method '" . $name . "' not found in " . $obj);
			}
		}
		$this->obj = $obj;
		$this->name = $name;
	}
		
	function __invoke()
	{
		return call_user_func_array([$this->obj, $this->name], func_get_args());
	}
	
	function invokeArgs($args)
	{
		return call_user_func_array([$this->obj, $this->name], $args);
	}
}
