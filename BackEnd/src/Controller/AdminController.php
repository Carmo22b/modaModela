<?php

namespace App\Controller;

use App\Controller\AppController;
use Firebase\JWT\JWT;

use Cake\ORM\TableRegistry;

//use Cake\Log\Log;

class AdminController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        //$this->loadComponent('RequestHandler');
    }

    public function loginAdmin()
    {
        try {

            //CORS
            $this->response = $this->response
                ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
                ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            if ($this->request->getMethod() === 'OPTIONS') {
                return $this->response;
            }

            $this->request->allowMethod(['post']);

            $data = $this->request->getData();

            $admin = $this->Admin->find()
                ->where(['usuario' => $data['usuario'], 'senha' => hash('sha256', $data['senha'])])
                ->first();

            if ($admin) {
                $token = JWT::encode(['id' => $admin->id], 'SECRETO123', 'HS256');
                // Define cookie httpOnly e Secure (true em produção)
                setcookie('token', $token, [
                    'expires' => time() + 60 * 60 * 24 * 7, // 7 dias
                    'path' => '/',
                    'secure' => false, // true em produção (HTTPS)
                    'httponly' => true,
                    'samesite' => 'Lax'
                ]);
                $response = ['success' => true, 'message' => 'Login realizado com sucesso!'];
            } else {
                $response = ['success' => false, 'message' => 'Usuário ou senha incorretos!'];
            }

            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;

        } catch(\Exception $e) {
            $response = ['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()];
            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;
        }
    }


    public function verificarAdmin()
    {

        //CORS
        $this->response = $this->response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if ($this->request->getMethod() === 'OPTIONS') {
            return $this->response;
        }

        $token = $_COOKIE['token'] ?? null;

        if (!$token) {
            return $this->response->withStatus(401);
        }

        try {
            JWT::decode($token, new \Firebase\JWT\Key('SECRETO123', 'HS256'));
            return $this->response->withStatus(200);
        } catch (\Exception $e) {
            return $this->response->withStatus(401);
        }
    }


    public function cadastrarMoldes() {

        //CORS
        $this->response = $this->response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type');

        if ($this->request->getMethod() === 'OPTIONS') {
            return $this->response;
        }

        try {
            $this->request->allowMethod(['POST']);

            $Moldes = TableRegistry::getTableLocator()->get('Moldes');

            $molde = $Moldes->newEmptyEntity();
            $data = $this->request->getData();

            $imagem = $data['imagem'];

            $data['preco'] = (float) $data['preco'];

            if ($imagem && $imagem->getError() === UPLOAD_ERR_OK) {

                $ext = pathinfo($imagem->getClientFilename(), PATHINFO_EXTENSION);
                $filename = time() . '_' . uniqid() . '.' . $ext;

                $targetPath = WWW_ROOT . 'img/moldes/' . $filename;

                $imagem->moveTo($targetPath);

                $data['imagem'] = $filename; // salva só o nome no banco
            }

            $molde = $Moldes->patchEntity($molde, $data);

            //Log::debug($data['preco']);

            if ($Moldes->save($molde)) {
                $response = ['success' => true, 'message' => 'Molde cadastrado com sucesso!'];
            } else {
                // Captura erros de validação
                $errors = $molde->getErrors();
                if (!empty($errors)) {
                    $mensagens = [];
                    foreach ($errors as $msgs) {
                        foreach ($msgs as $msg) {
                            $mensagens[] = "$msg";
                        }
                    }
                    $response = ['success' => false, 'message' => implode(' ', $mensagens)];
                } else {
                    $response = ['success' => false, 'message' => 'Erro ao cadastrar molde.'];
                }
            }

            // Retorne JSON e pare o fluxo
            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;

        } catch(\Exception $e) {
            $response = ['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()];

            // Retorne JSON e pare o fluxo
            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;
        }

    }

    public function mostrarMoldes() {

        //CORS
        $this->response = $this->response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type');

        if ($this->request->getMethod() === 'OPTIONS') {
            return $this->response;
        }

        try {
            $this->request->allowMethod(['GET']);

            $Moldes = TableRegistry::getTableLocator()->get('Moldes');

            $moldes = $Moldes->find()->toArray();

            $response = [
                'success' => true,
                'moldes' => $moldes
            ];

            $this->response = $this->response
                ->withType('application/json')
                ->withStringBody(json_encode($response));

            return $this->response;

        } catch (\Exception $e) {
            $response = ['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()];

            // Retorne JSON e pare o fluxo
            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;
        }
    }


}
