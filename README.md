# Tyrehotel app

Web application for managing tyres in warehouse, made with AngularJS.

Application supports many useful functions for managing tyres in car dealership

* View and search tyres
* Add, edit and remove tyres from database
* Move tyres between tables by adding or removing registernumber
* Mark tyres as handed to owner

Running of app requires NodeJS and MySQL.

## Installation

Clone this repository and import `sampleDb.sql` database dumb to MySql server. Change database connection settings (host, port, user and password) in `config.js` file.

Open cmd window, move to directory, install depencies with `npm install`. After that run `webpack` to make js and css bundles with webpack. Then run server with command `node index.js`. App should now be running in http://localhost:3000.

Demo database contains one user for testing purposes ( user / password ).

## Backend endpoints

* Login -> POST api/login
* Fetch all rows in table -> GET api/data/{table}
* Insert row -> POST api/data/{table}
* Edit row -> POST api/data/{table}/{id}
* Delete row -> DELETE api/data/{table}/{id}
* Move from table to another -> POST api/move/{id}/{toTable}/{fromTable}
* Check if regNum exists -> GET api/find/{table}/{regNum}

All requests excluding login needs token parameter like `?token={token}`
