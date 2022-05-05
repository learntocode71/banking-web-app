const { createCustomError } = require("../errors/custom-error");
const {
  updateRecord,
  createRecord,
  deleteRecord,
  findRecord,
  findRecordById,
  paginateRecords,
  updateAccountBalance,
  findRecordByEmail,
} = require("../services/ClientServices");

// Get All Client
const getAllClient = async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(401);

  const { page, limit } = req.query;

  if (page && limit) {
    const clients = await paginateRecords(page, limit);

    res.send(clients);
  }

  const clients = await findRecord({});
  res.send(clients);
};

// Get Single Client
const getClient = async (req, res, next) => {
  const { clientId } = req.params;

  if (!req.user.isAdmin && req.user.id !== clientId) return res.sendStatus(401);

  const client = await findRecordById(clientId);

  if (!client)
    return next(
      createCustomError(`Client not exist with id: ${clientId}`, 404)
    );

  res.send(client);
};

// Create Client
const createClient = async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(401);

  const user = await findRecordByEmail(req.body.email);
  if (user) return next(createCustomError("Email already exists!", 400));

  const client = await createRecord(req.body);

  res.status(201).send(client);
};

// Update Client
const updateClient = async (req, res, next) => {
  const { clientId } = req.params;

  if (!req.user.isAdmin && req.user.id !== clientId) return res.sendStatus(401);

  // Make service call to update client details
  const client = await updateRecord(clientId, req.body);

  if (!client)
    return next(
      createCustomError(`Client not exist with id: ${clientId}`, 404)
    );

  res.send(client);
};

// Delete Client
const deleteClient = async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(401);

  const { clientId } = req.params;

  const client = await deleteRecord(clientId);

  if (!client)
    return next(
      createCustomError(`Client not exist with id: ${clientId}`, 404)
    );

  res.send(client);
};

// Pay Client
const transferMoney = async (req, res, next) => {
  const { email, amount } = req.body;

  if (req.user.email === email)
    return next(createCustomError(`Can't transfer money to yourself!!`, 400));

  const sender = await findRecordByEmail(req.user.email);

  const receiver = await findRecordByEmail(email);
  if (!receiver) return next(createCustomError("User does not exist!", 400));

  if (sender.balance <= 0 || sender.balance - amount < 0)
    return next(createCustomError("Insufficient balance", 400));

  const response = await updateAccountBalance(
    sender._id,
    sender.balance - amount
  );

  const response1 = await updateAccountBalance(
    receiver._id,
    parseInt(receiver.balance) + parseInt(amount)
  );

  res.send(response);
};

module.exports = {
  getAllClient,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  transferMoney,
};
