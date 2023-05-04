const mongoose = require('mongoose');
const dict = require('./dictionary.json');
let schemas = {};
let schema = mongoose.Schema;

schemas.userSchema = () => {
    let userschema = new schema(dict.user)
    return userschema;
}
schemas.jwtSchema = () => {
    let jwtschema = new schema(dict.jwt)
    return jwtschema;
}
schemas.doctorSchema = () => {
    let doctorschema = new schema(dict.doctor)
    return doctorschema;
}
schemas.medicalSchema = () => {
    let medicalschema = new schema(dict.medical)
    return medicalschema;
}
schemas.diseaseSchema = () => {
    let diseaseschema = new schema(dict.diesase)
    return diseaseschema;
}
schemas.appointmentSchema = () => {
    let appointmentschema = new schema(dict.appointment)
    return appointmentschema;
}
schemas.medicineSchema = () => {
    let medicineschema = new schema(dict.medicine)
    return medicineschema;
}
schemas.msgSchema = () => {
    let messagechema = new schema(dict.message)
    return messagechema;
}
module.exports = schemas;