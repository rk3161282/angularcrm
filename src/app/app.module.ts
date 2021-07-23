import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { AlphabetOnlyDirective } from './alphabet-only.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { PhoneMaskDirective } from './phone-mask.directive';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './inc/header/header.component';
import { SidebarComponent } from './inc/sidebar/sidebar.component';
import { FooterComponent } from './inc/footer/footer.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CallLogComponent } from './call/call-log/call-log.component';
import { CallQueueComponent } from './call/call-queue/call-queue.component';
import { CallOngoingCallComponent } from './call/call-ongoing-call/call-ongoing-call.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ChartsModule } from 'ng2-charts';
import { DialCallComponent } from './dial-call/dial-call.component';
import { WindowComponent } from './window.component';
import { DialPadComponent } from './dial-pad/dial-pad.component';
import { BreakTypeComponent } from './break-type/break-type.component';
import { AddBreakComponent } from './add-break/add-break.component';
import { ChartModule } from 'smart-webcomponents-angular/chart';
import { CheckBoxModule } from 'smart-webcomponents-angular/checkbox';
import { ContactlistComponent } from './contact/contactlist/contactlist.component';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { ProjectlistComponent } from './project/projectlist/projectlist.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';
import { DataTablesModule } from 'angular-datatables';
import { CallscreenComponent } from './video/callscreen/callscreen.component';
import { CallinputComponent } from './video/callinput/callinput.component';
import { environment } from 'src/environments/environment';
const agoraConfig: AgoraConfig = {
  AppID: environment.agora.appId
};
@NgModule({
  declarations: [
    AppComponent,
    AlphabetOnlyDirective,
    NumbersOnlyDirective,
    PhoneMaskDirective,
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
    CallLogComponent,
    CallQueueComponent,
    CallOngoingCallComponent,
    ForgotComponent,
    AddUserComponent,
    DialCallComponent,
    WindowComponent,
    DialPadComponent,
    BreakTypeComponent,
    AddBreakComponent,
    ContactlistComponent,
    CreateContactComponent,
    ProjectlistComponent,
    AddprojectComponent,
    CallscreenComponent,
    CallinputComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ChartModule,
    DataTablesModule,
    CheckBoxModule,
    NgxAgoraModule.forRoot(agoraConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
