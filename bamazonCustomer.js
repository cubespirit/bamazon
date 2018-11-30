var mysql = require("mysql");
var inquire = require("inquirer");
var Table = require("cli-table");
 

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

//generate table using cli-table
function tableGen(res){
    var table = new Table({
        head: ['ID', 'Name', 'Price', 'Department', 'Stock']
      , colWidths: [15, 15, 15, 15, 15]
    });
    var metaarray = [];
    for(let x = 0; x < res.length; x++){
        var array = [];
        array[0] = res[x].item_id;
        array[1] = res[x].product_name;
        array[2] = res[x].price;
        array[3] = res[x].department_name;
        array[4] = res[x].stock_quantity;
        metaarray.push(array);
    }
    table.push(
        metaarray[0], 
        metaarray[1], 
        metaarray[2],
        metaarray[3],
        metaarray[4],
        metaarray[5],
        metaarray[6],
        metaarray[7],
        metaarray[8],
        metaarray[9]
    );
    console.log(table.toString());
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function shop(){
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //generate unique table
    tableGen(res);
    //ask user for input
    inquire
        .prompt([{
            name: 'name',
            type: 'input',
            message: 'What would you like to buy (enter ID)?',
        },
        {
            name: 'qt',
            type: 'input',
            message: 'How many would you like to buy?',
        }
        ])
        .then(answers => {
            var choice = {};
            for(let x = 0; x < res.length; x++){
                if(answers.name == res[x].item_id){
                    choice = res[x];
                }
            }
            if (answers.qt > choice.stock_quantity){
                console.log("Not enough stock!");
                shop();
            } else {
                console.log("purchased!")
                var total = answers.qt*choice.price;
                console.log("total purchase: " + total + "$")
                var new_quant = choice.stock_quantity - answers.qt;
                //update sql database
                connection.query("UPDATE products SET stock_quantity = " + new_quant + " WHERE item_id = " + choice.item_id, function (err) {
                    if (err) throw err;
                    shop();
                })
            }
        });
});
}
shop();
