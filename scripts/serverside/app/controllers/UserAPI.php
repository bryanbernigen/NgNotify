<?php

class UserAPI extends Controller
{
    public function checkUniqueEmail()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
        if (isset($_GET['email'])) {
            $result = $this->model('User')->checkUniqueEmail($_GET['email']);
            if ($result) {
                json_response_success($result);
                return;
            } else {
                json_response_fail($result);
                return;
            }
        }
    }

    public function checkUniqueUsername()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            json_response_fail(METHOD_NOT_ALLOWED);
            return;
        }
        if (isset($_GET['username'])) {
            $result = $this->model('User')->checkUniqueUsername($_GET['username']);
            if ($result) {
                json_response_success($result);
                return;
            } else {
                json_response_fail($result);
                return;
            }
        }
    }


    public function showAllUser()
    {
        $res = $this->model('User')->showAllUser();
        if ($res) {
            json_response_success($res);
        } else {
            json_response_fail("error");
        }
        return;
    }
}
