<?php

function __autoload($class_name)
{
    require_once(str_replace('_', '/', $class_name) . '.php');
}

define('APPLICATION_PATH', dirname(__FILE__) . '/');

// set include path
set_include_path(
	get_include_path() . PATH_SEPARATOR . APPLICATION_PATH
);