const express = require('express');
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();


const DATABASE_CONFIG = require("./configs/database");
const usersRouter = require('./routes/users');

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});


mongoose.connect(`mongodb+srv://${DATABASE_CONFIG.user}:${DATABASE_CONFIG.password}@drinkpizza-ydao8.mongodb.net/${DATABASE_CONFIG.database}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }, function (err) {
  if (err) return console.log(err);
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
  });
});


module.exports = app;
