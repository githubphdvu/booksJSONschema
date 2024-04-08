//npm init
//npm i express pg jsonschema
//psql<data.sql (data_test.sql for testing, jest books.test.js)
//nodemon -L server.js -e js,html,css
const app = require("./app")
app.listen(3000,()=>console.log(`Server starting on port 3000`))
