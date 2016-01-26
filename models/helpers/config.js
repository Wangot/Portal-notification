var config    = require('./../../config/config.json');
module.exports = function(env){
    var cnf;
    switch(env){
        case "production":
            cnf = config.production;
            break;
        case "staging":
            cnf = config.staging;
            break;
        case "development":
        default:
            cnf = config.development;
            break;
    }
    return cnf;
}