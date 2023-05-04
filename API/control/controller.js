const express = require('express');

const db = require('../../Service/dboperation');

let service = {};
service.ulogin = async (req, res) => {
    let data = req.body;
    // console.log(data);

    try {
        let response = await db.ulogIn(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json({ err })
    }

}
service.ulogout = async (req, res) => {
    let token = req.headers.token;

    try {
        let response = await db.ulogOut(token);
        if (response) {
            res.json({ response });

        }
    } catch (err) {
        res.json(err)
    }

}
service.patReg = async (req, res) => {
    let data = req.body;
    try {
        let response = await db.patientRegistration(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.dlogin = async (req, res) => {
    let data = req.body;
    // console.log(data);

    try {
        let response = await db.dlogIn(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json({ err })
    }

}
service.dlogout = async (req, res) => {
    let token = req.headers.token;

    try {
        let response = await db.dlogOut(token);
        if (response) {
            res.json({ response });

        }
    } catch (err) {
        res.json(err)
    }

}
service.docReg = async (req, res) => {
    let data = req.body;
    try {
        let response = await db.doctorRegistration(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.userhome=async(req,res)=>{
    let data=req.decode;
    try {
        let response = await db.userHome(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json( err )
    }
}
service.dochome=async(req,res)=>{
    let data=req.decode;
    try {
        let response = await db.docHome(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json( err )
    }
}
service.medhis = async (req, res) => {
   let data=req.body;
    try {
        let response = await db.medicalHistory(data);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
}
service.selfcheck = async (req, res) => {
    try {
        let data=req.body;
        let userData=req.decode;
        console.log("body contr", data.symtom);
        let response = await db.selfDiago(data,userData);
        if (response) {
            res.json(response);
        }
    } catch (err) {
        res.json(err)
    }
        //  let response = await db.selfDiago(data,decode);
        //  if (response) {
        //      res.json(response);
         //}
     
 }
 service.appoint = async (req, res) => {
    // let data=req.body;
     try {
        console.log("contrloler called");
         let response = await db.appointDoc();
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.sendreport = async (req, res) => {
    let data=req.body;
     try {
        console.log("contrloler called");
         let response = await db.sendReport(data);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.docappoint = async (req, res) => {
    let data=req.body.data;
     try {
        // console.log("contrloler called");
         let response = await db.bookDoc(data);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.showAppoint = async (req, res) => {
    let data=req.body;
     try {
         let response = await db.showAppointment(data);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.showAppointtodoc = async (req, res) => {
    let data=req.body;
     try {
         let response = await db.showAppointmentdoc(data);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.pathis = async (req, res) => {
    // let data=req.body;
     try {
         let response = await db.getPathis();
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.search = async (req, res) => {
  let name=req.params.name;
     try {
         let response = await db.patsearch(name);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.medicinelist = async (req, res) => {
    // let data=req.body;
     try {
         let response = await db.medicineList();
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.getonemedicine = async (req, res) => {
    let title=req.params.title;
     try {
         let response = await db.getOneMed(title);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.sendmail = async (req, res) => {
    let data=req.body;
     try {
         let response = await db.sendMail(data);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
 service.updateavl = async (req, res) => {
    let data=req.body;
    
     try {
         let response = await db.avlUpdate(data);
         if (response) {
             res.json(response);
         }
     } catch (err) {
         res.json(err)
     }
 }
module.exports = service;