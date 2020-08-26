const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./server/database.sqlite3');

db.serialize(function test() { 
    db.run("CREATE TABLE lorem (info TEXT)");
    let stmt = db.prepare("INSERT INTO lorem VALUES (?)");

    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});

db.close();
