var mysql = require('mysql')

var connection = mysql.createPool({
    connectionLimit: 1000,
    host: "localhost",
    user: "root",
    password: "",
    database: "hr_managment",
});

connection.getConnection(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("" + err + " : Error connecting database... \n\n");
    }
});

module.exports = connection;




// const mssql = require('mssql');
// const config = {
//     user: 'sa',
//     password: 'Nenku@1234',
//     server: '192.168.1.3',
//     port: 32558,
//     database: 'HR_Managment',
//     options: {
//         encrypt: false,
//         crypto: { minVersion: 'TLSv1.2' }
//     }
// };
// const connection = new mssql.ConnectionPool(config);
// const poolConnect = connection.connect();
// poolConnect.then(() => {
//     console.log('Connected to MS SQL Server');
// }).catch(err => {
//     console.error('Error connecting to MS SQL Server:', err);
// });


// module.exports = connection;

