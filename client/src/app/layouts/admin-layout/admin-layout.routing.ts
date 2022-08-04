import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DepartementComponent } from 'src/app/pages/departement/departement.component';
import { ClasseComponent } from 'src/app/pages/classe/classe.component';
import { InformatiqueComponent } from 'src/app/pages/informatique/informatique.component';
import { MecaniqueComponent } from 'src/app/pages/mecanique/mecanique.component';
import { MecatroniqueComponent } from 'src/app/pages/mecatronique/mecatronique.component';
import { TelecommunicationComponent } from 'src/app/pages/telecommunication/telecommunication.component';
import { UpComponent } from 'src/app/pages/up/up.component';
import { ModuleComponent } from 'src/app/pages/module/module.component';
import { ShowclassesComponent } from 'src/app/pages/showclasses/showclasses.component';
import { DeveloppementfrontendComponent } from 'src/app/pages/developpementfrontend/developpementfrontend.component';
import { DeveloppementbackendComponent } from 'src/app/pages/developpementbackend/developpementbackend.component';
import { DeveloppementwebetmobileComponent } from 'src/app/pages/developpementwebetmobile/developpementwebetmobile.component';
import { CompetenceComponent } from 'src/app/pages/competence/competence.component';
import { EnseignantComponent } from 'src/app/pages/enseignant/enseignant.component';
import { UPJAVAComponent } from 'src/app/pages/upjava/upjava.component';
import { UPWEBComponent } from 'src/app/pages/upweb/upweb.component';
import { UPASIComponent } from 'src/app/pages/upasi/upasi.component';
import { AffectationComponent } from 'src/app/pages/affectation/affectation.component';
import { AffectationTableauCHComponent } from 'src/app/pages/affectation-tableau-ch/affectation-tableau-ch.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'departement',    component: DepartementComponent },
    { path: 'classe',    component: ClasseComponent },
    { path: 'informatique',    component: InformatiqueComponent },
    { path: 'mecanique',    component: MecaniqueComponent },
    { path: 'mecatronique',    component: MecatroniqueComponent },
    { path: 'telecommunication',    component: TelecommunicationComponent },
    { path: 'up',    component: UpComponent },
    { path: 'module',    component: ModuleComponent },
    { path: 'showclasses',    component: ShowclassesComponent },
    { path: 'Développement Front end',    component: DeveloppementfrontendComponent },
    { path: 'Développement Back end',    component: DeveloppementbackendComponent},
    { path: 'Développement web et mobile',    component: DeveloppementwebetmobileComponent},
    { path: 'Competence',    component: CompetenceComponent},
    { path: 'Enseignant',    component: EnseignantComponent},
    { path: 'UP JAVA',    component:UPJAVAComponent },
    { path: 'UP WEB',    component: UPWEBComponent},
    { path: 'UP ASI',    component: UPASIComponent},
    { path: 'affectation',    component: AffectationComponent},
    { path: 'affectationTH',    component: AffectationTableauCHComponent}








];
