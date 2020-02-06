# React API Boilerplate
This project is a simple Node.js/Express boilerplate to get you started on working
with REST APIs, routing, and a form of project organization.  

## Purpose
Feel free to rewrite the app, reorganize it and change the structure, or continue
in this current pattern.  The purpose of this project is to help you find a platform
in which to begin learning about building simple APIs.

## Goals
You should attempt to achieve 15 points on this project by following the below
schema...

However, you may decide to add your own features to the API that may compensate
for points if they prove you have learned a part of the technology and are relevant
to the stack that your team will be working with.

Your points can be combined with those goals of the [front-end](https://github.com/USFClassrooms/ReactShopper-Client).

| Points | Name                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|--------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5-8    | Add Password Authentication | The authentication layer is inherently flawed in its current state: it doesn't require a password!Your goal is to require a user to enter a password upon creation of an account (`POST /api/user`)and then compare the submitted password on `POST /api/login` with that of the one stored in the database.<br><br>**Bonus:** If you hash the password before storing it, such as using [https://www.npmjs.com/package/bcrypt](bcrypt) you can gain up to 8 points.  |
| 5      | Add a checkout route        | Create a route, such as `POST /api/cart/checkout` that will authenticate the user with the auth middleware,<br>retrieve the cart for the authenticated user, compute the cost of their cart, then subtract the balance<br>on their profile and empty their cart.<br><br>**Note:** To make this possible, you'll need to start storing a "balance" field on the user profiles<br>in the mockDatabase upon account creation                                             |
| 5      | Deletion of cart items      | Some users may want to remove items from their cart.  To do this you should allow a route<br>similar to `DELETE /api/cart/:itemId` that will allow a user to delete a specific item, denoted<br>by `itemId` from their cart.<br><br>**Note:** In order to do this, you'll need to add an `id` field to the cart items in the mockDatabase,<br>when you add an item in `POST /api/cart`.                                                                               |

## Development Setup
You'll first need [Node.js](https://nodejs.org/) installed, however I recommend
installing it through [nodenv](https://github.com/nodenv/nodenv) as it provides
a great way to switch between projects' node versions automatically and may
come in handy with your own sponsors' projects.

### Installing Nodenv
The easiest way to install nodenv is through [HomeBrew](https://brew.sh/).
```bash
brew install nodenv
```

and then place the following into your `~/.bash_profile`, `~/.bashrc` or
whatever file your shell sources:
```bash
eval "$(nodenv init -)"
```

If you have any questions, see the [nodenv installation guide](https://github.com/nodenv/nodenv).

You'll then want to install the node version listed in `.node-version` at the
root of this project:
```bash
cd Shopper-API
nodenv install
```

### Installing the Required Dependencies
Node.js comes pre-installed with [NPM](https://www.npmjs.com), and we
use it to sync packages for the project.

To install the dependencies do
```bash
cd Shopper-API
npm install
```

### Starting the server
You'll notice there are `scripts` in the `package.json` file, these
are shorthand commands that you can also define to help accomplish
tasks that you run frequently.

You can start up the app with
```bash
npm start
```
and you'll notice the app begins to listen on `localhost:5000`.

#### Hot Reloading
This stack has hot-reloading built in!  Use:
 ```bash
npm run watch
```
and you won't need to manually start up the server
every time you make a change, what a world we live in!

#### Debugging
You can use the the prefix `DEBUG=app:*` to start up the app
with debug logs.  Read more on the usages by viewing the
[debug](https://www.npmjs.com/package/debug) page if you're interested.

> **Example:**
> Start the app with hot reloading *and* debug logs
>```bash
>DEBUG=app:* npm watch
>```  

You can also check to see if items are in your mock database
by using the following api on `localhost:6000`

**Retrieve an Item from the Mock Database**
`GET localhost:6000/:table/:key`
> **Example:**
>```bash
>GET localhost:6000/users/hkeeling
>```  

**Place an Item into the Mock Database**
 `POST localhost:6000/:table/:key`
 > **Example:**
 >```bash
 >POST localhost:6000/cart/hkeeling
 >[{ name: 'iPhone X', cost: 250 }, { name: 'TV', cost: 900 }]
 >```  

### Configuring the Front-End
The front-end is stored as a separate project, and will need to be started
in a separate shell.  Find the setup instructions on the
[ReactShopper-Client](https://github.com/USFClassrooms/ReactShopper-Client) project page.
