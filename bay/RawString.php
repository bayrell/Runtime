<?php

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

namespace Runtime;

class RawString 
{
	protected $s;
	function __construct($s)
	{
		$s = static::normalize($s);
		$this->s = $s;
	}
	function __toString(){ return $this->toString(); }
	function toString()
	{
		return gettype($this->s) == "array" ? implode("", $this->s) : $this->s;
	}
	static function normalize($s)
	{
		if (gettype($s) == "array")
		{
			$arr1 = [];
			foreach ($s as $v)
			{
				if ($v instanceof RawString && gettype($v->s) == "array") $v = $v->s;
				if (gettype($v) == "array")
				{
					$v = static::normalize($v);
					foreach ($v as $v2)
					{
						$arr1[] = $v2;
					}
				}
				else $arr1[] = $v;
			}
			return $arr1;
		}
		return $s;
	}
}
