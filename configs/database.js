module.exports = {
    development: {
        user: "root",
        password: "toor",
        database: "drink_pizza",
        password_secret_key: "Drink_pizza is best proejct ever, except Eat_Pizza, because it has more logic then every symbol at this code!"
    },
    production: {
        user: "root",
        password: "toor",
        database: "drink_pizza",
        password_secret_key: "Drink_pizza is best proejct ever, except Eat_Pizza, because it has more logic then every symbol at this code!"
    }
}[process.env.NODE_ENV]