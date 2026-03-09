<?php

namespace App\Controller;

use App\Controller\AppController;

class UsuariosController extends AppController
{
    public function initialize(): void
    {
        parent::initialize();
        //$this->loadComponent('RequestHandler');
    }

    public function cadastrar()
    {

        try {

            // CORS
            $this->response = $this->response
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
                ->withHeader('Access-Control-Allow-Headers', 'Content-Type');

            if ($this->request->getMethod() === 'OPTIONS') {
                return $this->response;
            }

            $this->request->allowMethod(['post']);

            $usuario = $this->Usuarios->newEmptyEntity();
            $data = $this->request->getData();

            if (!empty($data['senha'])) {
                $data['senha'] = password_hash($data['senha'], PASSWORD_DEFAULT);
            }

            $usuario = $this->Usuarios->patchEntity($usuario, $data);

            if ($this->Usuarios->save($usuario)) {
                $response = ['success' => true, 'message' => 'Usuário cadastrado com sucesso!'];
            } else {
                // Captura erros de validação
                $errors = $usuario->getErrors();
                if (!empty($errors)) {
                    $mensagens = [];
                    foreach ($errors as $msgs) {
                        foreach ($msgs as $msg) {
                            $mensagens[] = "$msg";
                        }
                    }
                    $response = ['success' => false, 'message' => implode(' ', $mensagens)];
                } else {
                    $response = ['success' => false, 'message' => 'Erro ao cadastrar usuário.'];
                }
            }

            // Retorne JSON e pare o fluxo
            $this->response = $this->response->withType('application/json')
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

    public function login()
    {

        try {
            // CORS
            $this->response = $this->response
                ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
                ->withHeader('Access-Control-Allow-Credentials', 'true')
                ->withHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
                ->withHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

            if ($this->request->getMethod() === 'OPTIONS') {
                return $this->response;
            }

            $this->request->allowMethod(['post']);

            $data = $this->request->getData();
            $email = $data['email'];
            $senha = $data['senha'];

            $usuario = $this->Usuarios->find()
                ->where(['email' => $email])
                ->first();

            if ($usuario && password_verify($senha, $usuario->senha)) {
                // Define cookie httpOnly com id e nome do usuário
                $userData = json_encode(['id' => $usuario->id, 'nome' => $usuario->nome]);
                setcookie('usuario', $userData, [
                    'expires' => time() + 60 * 60 * 24 * 7, // 7 dias
                    'path' => '/',
                    'secure' => false, // true em produção (HTTPS)
                    'httponly' => true,
                    'samesite' => 'Lax'
                ]);
                $response = ['success' => true, 'nome' => $usuario->nome];
            } else {
                $response = ['success' => false, 'message' => 'E-mail ou senha incorretos!'];
            }

            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;

        } catch (\Exception $e) {
            $response = ['success' => false, 'message' => 'Erro no servidor: ' . $e->getMessage()];
            $this->response = $this->response->withType('application/json')
                ->withStringBody(json_encode($response));
            return $this->response;
        }
    }



    // Retorna os dados do usuário logado a partir do cookie httpOnly
    public function usuarioLogado()
    {
        $this->response = $this->response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

        if ($this->request->getMethod() === 'OPTIONS') {
            return $this->response;
        }

        $cookie = $_COOKIE['usuario'] ?? null;
        if ($cookie) {
            $usuario = json_decode($cookie, true);
            $response = ['success' => true, 'usuario' => $usuario];
        } else {
            $response = ['success' => false, 'usuario' => null];
        }
        $this->response = $this->response->withType('application/json')
            ->withStringBody(json_encode($response));
        return $this->response;
    }

    // Remove o cookie httpOnly do usuário (logout)
    public function logoutUsuario()
    {
        $this->response = $this->response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

        if ($this->request->getMethod() === 'OPTIONS') {
            return $this->response;
        }

        setcookie('usuario', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'secure' => false, // true em produção
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        $response = ['success' => true, 'message' => 'Logout realizado com sucesso!'];
        $this->response = $this->response->withType('application/json')
            ->withStringBody(json_encode($response));
        return $this->response;
    }
}
