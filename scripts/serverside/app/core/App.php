<?php

class App {
    protected $params = [];
    public function __construct() {
        $url = $this->parseUrl();
        if(file_exists(__DIR__ . '/../controllers/' . $url[0] . '.php')) {
            $this->controller = $url[0];
        }
        else{
            echo json_encode(Array('status' => false, 'message' => 'Api Not Found'));
        }

        require_once __DIR__ . '/../controllers/' . $this->controller . '.php';
        $this->controller = new $this->controller;

        if(isset($url[1])) {
            if(method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }
        else {
            $this->method = $url[0];
        }
        unset($url[0]);

        if (!empty($url)) {
            $this->params = array_values($url);
        }

        call_user_func_array([$this->controller, $this->method], $this->params);
    }

    public function parseURL() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
    }
}