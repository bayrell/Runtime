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
	public $env = [];
	public $base_path = "";
	public $main_class = "";
	public $main_module = "";
	public $include_path = [];
	public $return_code = 0;
	public $start_time = 0;
	public $main_module_class = "";
	public $main_class_name = "";
	
	
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
	 * Set main class
	 */
	function main_class($value)
	{
		$this->main_class = $value;
		return $this;
	}
	
	
	/**
	 * Set main module
	 */
	function main_module($value)
	{
		$this->main_module = $value;
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
	 * Set env
	 */
	function set_env($env)
	{
		$this->env = $env;
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
	 * Init
	 */
	function init()
	{
		$main_module = $this->main_module;
		$main_module_class = "";
		if ($main_module != "")
		{
			$main_module_class = $main_module . ".ModuleDescription";
			$main_module_class = \Runtime\rtl::find_class($main_module_class);
			if ($main_module_class == "")
			{
				throw new \Exception("Module " . $main_module . " not found");
			}
		}
		
		$main_class = $this->main_class;
		if ($main_class == "")
		{
			$main_class = "Runtime.Context";
		}
		
		$class_name = \Runtime\rtl::find_class($main_class);
		if ($class_name == "")
		{
			throw new \Exception("Context " . $main_class . " not found");
		}
		
		$this->main_module_class = $main_module_class;
		$this->main_class_name = $class_name;
	}
	
	
	
	/**
	 * Create context
	 */
	function create_context()
	{
		$main_module_class = $this->main_module_class;
		$main_class_name = $this->main_class_name;
		
		$env = getenv();
		$env = array_merge($env, $this->env);
		$env['BASE_PATH'] = $this->base_path;
		$env = Dict::from($env);
		
		$time = microtime(true) - $this->start_time;
		$s = "[" . round($time * 1000) . "]ms " . "Start create context" . "\n";
		/*var_dump($s);*/
		
		/* Set settings */
		$settings = null;
		if ($main_module_class != "")
		{
			$settings = $main_module_class::appSettings(null, $env);
		}
		
		/* Set modules */
		$modules = null;
		if ($this->main_module != "")
		{
			$modules = Collection::from([ $this->main_module ]);
		}
		
		/* Create app */
		$ctx = $main_class_name::create( null, $env, $settings, $modules );
		$ctx = $ctx->copy($ctx, Dict::from([ "start_time" => $this->start_time ]) );
		
		/* Set global context */
		\Runtime\RuntimeUtils::setContext($ctx);
		
		$ctx::log_timer($ctx, "before init")($ctx, $ctx);
		
		/* Init app */
		if ($main_module_class != "")
		{
			$ctx = $main_module_class::appInit($ctx, $ctx);
		}
		else
		{
			$ctx = $ctx->init($ctx, $ctx);
		}
		
		$ctx::log_timer($ctx, "before start")($ctx, $ctx);
		
		/* Start app */
		if ($main_module_class != "")
		{
			$ctx = $main_module_class::appStart($ctx, $ctx);
		}
		else
		{
			$ctx = $ctx->start($ctx, $ctx);
		}
		
		$ctx::log_timer($ctx, "after start")($ctx, $ctx);
		
		return $ctx;
	}
	
	
	
	/**
	 * Output 404 Error
	 */
	function output_404($container)
	{
		http_response_code(404);
		echo "404 Not found";
	}
	
	
	
	/**
	 * Output Web Resonse
	 */
	function output_web_response($ctx, $container)
	{
		if ($container != null && $container->response)
		{
			http_response_code($container->response->http_code);
			if ($container->cookies != null)
			{
				$keys = $container->cookies->keys($ctx);
				for ($i=0; $i<$keys->count($ctx); $i++)
				{
					$key = $keys->item($ctx, $i);
					$cookie = $container->cookies->item($ctx, $key);
					if ($cookie != null && $cookie->name)
					{
						setcookie(
							$cookie->name,
							$cookie->value,
							$cookie->expire,
							$cookie->path,
							$cookie->domain,
							$cookie->secure,
							$cookie->httponly
						);
					}
				}
			}
			if ($container->response->headers != null)
			{
				$keys = $container->response->headers->keys($ctx);
				for ($i=0; $i<$keys->count($ctx); $i++)
				{
					$key = $keys->item($ctx, $i);
					$value = $container->response->headers->item($ctx, $key);
					header($key . ": " . $value);
				}
			}
			echo $container->response->staticMethod("getContent")($ctx, $container->response);
		}
		else
		{
			$this->output_404($container);
		}
	}
	
	
	
	/**
	 * Run Web Request
	 */
	function run_web_request()
	{
		/* Init */
		$this->init();
		$main_module_class = $this->main_module_class;
		$main_class_name = $this->main_class_name;
		
		/* Create context */
		$ctx = $this->create_context();
		$env = $ctx->enviroments;
		$this->ctx = $ctx;
		
		/* Run request */
		$route_prefix = isset($_SERVER['HTTP_X_ROUTE_PREFIX']) ? $_SERVER['HTTP_X_ROUTE_PREFIX'] : null;
		if ($route_prefix === null) $route_prefix = $env->get($ctx, 'ROUTE_PREFIX', null);
		if ($route_prefix === null) $route_prefix = "";
		$request = \Runtime\Web\Request::createPHPRequest($ctx);
		$request = $request->copy($ctx, new Dict($ctx, [ "route_prefix" => $route_prefix ]) );
		
		try
		{
			if ($main_module_class)
			{
				$container = $main_module_class::appRequest($ctx, $ctx, $request);
			}
			else if ($main_class_name)
			{
				$container = $main_class_name::request($ctx, $ctx, $request);
			}
			else
			{
				throw new \Exception("Main class is not set");
			}
			
			/* Output web response */
			$this->output_web_response($ctx, $container);
		}
		catch (\Exception $ex)
		{
			$this->exception($ex);
		}
		
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
}
