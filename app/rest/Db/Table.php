<?php


class Db_Table
{

    /**
     * PDO Connection
     */
    private $connexion;

    /**
     * Table name
     */
    protected $tableName;

    /**
     * Nom de la colonne PK
     */
    protected $idColumn;

    /**
     * Nom de la classe de rangée
     */
    protected $rowClassName;

    /**
     * Constructeur de la classe
     *
     * @param PDO    $cnx       PDO Connexion si la valeur est null alors une instance du singleton sera chargée
     * @param string $tableName Nom de la table dans la base de données
     * @param string $idColumn  Column Pk de la table
     *
     * @return void
     */
    public function __construct($options = array())
    {
        $this->connexion = Db_Connexion::getInstance();
        foreach($options as $key => $value) {
            $this->$key = $value;
        }
        if (isset($this->rowClassName)) {
            require_once(str_replace('_', '/', $this->rowClassName) . '.php');
        }
    }

    private function _serializeFilter($filter)
    {
        $binds = array();
        $sql = '';
        if (($filter != null) && (is_array($filter)) && (count($filter)>0)) {
            $sql .= ' WHERE ';
            $conditions = array();
            
            foreach($filter as $column=>$value) {
                $conditions[] = '`' . $column . '` = :f' . $column;
                $binds[':f'.$column] = $value;
            }
            $sql .= implode(' AND ', $conditions);
        }
        return array(
            'sql' => $sql,
            'binds' => $binds,
        );
    }

    private function _serializeOptions($options)
    {
        $binds = array();
        $sql = '';
        if ((isset($options['condition'])) && (count($options['condition'])>0)) {
            $conditionList = array();
            foreach ($options['condition'] as $index=>$cond) {
                $conditionList[] = '`' . $cond['column'] . '` LIKE :cond' . $cond['column'].$index . ' ';
                $binds[':cond' . $cond['column'].$index] = '%'.$cond['value'].'%';
            }
            $sql.= ' WHERE ' . implode(' '. $options['conditionOperator'] .' ', $conditionList);
        }

        if (isset($options['order'])) {
            $sql .= ' ORDER BY ' . $options['order'];
        }

        if (isset($options['columns'])) {
            $columns = '';
            foreach ($options['columns'] as $column) {
                $columns .= ' `' . $column . '`';
            }
        } else {
            $columns = '*';
        }

        return array(
            'sql' => $sql,
            'binds' => $binds,
            'columns' => $columns,
        );
    }

    /**
     * Méthode qui retourne tous les éléments d'une table
     *
     * @return les données de la table
     */
    public function find($filter=array(), $options=array())
    {
        $sql = "SELECT * FROM " . $this->tableName;
        $sFilter = $this->_serializeFilter($filter);
        $sOptions = $this->_serializeOptions($options);
        $sql .= $sFilter['sql'] . $sOptions['sql'];

        $requete = $this->connexion->prepare($sql);
        $requete->setFetchMode(PDO::FETCH_CLASS, $this->rowClassName);
        if ($requete->execute(array_merge($sFilter['binds'], $sOptions['binds']))) {
            if ($donnees = $requete->fetchAll(PDO::FETCH_CLASS)) return $donnees;
        } else {
            return null;
        }
    }

    /**
     * Méthode qui retourne tous les éléments d'une table
     *
     * @return les données de la table
     */
    public function findAll($options=array())
    {
        $sOptions = $this->_serializeOptions($options);
        $sql = 'SELECT ' . $sOptions['columns'] . ' FROM ' . $this->tableName;
        $sql .= $sOptions['sql'];
        $requete = $this->connexion->prepare($sql);
        $requete->setFetchMode(PDO::FETCH_CLASS, $this->rowClassName);
        if ($requete->execute($sOptions['binds'])) {
            $donnees = $requete->fetchAll(PDO::FETCH_CLASS, $this->rowClassName);
            return $donnees;
        } else {
            return null;
        }
    }

    /**
     * Méthode qui retourne tous les éléments d'une table
     *
     * @param $sortingExpr
     * @param $from
     * @param $to
     *
     * @return les données de la table
     */
    public function findAllAdvanced($sortingExpr, $from, $to)
    {
        $sql = "SELECT * FROM " . $this->tableName;
        if ($sortingExpr != null) {
            $sql.=" ORDER BY " . $sortingExpr;
        }
        if ($from != null && $to != null) {
            $sql .=" LIMIT " . $from . "," . $to;
        }
        $requete = $this->connexion->prepare($sql);
        $requete->setFetchMode(PDO::FETCH_CLASS, $this->rowClassName);
        if ($requete->execute()) {
            if ($donnees = $requete->fetch(PDO::FETCH_CLASS)) return $donnees;
        } else {
            return null;
        }
    }

    /**
     * Méthode qui retourne un élément d'une table selon la valeur de la PK
     *
     * @param string $pkVal La valeur de la PK
     *
     * @return l'enregistrement voulu
     */
    public function findById($pkVal)
    {
        $data = null;
        $sql = "SELECT * FROM " . $this->tableName . " WHERE " . $this->idColumn . " = :myVal";
        $requete = $this->connexion->prepare($sql);
        $requete->setFetchMode(PDO::FETCH_CLASS, $this->rowClassName);
        $requete->bindValue(':myVal', $pkVal);
        if ($requete->execute()) {
            if ($donnees = $requete->fetch(PDO::FETCH_CLASS)) {
                $data = $donnees;
            }
        }
        return $data;
    }

    /**
     * Méthode qui supprime un élément d'une table selon la valeur de la PK
     *
     * @param string $pkVal La valeur de la PK
     *
     * @return boolean
     */
    public function deleteById($pkVal)
    {
        $sql = "DELETE FROM " . $this->tableName . " WHERE " . $this->idColumn . " = :myVal";
        $requete = $this->connexion->prepare($sql);
        $requete->bindValue(':myVal', $pkVal);
        if ($requete->execute()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Met à jour des colonnes specifiques de la table
     *
     * @param array  $colNames tableau contenant les noms des colonnes à modifier
     * @param array  $newVals  tableau contenant les nouvelles valeurs
     * @param string $pkVal    valeur de la pk
     *
     * @return boolean
     */
    public function update($data, $filter)
    {
        if (($data != null) && (is_array($data)) && ($filter != null) && (is_array($filter)) && (count($filter)>0)) {
            $sql = "UPDATE " . $this->tableName . " SET ";
            $conditions = array();
            $binds = array();
            foreach ($data as $column => $value) {
                $conditions[] = '`' . $column . '` = :v' . $column;
                $binds[':v'.$column] = $value;
            }
            $sql .= implode(', ', $conditions);
        }

        $sFilter = $this->_serializeFilter($filter);
        $sql .= $sFilter['sql'];

        $requete = $this->connexion->prepare($sql);
        if ($requete->execute(array_merge($binds, $sFilter['binds']))) {
            return true;
        } else {
            return false;
        }
    }

    public function insert($data)
    {
        $keys = array();
        $values = array();
        $binds = array();
        foreach($data as $column => $value) {
            $keys[] = '`' . $column . '`';
            $values[] = ':v' . $column;
            $binds[':v'.$column] = $value;
        }
        $sql = 'INSERT INTO `' . $this->tableName . '` (' . implode(', ', $keys) . ') VALUES (' . implode(', ', $values) . ')';
        $requete = $this->connexion->prepare($sql);
        if ($requete->execute($binds)) {
            return true;
        } else {
            return false;
        }
    }


}
