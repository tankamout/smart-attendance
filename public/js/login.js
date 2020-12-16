let a=document.getElementById('s');
let b=document.getElementById('t');
let c=document.getElementById('change');
let d=document.getElementById('student-lform');
let e=document.getElementById('teacher-lform');

let sl_email=document.getElementById('sl_email');
let sl_password=document.getElementById('sl_password');

// student-register-error
let image_error=document.getElementById('image-error');
let rollno_error=document.getElementById('rollno-error');
let name_error=document.getElementById('name-error');
let email_error=document.getElementById('email-error');
let password_error=document.getElementById('password-error');

// student-login-error
let sl_email_error=document.getElementById('sl_email-error');
let sl_password_error=document.getElementById('sl_password-error');
let sl_error=document.getElementById('sl_error');


// student login form
function s(){

a.classList.add('act');

b.classList.remove('active');
c.textContent="student";
d.style.display="block";

e.style.display="none";
}
// teacher login form
function t(){
a.classList.remove('act');
a.classList.remove('active');
b.classList.add('active');
c.textContent="teacher";
d.style.display="none";
e.style.display="block";

}
//  student password
function sshow(){

let y=document.getElementById('seye');
if (sl_password.type === "password") {
sl_password.type = "text";

y.classList.remove('fa-eye-slash');
y.classList.add('fa-eye');
} else {
sl_password.type = "password";
y.classList.remove('fa-eye');
y.classList.add('fa-eye-slash');
}
}

// teacher password
function tshow(){
let x = document.getElementById("tpassword");
let y=document.getElementById('teye');
if (x.type === "password") {
x.type = "text";

y.classList.remove('fa-eye-slash');
y.classList.add('fa-eye');
} else {
x.type = "password";
y.classList.remove('fa-eye');
y.classList.add('fa-eye-slash');
}

}

// image preview
function readURL(image) {
if (image.files && image.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
                      $('#imagepreview')
            .attr('src', e.target.result);                    
    };

    reader.readAsDataURL(image.files[0]);
}
}


function sregister(){
document.getElementById('loading').style.visibility="show";
document.getElementById('signup').setAttribute('disabled',true);
document.getElementById('signup').innerHTML="Loading...";

};

// student register



let studentregister=document.forms['studentregister'];
studentregister.onsubmit=function(e){
let formData=new FormData();
let image=document.getElementById('image');
let name=document.getElementById('name');
let rollno=document.getElementById('rollno');
let year=document.getElementById('year');
let email=document.getElementById('email');
let major=document.getElementById('major');
let password=document.getElementById('password');

formData.append("image", image.files[0]);
formData.append("name",name.value);
formData.append("rollno",rollno.value);
formData.append("year",year.value);
formData.append("email",email.value);
formData.append("major",major.value);
formData.append("password",password.value);

e.preventDefault();
console.log(year.value);
console.log(major.value);

axios.post('/api/register/student',formData,
{
headers: {
'Content-Type': 'multipart/form-data'
}
}
)
.then(res=>{

 console.log(res);

 if(res.data.msg=='tovertify'){
 
      document.getElementsByClassName("btn_text").innerHTML="Loading ...";
      document.getElementById("loading-icon").style.opacity=1;
      document.getElementById("signup").setAttribute('disabled',true);
 
 
   window.location="/verification";
 }


res.data.image?image_error.innerHTML=res.data.image:image_error.innerHTML='';
res.data.rollno?rollno_error.innerHTML=res.data.rollno:rollno_error.innerHTML='';
res.data.name?name_error.innerHTML=res.data.name:name_error.innerHTML='';
res.data.email?email_error.innerHTML=res.data.email:email_error.innerHTML='';
res.data.password?password_error.innerHTML=res.data.password:password_error.innerHTML='';
});
}

//  student-login
let studentlogin=document.forms['studentlogin'];
studentlogin.onsubmit=function(e){

e.preventDefault();
axios.post('/api/login/student',{
'email':sl_email.value,
'password':sl_password.value,
})
.then(res=>{
console.log(res);
if(res.data.msg=='Valid'){
  document.getElementsByClassName("sbtn_text").innerHTML="Loading ...";
  document.getElementById("sloading-icon").style.opacity=1;
  document.getElementById("ssubmit").setAttribute('disabled',true);
window.location='/student';
}
if(res.data.fail){
  sl_error.style.display="block";
}
res.data.email?sl_email_error.innerHTML=res.data.email:sl_email_error.innerHTML='';
res.data.password?sl_password_error.innerHTML=res.data.password:sl_password_error.innerHTML='';
res.data.fail?sl_error.innerHTML='<i class="fas fa-exclamation-circle"></i>     '+res.data.fail:sl_error.innerHTML='';
});
}