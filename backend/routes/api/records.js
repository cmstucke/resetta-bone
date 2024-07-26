const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Record = mongoose.model("Record");
const { requireUser } = require('../../config/passport');


//get current user's record
router.get('/:id', async function(req, res, next) {
    try {
        const report = await Report.findById(req.params.id);
        return res.json(report);
      } catch(err) {
        const error = new Error('Report not found');
        error.statusCode = 404;
        error.errors = { message: "No report found" };
        return next(error);
      }
});


//get current user's record
router.get('/', requireUser, async function(req, res, next) {
    try {
        const report = await Report.find({user: req.user})
        return res.json(report)
      } catch(err) {
        const error = new Error('Report not found');
        error.statusCode = 404;
        error.errors = { message: "No report found for user" };
        return next(error);
      }
});

//create record for current user
router.post('/', requireUser, async (req, res) => {
    try {
        const {allergies, heart_rate, blood_pressure, pre_existing_conditions, medications, procedures} = req.body;
        const newRecord = new Record ({
            user: req.user,
            allergies,
            heart_rate,
            blood_pressure,
            pre_existing_conditions,
            medications,
            procedures
        });
  
        const record = await newRecord.save();
        return res.json(record);
  
    }catch(err){
      const error = new Error('Record not saved');
      error.statusCode = 404;
      error.errors = { message: "Record was unable to be saved" };
      return next(error);
    }
});

//update current user's record
router.patch('/:id', requireUser, async (req, res) => {
    const record = await Record.findOne({ _id: req.params.id, user: {_id: req.user._id}})
    if(!record) {
        const err = new Error("Validation Error");
        err.statusCode = 400;
        const errors = {};
        err.errors = errors;
        errors.userId = "You are not the owner of this Record";
        return next(err);
      }
    try{
        const {allergies, heart_rate, blood_pressure, pre_existing_conditions, medications, procedures} = req.body;
        record.allergies = allergies || record.allergies;
        record.heart_rate = heart_rate || record.heart_rate;
        record.blood_pressure = blood_pressure || record.blood_pressure;
        record.pre_existing_conditions = pre_existing_conditions || record.pre_existing_conditions;
        record.medications = medications || record.medications;
        record.procedures = procedures || record.procedures;

        const updatedRecord = await record.save();
        return res.json(updatedRecord);
    
    }catch(err) {
        next(err);
    }
});
  
//delete record - may not need this route
  router.delete('/:id', requireUser, async (req, res) => {
    const record = await Record.findOne({ _id: req.params.id, user: {_id: req.user._id}})
    if(!record) {
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      err.errors = errors;
      errors.userId = "You are not the owner of this Record";
      return next(err);
    }
  
    try{
      await Record.deleteOne({_id: req.params.id})
      return res.json('Successfully Deleted')
    }catch(err) {
      next(err);
    }
  });


