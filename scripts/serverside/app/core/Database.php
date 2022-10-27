<?php

class Database{

    private $dbh;
    private $stmt;

    public function __construct()
    {
        require_once __DIR__ . '/../constants/base.php';
        $option = [
            PDO::ATTR_PERSISTENT => 5,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 600,
            PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
        ];

        try {
            $this->dbh = new PDO('pgsql:host=' . DB_SERVER . ';dbname=' . DB_DATABASE, DB_USERNAME, DB_PASSWORD, $option);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    public function startTransaction(){
        return $this->dbh->beginTransaction();
    }
    
    public function commit(){
        return $this->dbh->commit();
    }
    
    public function rollback(){
        $this->dbh->rollBack();
    }

    public function query($query)
    {
        $this->stmt = $this->dbh->prepare($query);
    }

    public function bind($param, $value, $type = null)
    {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }

        $this->stmt->bindValue($param, $value, $type);
    }

    public function execute()
    {
        try {
            $this->stmt->execute();
        } catch (\Throwable $th) {
            return false;
        }
    }   

    public function resultSet()
    {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function single()
    {
        try {
            $this->execute();
            return $this->stmt->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return false;
        }
    }
}