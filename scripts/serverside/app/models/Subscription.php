<?php

class Subscription
{
    private $table = 'Subscriptions';
    private $db;

    public function __construct()
    {
        require_once __DIR__ . '/../core/Database.php';
        $this->db = new Database;
    }

    public function newSubscription($creatorId, $subscriberId)
    {
        try {
            $this->db->query("SELECT * FROM $this->table WHERE creator_id = :creator_id AND subscriber_id = :subscriber_id");
            $this->db->bind('creator_id', $creatorId);
            $this->db->bind('subscriber_id', $subscriberId);
            $this->db->execute();
            $result = $this->db->single();
            if ($result) {
                if ($result['status'] == 'REJECTED') {
                    $this->db->query("UPDATE $this->table SET status = 'PENDING' WHERE creator_id = :creator_id AND subscriber_id = :subscriber_id");
                    $this->db->bind('creator_id', $creatorId);
                    $this->db->bind('subscriber_id', $subscriberId);
                }
            } else {
                $this->db->query("INSERT INTO $this->table (creator_id, subscriber_id, status) VALUES (:creator_id, :subscriber_id, 'PENDING')");
                $this->db->bind('creator_id', $creatorId);
                $this->db->bind('subscriber_id', $subscriberId);
                $this->db->execute();
            }
            try {
                $this->db->execute();
                return true;
            } catch (PDOException $e) {
                return  false;
            }
        } catch (\Throwable $th) {
            json_response_fail($th->getMessage());
        }
    }

    public function updateSubscription($creatorId, $subscriberId, $status)
    {
        $this->db->query('UPDATE ' . $this->table . ' SET status = :status WHERE creator_id = :creator_id AND subscriber_id = :subscriber_id');
        $this->db->bind(':creator_id', $creatorId);
        $this->db->bind(':subscriber_id', $subscriberId);
        $this->db->bind(':status', $status);
        try {
            $this->db->execute();
            return true;
        } catch (PDOException $e) {
            return  false;
        }
    }
}
