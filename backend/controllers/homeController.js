
const { Posting } = require("../models");

class homeController {
  static async getHome(req, res) {
    try {
      let getHome = await Posting.findAll({});
      res.status(200).json(getHome);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = homeController;