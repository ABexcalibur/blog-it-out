const express = require("express")
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const db = 'mongodb+srv://saumya:ss%40123456@cluster0.4iave.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(res => console.log("Connected to DB"))
  .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles})
})

app.use('/articles',articleRouter)

app.listen(process.env.PORT || port, () => console.log(`App listening at http://localhost:${port}`))