const {readbd} = require ('../../data/textbbdd');

module.exports = (req,res) =>{
    const userId = req.user;
    const users = readbd();
    const user =users[userId].name; 
//REFACTORIZAR^^^^
    res.send(`
        <h1>SUPERS-SCRAPER</h1>
        <h2>Wellcome ${user}<h2>

        <form action="/api/dashb" method="post">
        <label for="product">Producto :</label>
        <input type="text" id="product" name="product" required><br>

        <button type="submit">Buscar</button>
        </form>
        
        <form action="/api/users/logout" method="post">
           <button type="submit">Log Out</button>
        </form>
    `)
}