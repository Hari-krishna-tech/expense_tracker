import chalk from "chalk";

const loggerMiddleware = (req, res, next) => {
    console.log(chalk.blue(`Request logged: ${req.method} ${req.path}`));
    next();
    };

export default loggerMiddleware;