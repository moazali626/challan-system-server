const { validationResult } = require("express-validator");
const _ = require("lodash");
const { httpStatusCode, message, exception } = require("../../constants");
const User = require("../../models/user");
const Class = require("../../models/class");
const Student = require("../../models/student");
const Challan = require("../../models/challan");
const dateFns = require("date-fns");
const { findOneClass } = require("../../libs/class");

/**
 * POST /auth/signup
 * User Sign Up.
 */
exports.generateChallan = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }

      //If above validation succeeds,  generate challan code will run

      const { className } = req.body;

      const result = await findOneClass({ className });

      const { fees } = result;

      const students = await Student.find({
        className,
        mode: [2, 4, 1],
      }).lean();

      //Generating Issue Date
      const dateObj = new Date();
      let date = ("0" + dateObj.getDate()).slice(-2);
      let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      let year = dateObj.getFullYear();
      const issueDate = year + "-" + month + "-" + date;

      let finalFees, finalIssueData, finalDueDate;

      students.forEach((element) => {
        let d = new Date();
        d.setDate(d.getDate() + 21 * element.mode);
        const dueDate = JSON.stringify(d).split("T")[0].slice(1);

        finalFees = element.mode * fees;
        finalIssueData = issueDate;
        finalDueDate = dueDate;

        const saveChallan = async () => {
          const newChallan = await Challan.create({
            fees: finalFees,
            issueDate: finalIssueData,
            dueDate: finalDueDate,
            challan: element._id,
            mode: element.mode,
          });
          if (newChallan.mode === 1) {
            const str = finalDueDate;
            const date = new Date(str);

            //add one month
            const addedMonthDate = dateFns.addMonths(date, 1);

            //set date to 1st
            const changedIssueDate = dateFns.setDate(addedMonthDate, 1);

            const changedIssueDateCopy = new Date(changedIssueDate);

            //add 3 weeks in issue date to make due date
            let changedDueDate = changedIssueDateCopy.setDate(
              changedIssueDateCopy.getDate() + 21
            );
            const changedDueDateLatest = new Date(changedDueDate);

            const changedIssueDateStr = JSON.stringify(changedIssueDate)
              .split("T")[0]
              .slice(1);

            const changedDueDateStr = JSON.stringify(changedDueDateLatest)
              .split("T")[0]
              .slice(1);

            const newChallan = await Challan.create({
              fees: finalFees,
              issueDate: changedIssueDateStr,
              dueDate: changedDueDateStr,
              challan: element._id,
              mode: element.mode,
            });
          }
        };
        saveChallan();
      });

      return resolve({
        code: httpStatusCode.OK,
        message: message.CHALLANS_GENERATED,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};

exports.displayChallan = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Challan.find({}).populate("challan");
      if (result) {
        return resolve({
          data: result,
          code: httpStatusCode.OK,
        });
      }
    } catch (error) {
      console.log(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};

exports.updateChallan = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const validationErrors = validationResult(req);
      if (!_.isEmpty(validationErrors.errors)) {
        return reject({
          code: httpStatusCode.BAD_REQUEST,
          message: validationErrors.array(),
        });
      }

      //If above validation succeeds, update challan status code will run

      const { challanId, status } = req.body;

      const challan = await Challan.findOneAndUpdate(
        { _id: challanId },
        { status },
        { new: true }
      );

      return resolve({
        code: httpStatusCode.OK,
        message: message.CHALLAN_STATUS_UPDATED,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: httpStatusCode.INTERNAL_SERVER_ERROR,
        message: message.INTERNAL_SERVER_ERROR,
      });
    }
  });
};
