import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DepartementComponent } from './pages/departement/departement.component';



import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './pages/dialog/dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { ClasseComponent } from './pages/classe/classe.component';
import { DialogclasseComponent } from './pages/dialogclasse/dialogclasse.component';

import { NotifierModule } from 'angular-notifier';
import { InformatiqueComponent } from './pages/informatique/informatique.component';
import { MecaniqueComponent } from './pages/mecanique/mecanique.component';
import { MecatroniqueComponent } from './pages/mecatronique/mecatronique.component';
import { TelecommunicationComponent } from './pages/telecommunication/telecommunication.component';
import { UpComponent } from './pages/up/up.component';
import { DialogupComponent } from './pages/dialogup/dialogup.component';
import { DialogmoduleComponent } from './pages/dialogmodule/dialogmodule.component';
import { ModuleComponent } from './pages/module/module.component';
import { ShowclassesComponent } from './pages/showclasses/showclasses.component';
import { DeveloppementfrontendComponent } from './pages/developpementfrontend/developpementfrontend.component';
import { DeveloppementbackendComponent } from './pages/developpementbackend/developpementbackend.component';
import { DeveloppementwebetmobileComponent } from './pages/developpementwebetmobile/developpementwebetmobile.component';
import { CompetenceComponent } from './pages/competence/competence.component';
import { DialogcompetenceComponent } from './pages/dialogcompetence/dialogcompetence.component';
import { EnseignantComponent } from './pages/enseignant/enseignant.component';
import { DialogenseignantComponent } from './pages/dialogenseignant/dialogenseignant.component';
import { UPJAVAComponent } from './pages/upjava/upjava.component';
import { UPWEBComponent } from './pages/upweb/upweb.component';
import { UPASIComponent } from './pages/upasi/upasi.component';
import { AffectationComponent } from './pages/affectation/affectation.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    NotifierModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DepartementComponent,
    DialogComponent,
    ClasseComponent,
    DialogclasseComponent,
    InformatiqueComponent,
    MecaniqueComponent,
    MecatroniqueComponent,
    TelecommunicationComponent,
    UpComponent,
    DialogupComponent,
    DialogmoduleComponent,
    ModuleComponent,
    ShowclassesComponent,
    DeveloppementfrontendComponent,
    DeveloppementbackendComponent,
    DeveloppementwebetmobileComponent,
    CompetenceComponent,
    DialogcompetenceComponent,
    EnseignantComponent,
    DialogenseignantComponent,
    UPJAVAComponent,
    UPWEBComponent,
    UPASIComponent,
    AffectationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
