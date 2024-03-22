# API - Food Explorer

[Português](#sobre-o-projeto) | [english](#about-project)

### Sobre o projeto

Este projeto foi desenvolvido para a conclusão da formação explorer da escola de programação [Rocketseat](https://www.rocketseat.com.br/), o desafio consiste em criar um `cardápio online` para um restaurante. Esse repositório contem os códigos da API que foi desenvolvida, para ser consumida pelo [front-end](https://github.com/fabricioliquesley/foodExplorer-front-end). A API disponibiliza as seguintes funcionalidades:

- Cadastrar usuário
- Autenticar usuário
- Criar refeição
- Editar refeição
- Favoritar refeição
- Fazer pedidos
- Mudar status de um pedido
- Visualizar detalhes de uma refeição
- Visualizar todas as refeições disponíveis

[Ver projeto finalizado](https://food3explorer.netlify.app/)

### 🛠 Tecnologias usadas

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### 📋 Como usar

#### 1 - Iniciando um repositório git

```
git init
```

#### 2 - Clone o repositório

```
git clone https://github.com/fabricioliquesley/foodExplorer-back-end.git
```

#### 3 - Instale as dependências

Na pasta do projeto execute o comando abaixo.

```
npm install
```

#### 4 - Configure as variáveis de ambiente

```env
PORT=3333
SECRET=4343cc7322728319e8ac0797a7fc5bfc
```

`PORT` é a porta onde a API será executada, pode ser usado o valor de sua escolha. `SECRET` é a chave que será usada para gerar o token JWT.

> Caso queira pode ser utilizado o site [md5hashgenerator](https://www.md5hashgenerator.com/) para gerar um HASH a partir de uma string, para ser usada na variável SECRET.

#### 5 - Executando a API

```
npm run dev
```

### Rotas da API

#### Usuários

Rota usada para cadastrar novos usuários na aplicação.

```url
http://localhost:3333/users
```

Deve ser passado um `json` no corpo da requisição com as informações do usuário.

```json
{
	"name": "João Paulo",
	"email": "joão@email.com",
	"password": "123456"
}
```

> A API consegue criar usuários comuns e administradores, usuário do tipo ``admin`` precisam ter em seu email `foodexplore` e na senha `@admin` como no exemplo.

```json
{
	"name": "João Paulo",
	"email": "joão@foodexplore.com",
	"password": "Zx@admin3g5"
}
```

#### Sessão

Rota usada para criar uma sessão para um usuário registrado.

```
http://localhost:3333/sessions
```

Deve ser passado um `json` no corpo da requisição com as informações do usuário.

```json
{
	"email": "joão@email.com",
	"password": "123456"
}
```

#### Pratos

Rota usada para manipular os pratos do restaurante.

```
http://localhost:3333/meals
```

#### Criar novo prato

Deve ser passado um `json` no corpo da requisição com as informações do prato.

```json
{
	"name": "Strogonoff de frango", 
	"category": "Prato principal", 
	"ingredients": ["Peito de frango", "creme de leite", "molho de tomate"], 
	"price": 18.50, 
	"description": "Um delicioso prato." 
}
```

#### Buscar todos os pratos cadastrados

```
http://localhost:3333/meals
```

retorna um json contendo um array de objetos.

> pode ser passado parâmetros para buscar prato pelo nome ou por ingrediente

```
http://localhost:3333/meals?search=nome_do_prato
```

#### Buscar um prato

Deve ser passado o `id` do prato como parâmetro na url.

```
http://localhost:3333/meals/id_prato
```

retorna um json com os detalhes do prato.

#### Deletar prato

Deve ser passado o `id` do prato que será deletado como parâmetro na url

```
http://localhost:3333/meals/id_prato
```

#### Atualizar prato

Deve ser passado o `id` do prato como parâmetro na url, e no body um `json` contendo as informações que serão atualizadas no prato.

```
http://localhost:3333/meals/id_prato
```

```json
{
    "category": "Prato principal",
    "ingredients": [
        "Frango",
        "Creme de leite",
        "molho de tomate",
				"cebola"
    ],
    "description": "Um delicioso prato feito com ingredientes de extrema qualidade, serve 2 pessoa. Acompanha arroz e batata palha."
}
```

#### Adicionar uma imagem para o prato

Deve ser passado o `id` do prato como parâmetro na url, e a imagem que será vinculada ao prato.

```
http://localhost:3333/meals/image/id_prato
```

#### Pedidos

Rota usada para criar pedidos.

```
http://localhost:3333/orders
```

#### Criar pedido

Deve ser passado um `json` com as informações do pedido que será criado.

```json
{
	"orderDetails": [
	 	{
			"amount": 1,
			"name": "strogonoff de frango"
		},
		{
			"amount": 1,
			"name": "coca-cola"
		}
	]
}
```

#### Buscar um pedido

```
http://localhost:3333/orders
```

Retorna um json com todos os pedidos cadastrados.

> Quando o usuário não é admin retorna apenas os pedidos do usuário que fez a solicitação

#### Atualizar pedido

Deve ser passado o `id` do pedido, e o status do pedido.

```
http://localhost:3333/orders/id_pedido
```

```json
{
	"status": "entregue"
}
```

#### Favoritos

Rota usada para manipular os pratos favoritos

```
http://localhost:3333/favorites
```

#### Criar favorito

Deve ser passado um `json` com as informações do prato que será salvo como favorito.

```json
{
	"meal_name": "Feijoada",
	"image_path": "images/risoto.png",
	"meal_id": "d97b66d2-0427-4ef1-97a8-3d1b0f7cb108"
}
```

#### Deletar um favorito

Deve ser passado o `id` do favorito que será apagado.

```
http://localhost:3333/favorites/id_favorito
```

#### Buscar os favoritos

Busca os favoritos de um usuário

```
http://localhost:3333/favorites
```

#### Arquivos

Rota usada para exibir as imagens dos pratos. Deve ser passada o nome da imagem para a url.

```
http://localhost:3333/files/0cbdabf19ecbaef77e0c-strogonoff.jpg
```

### About project

This project was developed to complete the explorer course at the [Rocketseat](https://www.rocketseat.com.br/) programming school. The challenge consists of creating an `online menu` for a restaurant. This repository contains the codes for the API that was developed, to be consumed by the [front-end](https://github.com/fabricioliquesley/foodExplorer-front-end). The API provides the following functionalities:

- User registration
- User authentication
- Create meal
- Edit meal
- Favorite meal
- Place orders
- Change the status of an order
- View details of a meal
- View all available meals

[See finished project](https://food3explorer.netlify.app/)

Translated with DeepL.com (free version)

### 🛠 Technologies used

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### 📋 how to use

#### 1 - Starting a git repository

```
git init
```

#### 2 - Clone the repository

```
git clone https://github.com/fabricioliquesley/foodExplorer-back-end.git
```

#### 3 - Install the dependencies

In the project folder, run the command below.

```
npm install
```

#### 4 - Set the environment variables

```env
PORT=3333
SECRET=4343cc7322728319e8ac0797a7fc5bfc
```

`PORT` is the port where the API will be executed, you can use the value of your choice. `SECRET` is the key that will be used to generate the JWT token.

> If you wish, you can use the site [md5hashgenerator](https://www.md5hashgenerator.com/) to generate a HASH from a string, to be used in the SECRET variable.

#### 5 - Running the API

```
npm run dev
```

### API routes

#### Users

Route used to register new users in the application.

```url
http://localhost:3333/users
```

A `json` must be passed in the body of the request with the user's information.

```json
{
	"name": "João Paulo",
	"email": "joão@email.com",
	"password": "123456"
}
```

> The API can create ordinary users and administrators, users of the ``admin`` type must have `foodexplore` in their email and `@admin` in their password, as in the example.

```json
{
	"name": "João Paulo",
	"email": "joão@foodexplore.com",
	"password": "Zx@admin3g5"
}
```

#### Session

Route used to create a session for a registered user.

```
http://localhost:3333/sessions
```

A `json` must be passed in the body of the request with the user's information.

```json
{
	"email": "joão@email.com",
	"password": "123456"
}
```

#### Meals

Route used to handle restaurant meals.

```
http://localhost:3333/meals
```

#### Create new meal

A `json` must be passed in the body of the request with the meal information.

```json
{
	"name": "Strogonoff de frango", 
	"category": "Prato principal", 
	"ingredients": ["Peito de frango", "creme de leite", "molho de tomate"], 
	"price": 18.50, 
	"description": "Um delicioso prato." 
}
```

#### Search for all registered meals

```
http://localhost:3333/meals
```

returns a json containing an array of objects.

> Parameters can be passed to search for the meal by name or by ingredient.

```
http://localhost:3333/meals?search=nome_do_prato
```

#### Search for a meal

The `id` of the meal must be passed as a parameter in the url.

```
http://localhost:3333/meals/id_prato
```

returns a json with the meal details.

#### Delete meal

The `id` of the meal to be deleted must be passed as a parameter in the url.

```
http://localhost:3333/meals/id_prato
```

#### Update meal

The `id` of the meal must be passed as a parameter in the url, and in the body a `json` containing the information that will be updated in the meal.

```
http://localhost:3333/meals/id_prato
```

```json
{
    "category": "Prato principal",
    "ingredients": [
        "Frango",
        "Creme de leite",
        "molho de tomate",
				"cebola"
    ],
    "description": "Um delicioso prato feito com ingredientes de extrema qualidade, serve 2 pessoa. Acompanha arroz e batata palha."
}
```


#### Add an image for the meal

The `id` of the meal must be passed as a parameter in the url, and the image that will be linked to the meal.

```
http://localhost:3333/meals/image/id_prato
```

#### Orders

Route used to create orders.

```
http://localhost:3333/orders
```

#### Create order

A `json` must be passed with the information of the order to be created.

```json
{
	"orderDetails": [
	 	{
			"amount": 1,
			"name": "strogonoff de frango"
		},
		{
			"amount": 1,
			"name": "coca-cola"
		}
	]
}
```

#### Fetch an order

```
http://localhost:3333/orders
```

Returns a json with all registered requests.

> When the user is not admin, only the requests of the user who made the request are returned.

#### Update order

The `id` of the order and the status of the order must be passed.

```
http://localhost:3333/orders/id_pedido
```

```json
{
	"status": "Entregue"
}
```

#### Favorites

Route used to manipulate favorite dishes

```
http://localhost:3333/favorites
```

#### Favorites

Route used to handle favorite dishes

```
http://localhost:3333/favorites
```

#### Create favorite

A `json` must be passed with the information of the dish that will be saved as a favorite.

```json
{
	"meal_name": "Feijoada",
	"image_path": "images/risoto.png",
	"meal_id": "d97b66d2-0427-4ef1-97a8-3d1b0f7cb108"
}
```

#### Deleting a favorite

The `id` of the bookmark to be deleted must be passed.

```
http://localhost:3333/favorites/id_favorito
```

#### Search favorites

Searches for a user's favorites

```
http://localhost:3333/favorites
```

#### Files

Route used to display images of meals. The name of the image must be passed to the url.

```
http://localhost:3333/files/0cbdabf19ecbaef77e0c-strogonoff.jpg
```