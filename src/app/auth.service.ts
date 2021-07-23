import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = "https://sisgain.com:3005";
  imagepath : string = "http://localhost:4200/node-api/";
  constructor(private http: HttpClient) {
  }

  signIn(userData: User): Observable<any>{
    console.log(userData);
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(userData);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/user/adminLogin', body,{'headers':headers})
    
  }
  public isLoggedIn(){
    return sessionStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    sessionStorage.clear();
    sessionStorage.removeItem('ACCESS_TOKEN');
  }

  getPeople(): Observable<User[]> {
    console.log('getPeople '+this.baseURL + 'people')
    return this.http.get<User[]>(this.baseURL + 'people')
  }
 
  addPerson(person:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(person);
    console.log(body)
    return this.http.post(this.baseURL + 'people', body,{'headers':headers})
  }

  createHospital(hospitaldata): Observable<any>{
    console.log(hospitaldata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(hospitaldata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/hospital/createHospital', body,{'headers':headers})
   
  }

  ///user/createBreak
   createBreak(data): Observable<any>{
    console.log(data);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(data);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/user/createBreak', body,{'headers':headers})
   
  }

  ///add/contact
  createContact(data): Observable<any>{
    console.log(data);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(data);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/add/contact', body,{'headers':headers})
   
  }

  createProject(data): Observable<any>{
    console.log(data);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(data);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/add/project', body,{'headers':headers})
   
  }

  getHospital(page,limit) {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getHospital '+this.baseURL + 'hospital')
    return this.http.get(this.baseURL + '/hospital/allList/'+page+'/'+limit,{'headers':headers})
  }

  ///contact​/list​/:agent_id
  getcontact​(agent_id) {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getcontact​ '+this.baseURL + 'getcontact​')
    return this.http.get(this.baseURL + '/contact/list/'+agent_id,{'headers':headers})
  }

  getproject() {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getproject '+this.baseURL + 'getproject')
    return this.http.get(this.baseURL + '/project/list/',{'headers':headers})
  }

  ///video/calls/list/:project
  getvideocalllist(project) {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getproject '+this.baseURL + 'getproject')
    return this.http.get(this.baseURL + '/video/calls/list/'+project,{'headers':headers})
  }
  ///doctor/signUp
  doctorsignup(doctordata): Observable<any>{
    console.log(doctordata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(doctordata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/doctor/signUp', body,{'headers':headers})
   
  }

  ///add/video/call
  addvideocall(videodata): Observable<any>{
    console.log(videodata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(videodata);
    console.log(body);
    debugger
    return this.http.post(this.baseURL + '/add/video/call', body,{'headers':headers})
   
  }

  ///video/getRtcAccessToken
  getRtcAccessToken(videodata): Observable<any>{
    console.log(videodata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(videodata);
    console.log(body);
    debugger
    return this.http.post(this.baseURL + '/video/getRtcAccessToken', body,{'headers':headers})
   
  }

  ///send/sms/videoLink
  smssendvideolink(videodata): Observable<any>{
    console.log(videodata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(videodata);
    console.log(body);
    debugger
    return this.http.post(this.baseURL + '/send/sms/videoLink', body,{'headers':headers})
   
  }

  ///send/email/videoLink
  emailsendvideolink(videodata): Observable<any>{
    console.log(videodata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(videodata);
    console.log(body);
    debugger
    return this.http.post(this.baseURL + '/send/email/videoLink', body,{'headers':headers})
   
  }
  //getDoctor /admin/getDoctorList/:hospital_id/:page?/:limit?
  getDoctor(hospital_id,page,limit) {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getDoctor '+this.baseURL + 'doctor')
    return this.http.get(this.baseURL + '/admin/getDoctorList/'+hospital_id+'/'+page+'/'+limit,{'headers':headers})
  }

  ///admin/addPatient
  patientsignup(patientdata): Observable<any>{
    console.log(patientdata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(patientdata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/admin/addPatient', body,{'headers':headers})
   
    
  }

  ///admin/addUser
  usersignup(userdata): Observable<any>{
    console.log(userdata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(userdata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/admin/addUser', body,{'headers':headers})
   
    
  }

///admin/user/list/:page?/:limit?

  //getUser/admin/getPatientList/:hospital_id/:page?/:limit?
  getUser(page,limit) {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getUser '+this.baseURL + 'patient')
    return this.http.get(this.baseURL + '/admin/user/list/'+page+'/'+limit,{'headers':headers})
  }

  ///admin/addUserOnAsterisk
  addUserOnAsterisk(Asteriskdata): Observable<any>{
    console.log(Asteriskdata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(Asteriskdata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/admin/addUserOnAsterisk', body,{'headers':headers})
   
    
  }

  ///user/add/call
  addUserCall(calldata): Observable<any>{
    console.log(calldata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(calldata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/user/add/call', body,{'headers':headers})
  }

  //user/receive/call
  receiveUserCall(calldata): Observable<any>{
    console.log(calldata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(calldata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/user/receive/call', body,{'headers':headers})
  }
  ///user/end/call
  endUserCall(calldata): Observable<any>{
    console.log(calldata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(calldata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/user/end/call', body,{'headers':headers})
  }
  //createspeciality
  createspeciality(specialitydata): Observable<any>{
    console.log(specialitydata);
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    const body=JSON.stringify(specialitydata);
    console.log(body)
    debugger
    return this.http.post(this.baseURL + '/specialities/create', body,{'headers':headers})
   
  }

  ///asterisk/test

dialcallNumber(calldata): Observable<any>{
  console.log(calldata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(calldata);
  console.log(body)
  debugger
  return this.http.post(this.baseURL + '/asterisk/test', body,{'headers':headers})
 
}

  ///specialities/allList
  getSpecialities(page,limit) {
    var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
    const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
    console.log('getSpecialities '+this.baseURL + 'Specialities')
    return this.http.get(this.baseURL + '/specialities/allList',{'headers':headers})
  }

 ///specialities/update/:id 
 updatespeciality(specialitydata): Observable<any>{
  console.log(specialitydata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(specialitydata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/specialities/update/'+specialitydata.id, body,{'headers':headers})
 
}

///admin/editUser/:uuid
editUser(editUserdata): Observable<any>{
  console.log(editUserdata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(editUserdata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/admin/editUser/'+editUserdata.uuid, body,{'headers':headers})
 
}

///user/updateBreak
 updateBreak(data): Observable<any>{
  console.log(data);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(data);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/user/updateBreak', body,{'headers':headers})
}

///user/updateBreakStatus/:id
 updateBreakStatus(specialitydata,id): Observable<any>{
  console.log(specialitydata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(specialitydata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/user/updateBreakStatus/'+id, body,{'headers':headers})
}
///user/userOnBreak/:id
 userOnBreak(id,data): Observable<any>{
  console.log(data);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(data);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/user/userOnBreak/'+id, body,{'headers':headers})
}

///specialities/activeInactive/:id
changestatusspeciality(specialitydata): Observable<any>{
  console.log(specialitydata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(specialitydata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/specialities/activeInactive/'+specialitydata.id, body,{'headers':headers})
 
}


///hospital/update/:hospital_id
updatehospital(hospitaldata): Observable<any>{
  console.log(hospitaldata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(hospitaldata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/hospital/update/'+hospitaldata.hospital_id, body,{'headers':headers})
 
}

///hospital/activeInactive/:hospital_id
changestatushospital(hospitaldata): Observable<any>{
  console.log(hospitaldata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(hospitaldata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/hospital/activeInactive/'+hospitaldata.id, body,{'headers':headers})
 
}

//createPassword
createPassword(passworddata): Observable<any>{
  console.log(passworddata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(passworddata);
  console.log(body)
  debugger
  return this.http.post(this.baseURL + '/admin/resetPassword', body,{'headers':headers})
 
}

//updateDoctor
updateDoctor(doctordata): Observable<any>{
  console.log(doctordata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(doctordata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/doctor/update/'+doctordata.uuid, body,{'headers':headers})
 
}

//
​//patient​/updateProfile​/:uuid
updateProfile​(profiledata): Observable<any>{
  console.log(profiledata);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  const body=JSON.stringify(profiledata);
  console.log(body)
  debugger
  return this.http.put(this.baseURL + '/patient/updateProfile/'+profiledata.uuid, body,{'headers':headers})
 
}

///patient/specialities/list
getpatientSpecialities() {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getpatientSpecialities '+this.baseURL + 'Specialities')
  return this.http.get(this.baseURL + '/patient/specialities/list',{'headers':headers})
}

///patient/vitals/:patient_id
getpatientvitals(patient_id) {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getpatientvitals'+this.baseURL + 'vitals')
  return this.http.get(this.baseURL + '/patient/vitals/'+patient_id,{'headers':headers})
}

////admin​/appointment​/upcoming​/:page​/:limit​/:hospital_id
getupcomingAppointment​(page,limit,hospital_id) {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getupcomingAppointment​ '+this.baseURL + 'appointment​')
  return this.http.get(this.baseURL + '/admin/appointment/upcoming/'+page+'/'+limit+'/'+hospital_id,{'headers':headers})
}

///admin/appointment/past/:page/:limit/:hospital_id
getpastAppointment​(page,limit,hospital_id) {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getpastAppointment​ '+this.baseURL + 'appointment​')
  return this.http.get(this.baseURL + '/admin/appointment/past/'+page+'/'+limit+'/'+hospital_id,{'headers':headers})
}

///admin/payment/:page/:limit/:hospital_id
getpayment​(page,limit,hospital_id) {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getpastAppointment​ '+this.baseURL + 'appointment​')
  return this.http.get(this.baseURL + '/admin/payment/'+page+'/'+limit+'/'+hospital_id,{'headers':headers})
}

///admin/appointment/delete/:appointment_id
deleteappointment(id): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('deleteappointment '+this.baseURL + 'appointment​')
  return this.http.delete(this.baseURL + '/admin/appointment/delete/'+id,{'headers':headers})
}

///user/logout/:uuid
signout(uuid): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('signout '+this.baseURL + 'signout')
  return this.http.get(this.baseURL + '/user/logout/'+uuid,{'headers':headers})
}

///admin/dashboard/count/:hospital_id
getdashboardcount(hospital_id) : Observable<any>{
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getdashboardcount '+this.baseURL + 'count')
  return this.http.get(this.baseURL + '/admin/dashboard/count/'+hospital_id,{'headers':headers})
}

///admin/callLogs/:page/:limit/:hospital_id
getcalllogs(page,limit,hospital_id): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getcalllogs '+this.baseURL + 'calllog')
  return this.http.get(this.baseURL + '/admin/callLogs/'+page+'/'+limit+'/'+hospital_id,{'headers':headers})
}

///user/callLogs/list/:page?/:limit?
getUsercalllogs(page,limit): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getcalllogs '+this.baseURL + 'calllog')
  return this.http.get(this.baseURL + '/user/callLogs/list/'+page+'/'+limit,{'headers':headers})
}

//
​//admin​/break​/list​/:page?​/:limit?
getadminbreaklist(page,limit): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getadminbreaklist '+this.baseURL + 'breaktype')
  return this.http.get(this.baseURL + '/admin/break/list/'+page+'/'+limit,{'headers':headers})
}

///recently/adduser/:hospital_id
getrecentlyuserlist(hospital_id): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('getrecentlyuserlist '+this.baseURL + 'userlist')
  return this.http.get(this.baseURL + '/recently/adduser/'+hospital_id,{'headers':headers})
}

///admin/forgot/password/:email

forgotpassword(email): Observable<any> {
  console.log('forgotpassword '+this.baseURL + 'forgotpassword')
  return this.http.get(this.baseURL + '/admin/forgot/password/'+email)
}

///upload/singlefile
uploadsinglefile(file): Observable<any>{
  console.log(file);
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  var formData = new FormData();
  formData.append('image',file[0]);
  debugger
  return this.http.post(this.baseURL + '/upload/singlefile', formData,{'headers':headers})
 
}

///hospital/:hospital_id
gethospitalData(hospital_id): Observable<any> {
  var ACCESS_TOKEN = sessionStorage.getItem('ACCESS_TOKEN');
  const headers = { 'content-type': 'application/json', 'X-AUTH-TOKEN' : ACCESS_TOKEN}  
  console.log('gethospital '+this.baseURL + 'gethospital')
  return this.http.get(this.baseURL + '/hospital/'+hospital_id,{'headers':headers})
}

}