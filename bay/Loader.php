<?php

class Loader
{
	var $entry_point = "";
	var $modules = [];
	var $params = [
		"environments" => [],
	];
	var $search_path = [];
	
	
	/**
	 * Set base path
	 */
	function setBasePath($base_path)
	{
		$this->params["base_path"] = $base_path;
	}
	
	
	/**
	 * Set env
	 */
	function setEnv($key, $value)
	{
		$this->params["environments"]->set($key, $value);
	}
	

	/**
	 * Returns request uri
	 */
	function getRequestUri()
	{
		$request_url = "";
		if (isset($_SERVER["HTTP_X_FORWARDED_PREFIX"]))
		{
			$request_url .= $_SERVER["HTTP_X_FORWARDED_PREFIX"];
		}
		$request_url .= $_SERVER["REQUEST_URI"];
		return $request_url;
	}
	
	
	/**
	 * Create loader
	 */
	static function create(string $base_path)
	{
		$loader = new Loader();
		$loader->include(BASE_PATH . "/plugins/plugins.php");
		$loader->init();
		$loader->include(BASE_PATH . "/init.php");
		return $loader;
	}
	
	
	/**
	 * Init loader
	 */
	function init()
	{
		/* Setup load files */
		spl_autoload_register([ $this, 'load' ]);
		
		/* Setup PHP error handler */
		set_exception_handler([ $this, 'exception' ]);
		
		/* Shutdown */
		register_shutdown_function([ $this, 'shutdown' ]);
		
		/* Init values */
		$this->params["environments"] = new \Runtime\Map();
	}
	
	
	/**
	 * Run app
	 */
	function runApp()
	{
		return \Runtime\rtl::runApp(
			
			/* Entry point */
			$this->entry_point,
			
			/* Modules */
			$this->modules,
			
			/* Context parameters */
			\Runtime\Map::from($this->params)
		);
	}
	
	
	/**
	 * Include modules
	 */
	function include($file_name)
	{
		if (file_exists($file_name))
		{
			$f = require_once $file_name;
			$f($this);
		}
	}
	
	
	/**
	 * Add module
	 */
	function add($module, $path)
	{
		$this->search_path[] = [
			"module" => $module,
			"path" => $path,
		];
	}
	
	
	/**
	 * Load module
	 */
	function loadModule($module_name, $file_path)
	{
		$module_name = implode(".", $module_name);
		$module_name_sz = mb_strlen($module_name);
		$file_name = array_pop($file_path);
		$file_path = implode("/", $file_path);
		
		foreach ($this->search_path as $info)
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
	function load($class_name)
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
	function exception($e)
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
	function shutdown()
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