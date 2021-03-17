import productsRouter from "./routes/products.routes";
import {options} from './repositories'
const knex = require('knex')(options);

require('dotenv').config();
const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/products', productsRouter);

/*No estaba segura donde iba esto*/
knex.schema.hasTable('productos').then(function(exists:boolean) {
    if (!exists) {
      return knex.schema.createTable('productos', function(table:any) {
        table.increments('id').notNullable()
        table.string('name', 20).notNullable()
        table.decimal('price').notNullable()
        table.string('foto', 20).notNullable()
      })
      .then(() => {console.log('Tabla Creada')})
      .catch((err:any) => {console.log(err)})
      .finally(() => knex.destroy())
      ;
    }
});

app.listen(8080 || process.env.PORT, ( ) => {
    'Your app is listening'
})