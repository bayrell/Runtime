<?php

class Loader
{
	var $entry_point = "";
	var $env = [];
	var $modules = [];
	var $search_path = [];
	
	
	/**
	 * Init loader
	 */
	function init()
	{
		/* Setup load files */
		spl_autoload_register([ $this, 'load' ]);
		
		/* Setup default handler */
		\Runtime\rtl::set_default_exception_handler();
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
			\Runtime\Map::from($this->env)
		);
	}
	
	
	/**
	 * Include plugins
	 */
	function includePlugins($file_name)
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
		$module_name = implode("\\", $module_name) . "\\";
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
}