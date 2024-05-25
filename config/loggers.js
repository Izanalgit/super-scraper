//GENERIC LOG
function loggerMS (title,name,msg,color){
    const colr1 = '[30m'; // Grey
    let colorMsg;
    switch (color) {
        case 'green':
            colorMsg = '[32m'; // Green
            break;
        case 'grey':
            colorMsg = '[30m'; // Grey
            break;
        case 'yellow':
            colorMsg = '[33m'; // Yellow
            break;
        case 'red':
            colorMsg = '[31m'; // Red
            break;
        default:
            colorMsg = '[31m'; // Red
            break;            
    }
    
    console.log(`\x1b${colr1}---- ${title.toUpperCase()} ----\x1b[0m`);
    console.log(`${name} : \x1b${colorMsg}${msg}\x1b[0m`);
}
//DATA BASE CRUD LOG
function loggerDB (name,method){
    const colr1 = '[36m'; // Blue
    const colr2 = '[30m'; // Grey
    let colr3;
    switch (method) {
        case 'logged in':
            colr3 = '[32m'; // Green
            break;
        case 'logged out':
            colr3 = '[30m'; // Grey
            break;
        case 'added':
            colr3 = '[33m'; // Yellow
            break;
        case 'deleted':
            colr3 = '[31m'; // Red
            break;            
    }
        
    const date = new Date().toString();

    console.log(`\x1b${colr2}---- NEW ${method.toUpperCase()} ----\x1b[0m`);
    console.log(`\x1b${colr1}${date}\x1b[0m`);
    console.log(`User ${method} : \x1b${colr3}${name}\x1b[0m`);
}
//SCRAP LOG
function loggerFD (name,supr){
    const colr1 = '[30m'; // Grey
    const colr2 = '[33m'; // Yellow
    
    console.log(`\x1b${colr1}---- NEW FETCH ----\x1b[0m`);
    console.log(`User ${name} has fetched : \x1b${colr2}${supr}\x1b[0m`);
}



module.exports = {loggerMS,loggerDB,loggerFD}