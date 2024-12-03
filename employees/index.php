<?php

/**
 * Tells the browser to allow code from any origin to access
 */


header("Access-Control-Allow-Origin: *");


/**
 * Tells browsers whether to expose the response to the frontend JavaScript code
 * when the request's credentials mode (Request.credentials) is include
 */
header("Access-Control-Allow-Credentials: true");



/**
 * Specifies one or more methods allowed when accessing a resource in response to a preflight request
 */
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");

/**
 * Used in response to a preflight request which includes the Access-Control-Request-Headers to
 * indicate which HTTP headers can be used during the actual request
 */
header("Access-Control-Allow-Headers: Content-Type");

require_once('MysqliDb.php');

class API
{
    public $db;
    public $sql_mode;

    public function __construct()
    {
        $this->db = new MysqliDB('localhost', 'root', '', 'ojt_exercise');
        $this->db->rawQuery("SET SESSION sql_mode = 'STRICT_TRANS_TABLES'");
    }

    /**
     * HTTP GET Request
     *
     * @param $payload
     */
    public function httpGet($payload)
    {
        // Check if payload is an array
        if (!is_array($payload)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'GET',
                'status' => 'failed',
                'message' => 'incorrect parameters',
            ));
            return;
        }

        if (!empty($payload) and !array_key_exists('id', $payload)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'GET',
                'status' => 'failed',
                'message' => 'parameter has no id field',
            ));
            return;
        }

        if (isset($payload['id'])) {
            $this->db->where('employee_id', $payload['id']);
        }

        // Get data
        $data = $this->db->get('employees');
        if ($this->db->getLastErrno() === 0) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'GET',
                'status' => 'success',
                'data' => isset($payload['id']) ? $data[0] : $data,
            ));
            return;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'GET',
                'status' => 'failed',
                'message' => 'Failed Fetch Request',
            ));
            return;
        }
    }

    /**
     * HTTP POST Request
     *
     * @param $payload
     */
    public function httpPost($payload)
    {
        // Your Code starts here

        // Check if payload is an array
        if (!is_array($payload)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'POST',
                'status' => 'failed',
                'message' => 'incorrect parameters'
            ));
            return;
        }

        // Check if payload is empty
        if (empty($payload)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'POST',
                'status' => 'failed',
                'message' => 'empty array'
            ));
            return;
        }

        // Check if payload contains the right fields
        foreach ($payload as $field => $values) {
            if (
                $field != "last_name"
                and $field != "first_name"
                and $field != "middle_name"
                and $field != "suffix_name"
                and $field != "sex"
                and $field != "birthday"
                and $field != "contact"
                and $field != "email"
                and $field != "role"
            ) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    'method' => 'POST',
                    'status' => 'failed',
                    'message' => 'incorrect fields in parameters',
                ));
                return;
            }
        }


        // Insert data
        $id = $this->db->insert('employees', $payload);
        if ($id) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'POST',
                'status' => 'success',
                'data' => $payload
            ));
            return;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'POST',
                'status' => 'failed',
                'message' => 'Failed to Insert Data',
            ));
            return;
        }
    }

    /**
     * HTTP PUT Request
     *
     * @param $id
     * @param $payload
     */
    public function httpPut($id, $payload)
    {
        // Start coding HERE!!
        $id = (int)$id;

        if (empty($id) or $id == null) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'null id in url parameters',
            ));
            return;
        }

        // Check if payload is empty
        if (empty($payload)) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'empty parameters',
            ));
            return;
        }

        // Check if id from url and the id in the payload is same
        if ($id != $payload['employee_id']) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'ids does not match',
            ));
            return;
        }

        // Check if payload contains the right fields
        foreach ($payload as $field => $value) {
            if (
                $field != "employee_id"
                and $field != "last_name"
                and $field != "first_name"
                and $field != "middle_name"
                and $field != "suffix_name"
                and $field != "sex"
                and $field != "birthday"
                and $field != "contact"
                and $field != "email"
                and $field != "role"
            ) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(array(
                    'method' => 'PUT',
                    'status' => 'failed',
                    'message' => 'incorrect fields in parameters',
                ));
                return;
            }
        }

        // Select the task with the matching ID
        $this->db->where('employee_id', $id);

        // Update data
        if ($this->db->update('employees', $payload)) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'success',
                'data' => $payload
            ));
            return;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'Failed to Update Data',
            ));
            return;
        }
    }

    /**
     * HTTP DELETE Request
     *
     * @param $id
     * @param $payload
     */
    public function httpDelete($id, $payload)
    {
        // Start Coding HERE
        $id = (int)$id;

        // Check if id is null or empty
        if (empty($id) or $id == null) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'null id',
            ));
            return;
        }

        // Check if payload is empty
        if (empty($payload) or empty($payload['employee_id'])) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'empty parameters',
            ));
            return;
        }

        // Check if id matches the id in payload
        if ($id != $payload['employee_id']) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'ids does not match',
            ));
            return;
        }

        if (is_array($payload)) {
            $this->db->where("employee_id", $payload, 'IN');
        } else {
            $this->db->where("employee_id", $id);
        }


        if ($this->db->delete('employees')) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'DELETE',
                'status' => 'success',
                'data' => $id
            ));
            return;
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array(
                'method' => 'PUT',
                'status' => 'failed',
                'message' => 'Failed to Delete Data',
            ));
            return;
        }
    }
}

$request_method = $_SERVER['REQUEST_METHOD'];

// For GET,POST,PUT & DELETE Request
if ($request_method === 'GET') {
    $received_data = $_GET;
} else {
    //check if method is PUT or DELETE, and get the ids on URL
    if ($request_method === 'PUT' || $request_method === 'DELETE') {
        $request_uri = $_SERVER['REQUEST_URI'];


        $ids = null;
        $exploded_request_uri = array_values(explode("/", $request_uri));


        $last_index = count($exploded_request_uri) - 1;


        $ids = $exploded_request_uri[$last_index]; //payload data
    }
}

// Retrieve data for request methods POST, PUT, DELETE
if ($request_method != 'GET') {
    $received_data = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
}




$api = new API;

//Checking if what type of request and designating to specific functions
switch ($request_method) {
    case 'GET':
        $api->httpGet($received_data);
        break;
    case 'POST':
        $api->httpPost($received_data);
        break;
    case 'PUT':
        $api->httpPut($ids, $received_data);
        break;
    case 'DELETE':
        $api->httpDelete($ids, $received_data);
        break;
}
