<?php
require_once('Bootstrap.php');

$application = new Application_Server(Application_Config::parse('config/application.ini'));

$application->processRequest();
