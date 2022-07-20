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
    { path: 'module',    component: ModuleComponent }





];
