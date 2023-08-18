import chalk from 'chalk';

const responseLoggerMiddleware = (req, res, next) => {

    console.log(chalk.green(`Response sent: ${res.statusCode}`));
    console.log(chalk.green(`Response sent: ${res.body}`));

    next();
}
export default responseLoggerMiddleware;