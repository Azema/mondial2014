<?php


class Db_Users_Table extends Db_Table
{

	protected $tableName = 'users';

	protected $idColumn = 'login';

	protected $rowClassName = 'Db_Users_Row';

    /**
     * Builder
     *
     * @param App_Db_Connexion $cnx connection to Db | null
     */
    public function __construct()
    {
        parent::__construct();
    }

}
