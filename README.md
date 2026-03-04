# vlab-fullstack
## Desafio Técnico: Hub Inteligente de Recursos
Projeto desenvolvido para Desafio Técnico para dev Fullstack no V-Lab, onde foi desenvolvido uma aplicação Fullstack para gerenciamento de materiais didáticos. O sistema deve permitir o cadastro de recursos e utilizar Inteligência
Artificial para auxiliar o usuário no preenchimento de informações.

## Sobre 
- Esse projeto é constituído de uma API RESTful construída com Python na framework FastAPI, com uso de Pydantic para validar dados, e integra a um banco dados MySQL usando SQL Alchemy. 
- Foi usado uma nível gratuito da API Gemini para as chamadas IA, e ambos a chave da IA quanto o database MySQL devem ser carregados no ambiente. 
- Em seu Frontend, foi construído usando React Vite como uma Single Page Application, com feedback para loading state e erros.
## Features

- Stack backend: FastAPI, Pydantic, SQLAlchemy, google.genai
- Stack frontend: React Vite, com uso de TailwindCSS
- Endpoints: CRUD, Health Check e consulta a API IA Gemini Flash.
- Para integrar back e front, usou-se CORS Middleware e Axios para os serviços.
- CRUD de database de Material Educacional manuseável no Front com hook useMaterial.
- Visualize tabela de material paginada com react-paginate
- Adicione ou edite material em um pop-up, com validação usando Zod. 
- No mesmo card de edição, exclua material.
- Uso de react-spinner e react-toastify para feedback nos loading states e erros nas consultas.
- Após preencher título e tipo de novo material, aperte em botão de assistência IA para automáticamente preencher informações de descrição e 3 tags com retorno de consulta a API do Gemini.
- App possúi integração contínua com pipeline no Github Actions que roda flake8 como linter para Backend, a cada Push ou PR.
## Como rodar

### Setup backend
Crie e ative o ambiente virtual:
```bash
cd backend

python -m venv venv
# No Windows:
.\venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate
```

Instale dependências e configure .env:
```bash
pip install -r requirements.txt

DATABASE_URL=mysql+pymysql://utilizador:senha@localhost:3306/nome_do_banco
GEMINI_API_KEY=tua_chave_aqui
```

Rode backend:

```bash
uvicorn main:app --reload
```


### Setup frontend:
```bash
cd frontend

npm install
```
(Opcional) Configure a URL da API:
Crie um arquivo .env na pasta /frontend:
```bash
VITE_API_URL=http://localhost:8000
```
Nota: Caso não crie o arquivo, o projeto tentará conectar em http://localhost:8000 por padrão. 

Rode frontend:
```bash
npm run dev
```
