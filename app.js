const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database : 'tes_arka'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected');
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.get('/', (req, res) =>{
    let sql = "SELECT product.id AS id, cashier.name AS cashier, product.name AS product, category.name AS category, product.price AS price FROM product JOIN cashier ON product.id_cashier = cashier.id JOIN category ON product.id_category = category.id";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            users : rows 
        });
    }); 
    
});

app.post('/add', function(req, res, next){
    let cashier = req.body.add_cashier;
    let product = req.body.add_product;
    let category = req.body.add_category;
    let price = req.body.add_price;

    if (cashier === "Pevita Pearce"){
        cashier = 1;
    }else if (cashier === "Raisa Andriana"){
        cashier = 2;
    }else if (cashier === "Joko Purwadhi"){
        cashier = 3;
    }else if (cashier === "Fitra Elbi Amrullah"){
        cashier = 4;
    }
    if (category === "Food"){
        category = 1;
    }else if (category === "Drink"){
        category = 2;
    }
    let data = {name: product, price: price, id_category : category, id_cashier : cashier};
    let sql = "INSERT INTO product SET ?";
    let query = connection.query(sql, data, (err, rows) => {
        res.redirect('/');
    });
    
});

app.post('/update', (req, res) => {
    let id = req.body.edit_id;
    //console.log(id);
    let cashier = req.body.edit_cashier;
    let product = req.body.edit_product;
    let category = req.body.edit_category;
    let price = req.body.edit_price;

    if (cashier === "Pevita Pearce"){
        cashier = 1;
    }else if (cashier === "Raisa Andriana"){
        cashier = 2;
    }else if (cashier === "Joko Purwadhi"){
        cashier = 3;
    }else if (cashier === "Fitra Elbi Amrullah"){
        cashier = 4;
    }
    if (category === "Food"){
        category = 1;
    }else if (category === "Drink"){
        category = 2;
    }
    let sql = "UPDATE product SET name='" +product+"', price="+price+", id_category="+category+", id_cashier ="+cashier+" WHERE id ="+id ;
    let query = connection.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });  
});

app.post('/delete', (req, res) => {
    let id = req.body.delete_id;
    //console.log(id);
    let sql = "DELETE FROM `product` WHERE `product`.`id` =" + id;
    let query = connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});



app.listen(8888, () => {
    console.log('Server is running at port 8888');
});