const Client = require("../models/Client");
const bcrypt = require("bcryptjs");

/**
 * Insert new client in the database
 * @param {Object | Array} record
 * @returns client which are inserted in the database
 */
const createRecord = async (record) => {
  const { name, email, password } = record;

  // creating password hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newClient = {
    name,
    email,
    password: hash,
  };
  return await Client.create(newClient);
};

/**
 * Finds the client which matches the query
 * @param {Object} query
 * @returns client which match the query
 */
const findRecord = async (query) => {
  return await Client.find(query);
};

/**
 * Finds the client which matches the query
 * @param {string} email client email to be found
 * @returns client which match the query
 */
const findRecordByEmail = async (email) => {
  return await Client.findOne({ email });
};

/**
 * Find the record by client ID
 * @param {String} clientID client ID
 * @returns client details of given client ID
 */
const findRecordById = async (clientID) => {
  return await Client.findById(clientID);
};

/**
 * Update client details
 * @param {String} clientID client ID
 * @param {Object} newData client details which need to be update
 * @returns updated client details
 */
const updateRecord = async (clientID, newData) => {
  const { address, name, profileURL } = newData;
  const updatedData = {};

  if (name) updatedData["name"] = name;
  if (address) updatedData["address"] = address;
  if (profileURL) updatedData["profileURL"] = profileURL;

  return await Client.findOneAndUpdate(
    { _id: clientID },
    { $set: updatedData },
    {
      new: true,
    }
  );
};

/**
 * Delete the client details of given id
 * @param {String} clientID client ID
 * @returns client details which gets deleted
 */
const deleteRecord = async (clientID) => {
  return await Client.findOneAndDelete({ _id: clientID });
};

/**
 * Get the limited records with respect to page number and limit
 * @param {Number} page page number
 * @param {Number} limit limit of records
 * @returns client records array
 */
const paginateRecords = async (page, limit) => {
  return await Client.aggregate([{ $skip: 10 * (page - 1) }]).limit(+limit);
};

/**
 * Update client balance
 * @param {String} clientId Client ID
 * @param {number} amount Amount to be transferred
 * @returns updated sender client details
 */
const updateAccountBalance = async (clientID, amount) => {
  return await Client.findOneAndUpdate(
    { _id: clientID },
    { $set: { balance: amount } },
    {
      new: true,
    }
  );
};

module.exports = {
  findRecord,
  findRecordByEmail,
  findRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
  paginateRecords,
  updateAccountBalance,
};
