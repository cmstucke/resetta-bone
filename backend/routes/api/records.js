const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Record = mongoose.model("Record");
const User = mongoose.model("User");

const { requireUser } = require('../../config/passport');


//all records
router.get('/', async function(req, res, next) {
    try {
        const records = await Record.find();
        return res.json(records);
      } catch(err) {
        const error = new Error('records not found');
        error.statusCode = 404;
        error.errors = { message: "No records found" };
        return next(error);
      }
});

//get record by id
router.get('/:id', async function(req, res, next) {
    try {
        const record = await Record.findById(req.params.id);
        return res.json(record);
      } catch(err) {
        const error = new Error('Record not found');
        error.statusCode = 404;
        error.errors = { message: "No record found" };
        return next(error);
      }
});


//get current user's record
router.get('/', requireUser, async function(req, res, next) {
    try {
        const record = await Record.find({user: req.user})
        return res.json(record)
      } catch(err) {
        const error = new Error('Record not found');
        error.statusCode = 404;
        error.errors = { message: "No recordfound for user" };
        return next(error);
      }
});

//create record for current user
// router.post('/', requireUser, async (req, res) => {
router.post('/', async (req, res, next) => {

    const user = req.user ? req.user : User.find({username: "tvong"})
    try {
        const {
            smokingStatus,
            alcoholConsumption,
            exerciseFrequency,
            emergencyContacts,
            familyHistory,
            labResults,
            immunizations,
            DNR,
            organDonor,
            allergies, 
            heartRates, 
            bloodPressures, 
            preExistingConditions, 
            medications, 
            procedures,
            } = req.body;
        const newRecord = new Record ({
            // user: user,
            smokingStatus,
            alcoholConsumption,
            exerciseFrequency,
            emergencyContacts,
            familyHistory,
            labResults,
            immunizations,
            DNR,
            organDonor,
            allergies,
            heartRates,
            bloodPressures,
            preExistingConditions,
            medications,
            procedures
        });
  
        const record = await newRecord.save();
        return res.json(record);
  
    }catch(err){
        console.log(err)
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
        const {
            smokingStatus,
            alcoholConsumption,
            exerciseFrequency,
            emergencyContacts,
            familyHistory,
            labResults,
            immunizations,
            DNR,
            organDonor,
            allergies, 
            heartRates, 
            bloodPressures, 
            preExistingConditions, 
            medications, 
            procedures
        } = req.body;
        record.smokingStatus = smokingStatus || record.smokingStatus;
        record.alcoholConsumption = alcoholConsumption || record.alcoholConsumption;
        record.exerciseFrequency = exerciseFrequency || record.exerciseFrequency;
        record.emergencyContacts = emergencyContacts || record.emergencyContacts;
        record.familyHistory = familyHistory || record.familyHistory;
        record.labResults = labResults || record.labResults;
        record.immunizations = immunizations || record.immunizations;
        record.DNR = DNR || record.DNR;
        record.organDonor = organDonor || record.organDonor;
        record.allergies = allergies || record.allergies;
        record.heartRate = heartRates || record.heartRates;
        record.bloodPressure = bloodPressures || record.bloodPressures;
        record.preExistingConditions = preExistingConditions || record.preExistingConditions;
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


  module.exports = router