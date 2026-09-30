/**
 * BioStorefront Data Store
 * Powered by PostgreSQL Database: biodata
 */

const postgres = require('./postgres');

module.exports = {
  pool: postgres.pool,
  initDb: postgres.initDb,
  getAllProducts: postgres.getAllProducts,
  getProductById: postgres.getProductById,
  addProduct: postgres.addProduct,
  updateProduct: postgres.updateProduct,
  deleteProduct: postgres.deleteProduct,
  decrementStock: postgres.decrementStock,
  setStock: postgres.setStock,
  createOrder: postgres.createOrder,
  getAllOrders: postgres.getAllOrders,
  getOrderById: postgres.getOrderById,
  getStoreProfile: postgres.getStoreProfile,
  updateStoreProfile: postgres.updateStoreProfile,
  trackEvent: postgres.trackEvent,
  getAnalytics: postgres.getAnalytics,
  registerUser: postgres.registerUser,
  authenticateUser: postgres.authenticateUser,
};
