const { Post, User } = require("../models");
const { getVerification } = require("../helpers/jsonwebtoken");

class postController {
  static async getPost(req, res) {
    try {
      let getPost = await Post.findAll({
        include: [User],
      });

      res.status(200).json(getPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createPost(req, res) {
    try {
      const { content, status } = req.body;
      const image = req.file.path;

      const UserId = +req.userData.id;

      let createPost = await Post.create({
        image,
        content,
        status,
        UserId,
      });
      res.status(201).json(createPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updatePost(req, res) {
    try {
      const id = +req.params.id;
      const { image, content, status } = req.body;

      let updatePost = await Post.update(
        {
          image,
          content,
          status,
        },
        {
          where: { id },
        }
      );

      updatePost[0] === 1
        ? res.status(201).json({
            message: "Post updated successfully",
          })
        : res.status(403).json({
            message: "not succes",
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deletePost(req, res) {
    try {
      const id = req.params.id;
      let deletePost = await Post.destroy({
        where: { id },
      });

      deletePost === 1
        ? res.status(200).json({
            message: "Post deleted successfully",
          })
        : res.status(403).json({
            message: "delete fail",
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getPostById(req, res) {
    try {
      const id = +req.params.id;
      let getPostById = await Post.findByPk(id);
      res.status(200).json(getPostById);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = postController;