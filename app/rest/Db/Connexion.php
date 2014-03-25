<?php


class Db_Connexion extends PDO
{

     private static $_instance;

    /**
     * Builder
     */
    public function __construct($config)
    {
        $dsn = 'mysql:dbname=' . $config['name'] . ';host=' . $config['host'];
        parent::__construct($dsn, $config['login'], $config['password']);
        self::$_instance = $this;
    }

    /**
     * Singleton
     *
     * @return Db_Connexion
     */
    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            try {
                self::$_instance = new self();
            }catch (PDOException $e) {
                echo $e;
                die('SQL Error');
            }
        }
        return self::$_instance;
    }

}
