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
use Runtime\RuntimeUtils;
use Runtime\Core\Context;


/**
 * Bayrell Loader
 */
class Loader
{
	public $exit_code = 0;
	public $start_time = 0;
	public $args = null;
	public $env = null;
	public $main_module = "";
	public $entry_point = "";
	public $include_path = [];
	
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		spl_autoload_register([ $this, 'load' ]);
		register_shutdown_function([ $this, "shutdown" ]);
		$this->start_time = microtime(true);
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
	 * Load module
	 */
	function loadModule($arr1, $arr2)
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
	function load($name)
	{
		$arr = explode("\\", $name);
		$arr = array_filter($arr, function ($s){ return $s != ""; });
		$sz=count($arr);
		$i=1;
		
		while ($i<$sz)
		{
			$arr1 = array_slice($arr, 0, $i);
			$arr2 = array_slice($arr, $i);
			
			if (static::loadModule($arr1, $arr2))
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
		$ctx = RuntimeUtils::getContext();
		$error = error_get_last();
		if ($ctx != null)
		{
			/*
			$logs = $ctx::getLogs($ctx)($ctx, $ctx);
			if ($error !== NULL && $logs != null && $logs->count($ctx) > 0)
			{
				echo "Log:\n";
				echo \Runtime\rs::join("\n", $logs);
			}
			*/
		}
	}
	
	
	
	/**
	 * Excetion
	 */
	function exception($ex)
	{
		echo "<pre>";
		echo "<b>Fatal Error</b>: " . $ex->getMessage();
		echo "\n";
		echo $ex->getTraceAsString();
		echo "</pre>";
	}
	
	
	
	/**
	 * Set enviroment
	 */
	function addIncludePath($value)
	{
		$this->include_path[] = $value;
		return $this;
	}
	
	
	
	/**
	 * Set args
	 */
	function setArgs($value)
	{
		$this->args = $value;
		return $this;
	}
	
	
	
	/**
	 * Set enviroment
	 */
	function setEnv($value)
	{
		$this->env = $value;
		return $this;
	}
	
	
	
	/**
	 * Set main module
	 */
	function setMainModule($value)
	{
		$this->main_module = $value;
		return $this;
	}
	
	
	
	/**
	 * Set entrypoint
	 */
	function setEntryPoint($value)
	{
		$this->entry_point = $value;
		return $this;
	}
	
	
	
	/**
	 * Run application
	 */
	function run()
	{
		/* Create context */
		$context = Context::create(null, Dict::from($this->env));
		
		/* Set context params */
		$context = $context->copy($context, Dict::from([
			"start_time" => time(),
			"cli_args" => Collection::from($this->args),
			"base_path" => getcwd(),
		]));
		
		/* Set main module */
		if ($this->main_module) $context = $context::setMainModule($context, $context, $this->main_module);
		
		/* Set entry point */
		if ($this->entry_point) $context = $context::setEntryPoint($context, $context, $this->entry_point);

		/* Set global context */
		RuntimeUtils::setContext($context);

		/* Run entry */
		$context = $context::run
		(
			$context, $context,
			
			/* Before start */
			function ($ctx, $c){ return $c; },
			
			/* Before run */
			function ($ctx, $c)
			{
				/* Set global context */
				RuntimeUtils::setContext($c);
				return $c;
			},
		);
		
		return $this;
	}
	
}
