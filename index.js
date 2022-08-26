const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const PORT = process.env.PORT || 5000
//mongodb://localhost/blog
//mongodb+srv://tarun:<password>@tarun-cluster.2sk5aum.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://tarun:blacy728@tarun-cluster.2sk5aum.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT)