const jwt = require("jsonwebtoken");
const sch = require('../Table/schema')
const mongoose = require('mongoose');
const axios=require('axios')
const spawn=require('child_process').spawn;
function connect() {
    const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";
    const connection = mongoose.createConnection(url,
        { useNewUrlParser: true, useUnifiedTopology: true })
    return connection;
}
let operation = {};


operation.ulogIn = async (data) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("patients", sch.userSchema());
        const user = await userModel.find({ Email: data.Email, Password: data.Password },{_id:0});
        if (user.length != 0) {
            let coll1 = conn.useDb('Test');
            let jwtModel = coll1.model("jwts", sch.jwtSchema());
            let jwtData = {
                Name: user[0].Name,
                Email:user[0].Email,
                Built_Time: new Date()
            }
            let token = jwt.sign(jwtData, "SECRETKEY",{expiresIn:"1m"}); 
            await jwtModel.insertMany({ Token: token, Name: user[0].Name, Built_Time: new Date(), Logout: false })
            conn.close();
            resolve({ Success: true, Message: "Login Successfull", Token: token,Data:user })
        }
        reject({ Success: false, Message: "No User Found" })
    });
};
operation.ulogOut = async (token) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect()
        let coll = conn.useDb('Test')
        let jwtModel = coll.model("jwts", sch.jwtSchema())
        let updatedtoekn = await jwtModel.updateOne(
            { Token: token },
            { $set: { Logout: true } },
            { upsert: false }
        );
        if (updatedtoekn.modifiedCount != 0) {
            resolve({ Success: true, Message: "Logged Out Successfully" });
        } else {
            reject({ Success: false, Message: "Already Logged Out" });
        }
    });
};
operation.patientRegistration = async (data) => {
    // console.log(data);
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("patients", sch.userSchema())
        try {
            let user = await userModel.insertMany(data);
            if (user.length != 0) {
                resolve({ Sccess: true, Message: "Patient Registered Succesfully", UserID: user[0].Email })
            }
        } catch (err) {
            reject({ Success: false, Message: "Registration Failed.", Error: "Email Already Registered" })
        }


    })
}
operation.doctorRegistration = async (data) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("doctors", sch.doctorSchema())

        try {
            data.Avaibility = false
            let user = await userModel.insertMany(data);
            console.log(user);
            conn.close();
            if (user.length != 0) {
                resolve({ Sccess: true, Message: "Doctor Registered Succesfully", UserID: user[0].Email })
            }
        } catch (err) {
            reject({ Success: false, Message: "Registration Failed.", Error: "Email Already Registered" })
        }


    })
}
operation.dlogIn = async (data) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("doctors", sch.userSchema());
        const user = await userModel.find({ Email: data.Email, Password: data.Password });
        if (user.length != 0) {
            let coll1 = conn.useDb('Test');
            let jwtModel = coll1.model("jwts", sch.jwtSchema());
            let jwtData = {
                Name: user[0].Name,
                Email:user[0].Email,
                Built_Time: new Date()
            }
            let token = jwt.sign(jwtData, "SECRETKEY");
            await jwtModel.insertMany({ Token: token, Name: user[0].Name, Built_Time: new Date(), Logout: false })
            conn.close();
            resolve({ Success: true, Message: "Login Successfull", Token: token ,Data:user})
        }
        reject({ Success: false, Message: "No User Found" })
    });
};
operation.dlogOut = async (token) => {
    return new Promise(async (resolve, reject) => {
        let conn = connect()
        let coll = conn.useDb('Test')
        let jwtModel = coll.model("jwts", sch.jwtSchema())
        let updatedtoekn = await jwtModel.updateOne(
            { Token: token },
            { $set: { Logout: true } },
            { upsert: false }
        );
        if (updatedtoekn.modifiedCount != 0) {
            resolve({ Success: true, Message: "Logged Out Successfully" });
        } else {
            reject({ Success: false, Message: "Already Logged Out" });
        }
    });
};
operation.userHome=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("patients", sch.userSchema());
        let userData=await userModel.findOne({Email:data.Email},{_id:0});
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"AUthorization failed"})
        }
    })
}
operation.docHome=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("doctors", sch.doctorSchema());
        let userData=await userModel.findOne({Email:data.Email},{_id:0});
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"AUthorization failed"})
        }
    })
}
operation.medicalHistory=async(data)=>{
    console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("medicals", sch.medicalSchema());
        let userData=await userModel.find({'patemail':data.Email},{_id:0});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.selfDiago=async(data,userData)=>{
    console.log("data service",data.symtom);
    return new Promise(async(resolve,reject)=>{
        
      //  data.patname=decode.Name;
      //  data.patmail=decode.Email;
       
       try{ 
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("diseases", sch.diseaseSchema());
        let hisModel=coll.model("medicals",sch.medicalSchema())
        
      await axios.post('http://127.0.0.1:8888/test',
        {
            "symtom":data.symtom
        })
        .then(async(response) => {
          console.log("787879879877",response.data);
        //   let da=response.data
          let arr=response.data.data
          console.log("arrr",arr);
        let diesaseData=await userModel.findOne({disease:arr},{_id:0})
        console.log(diesaseData);
        let diseashiseData={
            
                "date": new Date(),
                "symtoms": data.symtom,
                "disease": arr,
                "medicine":diesaseData.medicine,
                "advise": diesaseData.advice,
                "details":diesaseData.details,
                "docname": "Self",
                "docemail": null,
                "patname": userData.Name,
                "patemail": userData.Email

        }
        await hisModel.insertMany(diseashiseData,{versionkey:false});
        // if(diesaseData.length!=0){
            resolve({success:true,data:{date:new Date(),
                "disease":arr,"details":diesaseData.details,"advice":diesaseData.advice,
                "medicine":diesaseData.medicine,"symtoms":data.symtom
        }})
        
         
        })
            
    }catch(err){
        reject({success:false,msg:"failed"})
    }

})}
operation.appointDoc=async()=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        console.log("service called");
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("doctors", sch.doctorSchema());
        let userData=await userModel.find({Avaibility:true},{_id:0});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.bookDoc=async(data)=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        // console.log("service called");
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("appointments", sch.appointmentSchema());
        let userData=await userModel.insertMany(data);
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.showAppointment=async(data)=>{
    console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("appointments", sch.appointmentSchema());
        let userData=await userModel.find({'pat_email':data.pat_email},{_id:0,pat_name:0,pat_email:0});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}

operation.showAppointmentdoc=async(data)=>{
    console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("appointments", sch.appointmentSchema());
        let userData=await userModel.find({'doc_email':data.doc_email},{_id:0,doc_name:0,doc_email:0});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.getPathis=async()=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("medicals", sch.medicalSchema());
        let userData=await userModel.find({},{_id:0});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.patsearch=async(name)=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("medicals", sch.medicalSchema());
        let userData=await userModel.find({patname:name},{_id:0});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.medicineList=async()=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("medicines", sch.medicineSchema());
        let userData=await userModel.find({'type':'medicine'},{_id:0,});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,products:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.getOneMed=async(title)=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("medicines", sch.medicineSchema());
        let userData=await userModel.find({title:title},{_id:0,});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,products:userData})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.avlUpdate=async(data)=>{
    // console.log("data service",data);
    console.log(data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("doctors", sch.doctorSchema());
        let userData=await userModel.updateOne({Email:data.Email},{$set:data.data});
        console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Message:"Updated"})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.sendMail=async(data)=>{
    // console.log("data service",data);
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("messages", sch.msgSchema());
        let userData=await userModel.insertMany(data);
        // console.log(userData);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Message:"Message Succesfully Send,Our Representiitve will reach you shortly."})
        }
        else{
            reject({Success:false,Message:"DB operation failed"})
        }
    })
}
operation.sendReport=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        let conn = connect();
        let coll = conn.useDb('Test');
        let userModel = coll.model("medicals", sch.medicalSchema());
        let userData=await userModel.insertMany(data);
        conn.close();
        if(userData.length!=0){
            resolve({Success:true,Data:userData})
        }
        else{
            reject({Success:false,Message:"AUthorization failed"})
        }
    })
}

module.exports = operation;

