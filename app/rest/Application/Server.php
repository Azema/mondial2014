<?php

class Application_Server
{
	/**
	 * Constructor
	 */
	public function __construct($config)
	{
		if (preg_match('#^/[^/]*/([^\?]*)#', $_SERVER['REQUEST_URI'], $match)) {
			$this->_resource = str_replace(' ', '', ucwords(str_replace('/', ' ', strtolower($match[1]))));
		}
		$this->_method = $_SERVER['REQUEST_METHOD'];

		switch ($this->_method) {
			case 'GET' :
				$this->_params = $_GET;
				break;
			default:
				$this->_params = $_POST;
				break;
		}
		$this->_config = $config;
		if (empty($this->_resource)) {
			throw new Exception('No resource was specified');
		}
		new Db_Connexion($config['database']);
	}

	/**
	 * Process a request and dispath to resources
	 *
	 * @return json
	 */
	public function processRequest()
	{
		$className = 'Resources_' . $this->_resource;
		if (file_exists(str_replace('_', '/', $className) . '.php')) {
			$methodName = 'call' . ucfirst(strtolower($this->_method));
			$resource = new $className(
				array(
					'params' => $this->_params,
					'config' => $this->_config,
				)
			);
			$reflexion = new ReflectionClass($resource);
			if ($reflexion->hasMethod($methodName)) {
				$result = $resource->$methodName();
				if ($result) {
					header('Content-type: application/json');
					echo json_encode($result);
				} else {
					header('HTTP/1.1 400 Bad Request');
				}
			} else {
				header('HTTP/1.1 405 Method Not Allowed');
				header('Allow: ' . strtoupper(implode(', ', $this->getAllowedMethod($reflexion))));
				echo 'The method ' . $this->_method . ' was not found. Allowed : ' . strtoupper(implode(', ', $this->getAllowedMethod($reflexion)));
			}
		} else {
			header('HTTP/1.1 404 Not Found');
			echo 'The resource was not found';
		}
	}

	/**
	 * List the allowed method of a reflexion class
	 *
	 * @param reflexionClass $reflexion Class Description
	 *
	 * @return array
	 */
	public function getAllowedMethod($reflexion)
	{
		$nameList = array();
		foreach ($reflexion->getMethods() as $method) {
			if (preg_match('#^call(.*)#', $method->name, $match)) {
				$nameList[] = $match[1];
			}
		}
		return $nameList;
	}

}