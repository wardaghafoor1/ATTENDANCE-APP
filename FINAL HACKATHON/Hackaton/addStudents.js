import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBOsb65cDibDiUVGeKyuWf4NYs2RntnEcA",
    authDomain: "allset-29966.firebaseapp.com",
    databaseURL: "https://allset-29966-default-rtdb.firebaseio.com",
    projectId: "allset-29966",
    storageBucket: "allset-29966.appspot.com",
    messagingSenderId: "413876145098",
    appId: "1:413876145098:web:9b7860deec3850f9119d33",
    measurementId: "G-1DFBPHQ616"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);



let name = document.getElementById("name")
let fathername = document.getElementById("fathername")
let rollNumber = document.getElementById("rollNumber")
let contact = document.getElementById("contact")
let CNIC = document.getElementById("CNIC")
let course = document.getElementById("course")
let sir = document.getElementById("sir")

let picture = document.getElementById("picture")
var reader;
var uploadedImage;
picture.addEventListener("change", function () {
    reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImage = reader.result;
        document.querySelector("#showPic").style.backgroundImage = `url(${uploadedImage})`;
        document.querySelector("#showPic").style.width = "100px"
        document.querySelector("#showPic").style.height = "100px"
        document.querySelector("#showPic").style.marginLeft = "70px"
        document.querySelector("#showPic").style.borderRadius = "10px"
    });
    reader.readAsDataURL(this.files[0]);
});
const sendstudentDAta = async () => {
    if (name.value != "" && fathername.value != "" && rollNumber.value != "" && contact.value != "" && CNIC.value != "" && picture.files != "" && course.value != "" && sir.value != "") {
        await addDoc(collection(db, "Students"), {
            studentname: name.value,
            fathername: fathername.value,
            rollNumber:rollNumber.value,
            contact: contact.value,
            CNIC: CNIC.value,
            sirName: sir.value,
            course: course.value,
        });
        swal({
            title: "SUCCESSFULLY ADDED!",
            text: "You clicked the button!",
            icon: "success",
            button: "DONE!",
        });
        name.value = ""
        fathername.value = ""
        contact.value = ""
        CNIC.value = ""
        rollNumber.value = ""

    }
    else {
        swal("Please Enter Values")
    }
}

window.sendstudentDAta = sendstudentDAta