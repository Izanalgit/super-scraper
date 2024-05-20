function loggerDB (name,method){
    const colr1 = '[36m'; // Blue
    let colr2;
    switch (method) {
        case 'logged in':
            colr2 = '[32m'; // Green
            break;
        case 'logged out':
            colr2 = '[30m'; // Grey
            break;
        case 'added':
            colr2 = '[33m'; // Yellow
            break;
        case 'deleted':
            colr2 = '[31m'; // Red
            break;            
    }
        
    const date = new Date().toString();

    console.log(`\x1b${colr1}${date}\x1b[0m`);
    console.log(`User ${method} : \x1b${colr2}${name}\x1b[0m`);
}

module.exports = {loggerDB}