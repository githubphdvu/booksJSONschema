const express = require("express")
const app = express()

app.use(express.json())

const ExpressError = require("./expressError")
const bookRoutes = require("./routes/books")

app.use("/books", bookRoutes)

app.use( (req, res, next)=>{//404 handler
    const err = new ExpressError("Not Found", 404)
    return next(err)
})
app.use((err, req, res, next)=>{//general error handler
    res.status(err.status || 500)
    return res.json({
        error: err,
        message: err.message
    })
})
module.exports = app
