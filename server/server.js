const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./connection').default;
const Employee = require('./models/Employee.model');
const User = require('./models/User.model');
const PORT = 8081;
const HOST = '0.0.0.0';
const app = express();

function serve() {
  app.use(bodyParser.json());
  app.use(cors());

  app.get('/employees', (req, res) => {
    //find all
    Employee.find({ deleted: false }).exec(function(err, result) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
    res.status(100).send();
  });

  app.post('/employees', (req, res) => {
    Employee.countDocuments({}, (err, count) => {
      if (count > 0) {
        Employee.findOne()
          .sort({ _id: -1 })
          .limit(1)
          .exec(function(err, result) {
            if (err) {
              console.error(err);
              res.status(500).send(err);
            } else {
              let newId = result.id + 1;
              const newEmployee = new Employee({
                ...req.body,
                deleted: false,
                id: newId
              });
              newEmployee.save((err) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(newEmployee);
              });
            }
          });
      } else {
        let newId = 1;
        const newEmployee = new Employee({
          ...req.body,
          deleted: false,
          id: newId
        });
        newEmployee.save((err) => {
          if (err) console.error(res.status(500).send(err));
          return res.status(200).send(newEmployee);
        });
      }
    });

    res.status(100);
  });

  app.delete('/employees', (req, res) => {
    Employee.findOneAndRemove({ id: req.query.id }, (err, employee) => {
      if (err) console.error(res.status(500).send(err));
      res.status(200).json({
        message: 'Successfully deleted',
        id: employee.id
      });
    });
  });

  app.put('/employees', (req, res) => {
    Employee.findOneAndUpdate(
      { id: req.body.id },
      req.body.newVal,
      { new: true },
      (err, employee) => {
        if (err) return res.status(500).send(err);
        res.send(employee);
      }
    );
  });

  app.post('/user/login', async (req, res) => {
    const data = req.body;
    console.log(data);
    const matchedUsers = await User.find({ username: data.username });
    console.log(matchedUsers);
    if (matchedUsers.length == 1) {
      let find = matchedUsers[0];
      if (find.password === data.password) {
        return res.status(200).json({
          token: 'DUMMYTOKEN'
        });
      } else {
        return res.status(401).send({ message: 'Wrong Password' });
      }
    } else if (matchedUsers.length === 0) {
      res.status(500).send({ message: 'username does not exist' });
    } else {
      res
        .status(500)
        .send({ message: 'duplicate username error, blame dev team' });
    }
  });

  app.post('/user/register', (req, res) => {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save();
    res.status(200).send();
  });

  app.get('/user', (req, res) => {
    User.find().exec((err, result) => {
      if (err) {
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  });

  app.delete('/user', (req, res) => {
    User.remove({}, () => {
      res.send();
    });
  });

  app.listen(PORT, HOST);
  console.log(`running at http://localhost:` + PORT);
}

connectDB(2000, serve);
