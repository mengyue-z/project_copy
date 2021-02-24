// Dependencies

// Requiring our models
const db = require('../models');

// Routes
module.exports = (app) => {
    app.get('/api/projects', (req, res) => {
        const query = {};
        if (req.query.employee_id) {
            query.EmployeeId = req.query.employee_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Project.findAll({
            where: query,
            include: [db.Employee],
        }).then((result) => res.json(result));
    });

    // Get route for retrieving a single post
    app.get('/api/projects/:id', (req, res) => {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Project.findOne({
            where: {
                id: req.params.id,
            },
            include: [db.Employee],
        }).then((result) => res.json(result));
    });

    // POST route for saving a new post
    app.post('/api/projects', (req, res) => {
        db.Project.create(req.body).then((result) => res.json(result));
    });

    // DELETE route for deleting posts
    app.delete('/api/projects/:id', (req, res) => {
        db.Project.destroy({
            where: {
                id: req.params.id,
            },
        }).then((result) => res.json(result));
    });

    // PUT route for updating posts
    app.put('/api/projects', (req, res) => {
        db.Project.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then((result) => res.json(result));
    });
};
