/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var mongoDbUtilities = require("./../mongodb-util");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      console.log("GET");
      var project = req.params.project;

      mongoDbUtilities.connectToServer((state) => {
        if (state.status) {
          const terms = isValidSearchTerms({
            _id: req.query._id,
            issue_title: req.query.issue_title,
            issue_text: req.query.issue_text,
            created_by: req.query.created_by,
            assigned_to: req.query.assigned_to,
            open: req.query.open,
            status_text: req.query.status_text,
          });

          mongoDbUtilities.findIssues(
            Object.keys(terms).length > 0 ? terms : {},
            (callback) => {
              return res.json(callback);
            }
          );
        } else {
          return res.send("error finding issues");
        }
      });
    })

    // Insert new issue
    .post(function (req, res) {
      console.log("POST");
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      } = req.body;

      mongoDbUtilities.connectToServer((state) => {
        if (state.status) {
          const date = new Date();
          const created_on = date;
          const updated_on = date;
          const open = true;
          mongoDbUtilities.insertOneIssue(
            {
              issue_title,
              issue_text,
              created_on,
              updated_on,
              created_by,
              assigned_to,
              open,
              status_text,
            },
            (callback) => {
              return res.json(callback);
            }
          );
        }
      });
    })

    // Update current issue
    .put(function (req, res) {
      console.log("PUT");

      let terms = isValidSearchTerms({
        _id: req.body._id,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        open: req.body.open,
        status_text: req.body.status_text,
      });

      terms.open = req.body.open === undefined ? true : false;

      mongoDbUtilities.connectToServer((state) => {
        if (state.status) {
          //console.log(state.message)
          mongoDbUtilities.updateOneIssue(terms, (callback) => {
            return res.send(callback);
          });
        }
      });
    })

    .delete(function (req, res) {
      console.log("DELETE");

      const _id = req.body._id;

      mongoDbUtilities.connectToServer((state) => {
        if (state.status) {
          mongoDbUtilities.removeOneIssue(_id, (callback) => {
            //return res.status(200).send(callback)
            return res.json(callback);
          });
        }
      });
    });

  /*
   * Checks if a string is valid
   *
   * @param str - string input
   *
   * @return boolean - true if valid string, false otherwise
   */
  const isValidString = (str) => {
    if (str === null || str === undefined) {
      return false;
    }

    if (str.length === 0) {
      return false;
    }

    return true;
  };

  /*
   * Checks if search terms are valid
   *
   * @param searchTerms - object containing search terms
   *
   * @return @object - of valid search terms
   */
  const isValidSearchTerms = (searchTerms) => {
    let result = {};

    const keys = Object.keys(searchTerms);

    keys.forEach((e) => {
      if (isValidString(searchTerms[e])) {
        result[e] = searchTerms[e];
      }
    });

    return result;
  };
};
