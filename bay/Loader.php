<?php

/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
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

class Loader
{
	static $search_path = [];
	
	
	/**
	 * Init loader
	 */
	static function init()
	{
		/* Setup load files */
		spl_autoload_register([ static::class, 'load' ]);
		
		/* Setup PHP error handler */
		set_exception_handler([ static::class, 'exception' ]);
		
		/* Shutdown */
		register_shutdown_function([ static::class, 'shutdown' ]);
	}
	
	
	/**
	 * Add module
	 */
	static function add($module, $path)
	{
		static::$search_path[] = [
			"module" => $module,
			"path" => $path,
		];
	}
	
	
	/**
	 * Load module
	 */
	static function loadModule($module_name, $file_path)
	{
		$module_name = implode(".", $module_name);
		$module_name_sz = mb_strlen($module_name);
		$file_name = array_pop($file_path);
		$file_path = implode("/", $file_path);
		
		foreach (static::$search_path as $info)
		{
			/* If module is exists */
			if ($info["module"] != $module_name)
			{
				continue;
			}
			
			/* Try load file */
			$path = [ $info["path"], $file_path, $file_name . ".php" ];
			$path = array_filter($path, function ($item){ return $item != ""; });
			$path = implode("/", $path);			
			if (file_exists($path))
			{
				include($path);
				return true;
			}			
		}
		
		return false;
	}
	
	
	/**
	 * Load class
	 */
	static function load($class_name)
	{
		$arr = explode("\\", $class_name);
		$arr = array_filter($arr, function ($s){ return $s != ""; });
		
		$arr_count = count($arr);
		for ($i = 1; $i<$arr_count; $i++)
		{
			$module_name = array_slice($arr, 0, $i);
			$file_path = array_slice($arr, $i);
			if (static::loadModule($module_name, $file_path))
			{
				return true;
			}
		}
		
		return false;
	}
	
	
	/**
	 * PHP exception
	 */
	static function exception($e)
	{
		if (!$e) return;
		
		$message = "Fatal Error:\n";
		$message .= $e->getMessage() . "\n";
		$message .= "in file " . $e->getFile() . ":" . $e->getLine() . "\n";
		$message .= $e->getTraceAsString() . "\n";
		
		if (php_sapi_name() === 'cli')
		{
			$color = "0;91";
			echo chr(27) . "[" . $color . "m" . $message . chr(27) . "[0m";
			exit (1);
		}
		else
		{
			http_response_code(500);
			echo nl2br($message);
		}
	}
	
	
	/**
	 * PHP shutdown
	 */
	static function shutdown()
	{
		$error = error_get_last();
		if (!$error) return;
		if (in_array($error['type'], [E_WARNING, E_NOTICE])) return;
		
		if (php_sapi_name() === 'cli')
		{
			exit (1);
		}
		else
		{
			http_response_code(500);
		}
	}
}