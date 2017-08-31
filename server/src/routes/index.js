var express = require('express');
var router = express.Router();

var queries = require('../db/queries');

// *** GET all clients *** //
router.get('/clients', (req, res, next) => {
  queries.getAll()
  .then((clients) => {
    res.status(200).json(clients);
  })
  .catch((error) => {
    next(error);
  });
});

// *** GET single client *** //
router.get('/clients/:id', (req, res, next) => {
  queries.getSingle(req.params.id)
  .then((show) => {
    res.status(200).json(show);
  })
  .catch((error) => {
    next(error);
  });
});

// *** Add client *** //
router.post('/clients', (req, res, next) => {
  queries.add(req.body)
  .then((clientID) => {
    return queries.getSingle(clientID);
  })
  .then((client) => {
    res.status(200).json(client);
  })
  .catch((error) => {
    next(error);
  });
});

// *** update client *** //
router.put('/clients/:id', (req, res, next) => {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'HOW DARE YOU UPDATE THE ID FIELD'
    });
  }
  queries.update(req.params.id, req.body)
  .then(() => {
    return queries.getSingle(req.params.id);
  })
  .then((client) => {
    res.status(200).json(client);
  })
  .catch((error) => {
    next(error);
  });
});

// *** delete client *** //
router.delete('/clients/:id', (req, res, next) => {
  queries.getSingle(req.params.id)
  .then((client) => {
    queries.deleteItem(req.params.id)
    .then(() => {
      res.status(200).json(client);
    })
    .catch((error) => {
      next(error);
    });
  }).catch((error) => {
    next(error);
  });
});

module.exports = router;
