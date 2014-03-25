<?php


class Resources_Abstract_Resource
{

	/** @var array */
	protected $config;

	/** @var array */
	protected $params;

	/**
	 * Constructor
	 */
	public function __construct($options)
	{
		foreach ($options as $key => $value) {
			$this->$key = $value;
		}
	}
	
}