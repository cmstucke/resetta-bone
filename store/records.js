import { createSlice } from '@reduxjs/toolkit';
import jwtFetch from './jwt';


const initialState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  biologicalGender: '',
  smokingStatus: '',
  alcoholConsumption: '',
  exerciseFrequency: '',
  emergencyContacts: [],
  familyHistory: [],
  labResults: [],
  immunizations: [],
  dnr: null,
  organDonor: null,
  allergies: [],
  heartRates: [],
  bloodPressures: [],
  preExistingConditions: [],
  medications: [],
  procedures: []
};

const records = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePersonalInfo(state, action) {
      return { ...state, ...action.payload };
    },
    updateFrequencies(state, action) {
        return { ...state, ...action.payload };
    },
    updateEmergencyContacts(state, action) {
        state.emergencyContacts = action.payload;
    },
    updateFamilyHistory(state, action) {
        state.familyHistory = action.payload;
    },
    updateLabResults(state, action) {
        state.labResults = action.payload;
    },
    updateImmunizations(state, action) {
        state.immunizations = action.payload;
    },
    updateDnr(state, action) {
        state.dnr = action.payload;
    },
    updateOrganDonor(state, action) {
        state.organDonor = action.payload;
    },
    updateAllergies(state, action) {
      state.allergies = action.payload;
    },
    updateHeartRates(state, action) {
      state.heartRates = action.payload;
    },
    updateBloodPressures(state, action) {
      state.bloodPressures = action.payload;
    },
    updateConditions(state, action) {
      state.preExistingConditions = action.payload;
    },
    updateMedications(state, action) {
      state.medications = action.payload;
    },
    updateProcedures(state, action) {
      state.procedures = action.payload;
    },
  },
});

export const {
  updatePersonalInfo,
  updateFrequencies,
  updateEmergencyContacts,
  updateFamilyHistory,
  updateLabResults,
  updateImmunizations,
  updateDnr,
  updateOrganDonor,
  updateAllergies,
  updateHeartRates,
  updateBloodPressures,
  updateConditions,
  updateMedications,
  updateProcedures,
} = records.actions;

export default records.reducer;
