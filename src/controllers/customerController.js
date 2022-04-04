const connection = require("express-myconnection");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((_, conn) => {
        conn.query('SELECT * FROM customer', (_, customers) => {
            if (_) {
                res.json(_);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((_, connection) => {
        connection.query('INSERT INTO customer set ?', data, (_, customer) => {
            console.log(customer)
            res.redirect('/');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((_, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (_, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((_, conn) => {
        conn.query(
            "UPDATE customer set name = ?, address = ?, phone = ? where id = ?",
            [newCustomer.name, newCustomer.addresss, newCustomer.phone, id],
            (_, __) => {
                res.redirect("/");
            }
        );
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((_, connection) => {
        connection.query('DELETE FROM customer WHERE id = ?', [id], (_, __) => {
            res.redirect('/');
        });
    });
}

module.exports = controller;
