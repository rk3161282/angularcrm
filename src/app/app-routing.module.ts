import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CallLogComponent } from './call/call-log/call-log.component';
import { CallOngoingCallComponent } from './call/call-ongoing-call/call-ongoing-call.component';
import { CallQueueComponent } from './call/call-queue/call-queue.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DialCallComponent } from './dial-call/dial-call.component';
import { DialPadComponent } from './dial-pad/dial-pad.component';
import { BreakTypeComponent } from './break-type/break-type.component';
import { AddBreakComponent } from './add-break/add-break.component';
import { ContactlistComponent } from './contact/contactlist/contactlist.component';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { ProjectlistComponent } from './project/projectlist/projectlist.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { CallscreenComponent } from './video/callscreen/callscreen.component';
import { CallinputComponent } from './video/callinput/callinput.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'forgot-password', component: ForgotComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user-add', component: AddUserComponent },
    { path: 'user-view', component: UserViewComponent },
    { path: 'user-edit', component: UserEditComponent },
    { path: 'call-logs', component: CallLogComponent },
    { path: 'call-queue', component: CallQueueComponent },
    { path: 'ongoing-call', component: CallOngoingCallComponent },
    { path: 'dial-call', component: DialCallComponent },
    { path: 'dial-pad', component: DialPadComponent },
    { path: 'break-type', component: BreakTypeComponent },
    { path: 'add-break-type', component: AddBreakComponent },
    { path: 'contact-list', component: ContactlistComponent },
    { path: 'add-contact', component: CreateContactComponent },
    { path: 'project-list', component: ProjectlistComponent },
    { path: 'add-project', component: AddprojectComponent },
    { path: 'video-call-screen', component: CallscreenComponent },
    { path: 'landing-page', component: CallinputComponent },
    { path: 'virtualUrl/:project_name', component: CallinputComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 