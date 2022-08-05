import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/departement', title: 'Departements',  icon: 'fa fa-university', class: '' },
    { path: '/classe', title: 'Niveaux',  icon: 'fa fa-university', class: '' },
    { path: '/up', title: 'Unité Pédagogique',  icon: 'fa fa-university', class: '' },


    { path: '/module', title: 'Modules',  icon: 'fa fa-university', class: '' },
    { path: '/Competence', title: 'Competences',  icon: 'fa fa-university', class: '' },
    { path: '/Enseignant', title: 'Enseignants',  icon: 'fa fa-university', class: '' },
    { path: '/optup', title: 'Autre UP',  icon: 'fa fa-university', class: '' },
    { path: '/affectation', title: 'Affectation des Classes',  icon: 'fa fa-university', class: '' },
    { path: '/affectationTH', title: 'Affectation des Tableaux Horraire',  icon: 'fa fa-university', class: '' },



];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
