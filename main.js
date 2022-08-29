const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));
app.get('*', (req, res, next) => {
    fs.readdir('./data', (error, filelist) => {
        req.list = filelist;
        next();
    });
});
app.use('/topic', topicRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404).send('Sorry can\'t find that');
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!')
});

app.listen(3000, () => console.log(`Express app is listening on port 3000!`));
