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

use Runtime\Collection;
use Runtime\Dict;


/**
 * Bayrell Loader
 */
class Loader
{
	public $ctx = null;
	public $cli_args = null;
	public $base_path = "";
	public $include_path = [];
	public $return_code = 0;
	public $class_name = "";
	public $main_module = "";
	
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		spl_autoload_register([ $this, 'loadClass' ]);
		register_shutdown_function([ $this, "shutdown" ]);
		$this->start_time = microtime(true);
	}
	
	
	
	/**
	 * Set cli args
	 */
	function set_args($cli_args)
	{
		$this->cli_args = $cli_args;
		return $this;
	}
	
	
	
	/**
	 * Set base path
	 */
	function base_path($value)
	{
		$this->base_path = $value;
		return $this;
	}
	
	
	
	/**
	 * Add include path
	 */
	function add_src($src_path)
	{
		$this->include_path[] = $src_path;
		return $this;
	}
	
	
	/**
	 * Try to load file
	 */
	function tryLoadFile($file_path)
	{
		if (file_exists($file_path))
		{
			include($file_path);
			return true;
		}
		return false;
	}
	
	
	
	/**
	 * Load file
	 */
	function loadFile($arr1, $arr2)
	{
		$module_name = implode(".", $arr1);
		$file_name = array_pop($arr2);
		$path = implode("/", $arr2);
		if ($path) $path .= "/";
		
		foreach ($this->include_path as $file_path)
		{
			$file_path = $file_path . "/" . $module_name . "/php/" . $path . $file_name . ".php";
			if (static::tryLoadFile($file_path))
			{
				return true;
			}			
		}
		
		return false;
	}
	
	
	
	/**
	 * Load class
	 */
	function loadClass($name)
	{
		$arr = explode("\\", $name);
		$sz=count($arr);
		$i=1;
		
		while ($i<$sz)
		{
			$arr1 = array_slice($arr, 0, $i);
			$arr2 = array_slice($arr, $i);
			
			if (static::loadFile($arr1, $arr2))
			{
				return true;
			}
			
			$i++;
		}
		
		return false;
	}
	
	
	
	/**
	 * Shutdown calback
	 */
	function shutdown()
	{
		$ctx = $this->ctx;
		$error = error_get_last();
		if ($ctx != null)
		{
			$logs = $ctx::getLogs($ctx)($ctx, $ctx);
			if ($error !== NULL && $logs != null && $logs->count($ctx) > 0)
			{
				echo "Log:\n";
				echo \Runtime\rs::join("\n", $logs);
			}
		}
	}
	
	
	
	/**
	 * Create context
	 */
	function create_context($class_name, $main_module, $env = null)
	{
		$this->class_name = $class_name;
		$this->main_module = $main_module;
		
		$context_class_name = \Runtime\rtl::find_class($class_name);
		$main_module_class_name = \Runtime\rtl::find_class($main_module . ".ModuleDescription");
		
		/* Prepare env */
		$context_env = getenv();
		if ($env != null) $context_env = array_merge($context_env, $env);
		$context_env['BASE_PATH'] = $this->base_path;
		$context_env = Dict::from($env);
		
		/* Create context */
		$ctx = $context_class_name::create( null, $main_module, $context_env );
		
		/* Set context params */
		$ctx = $ctx->copy($ctx, Dict::from([
			"start_time" => $this->start_time,
			"cli_args" => Collection::from($this->cli_args),
		]) );
		
		/* Assign context */
		$this->ctx = $ctx;
		return $this;
	}
	
	
	
	/**
	 * Set entrypoint
	 */
	function entrypoint($class_name)
	{
		$this->ctx = $this->ctx->copy($this->ctx, Dict::from(["entrypoint"=>$class_name]));
		return $this;
	}
	
	
	
	/**
	 * Run application
	 */
	function run()
	{
		$ctx = $this->ctx;
		$main_module_class_name = \Runtime\rtl::find_class($this->main_module . ".ModuleDescription");
		
		/* Set global context */
		\Runtime\RuntimeUtils::setContext($ctx);
		
		$ctx::log_timer($ctx, "before init")($ctx, $ctx);
		
		/* Init app */
		if ($main_module_class_name != "" && method_exists($main_module_class_name, "appInit"))
		{
			$ctx = $main_module_class_name::appInit($ctx, $ctx);
		}
		else
		{
			$ctx = $ctx->init($ctx, $ctx);
		}
		
		$ctx::log_timer($ctx, "before start")($ctx, $ctx);
		
		/* Start app */
		if ($main_module_class_name != "" && method_exists($main_module_class_name, "appStart"))
		{
			$ctx = $main_module_class_name::appStart($ctx, $ctx);
		}
		else
		{
			$ctx = $ctx->start($ctx, $ctx);
		}
		
		$ctx::log_timer($ctx, "after start")($ctx, $ctx);
		
		/* Run  entrypoint */
		$entrypoint = $ctx->entrypoint;
		$obj = \Runtime\rtl::find_class($entrypoint);
		call_user_func_array([$obj, "run"], [$ctx]);
		
		return $this;
	}
}
