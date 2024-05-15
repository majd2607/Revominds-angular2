import { Routes } from '@angular/router';
import { ClassicComponent } from '../_metronic/layout/components/toolbar/classic/classic.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: 'classifier',
  //   loadChildren: () => import('./classifier/classifier.module').then((m) => m.ClassifierModule),
  // },
  {
    path: 'clustering',
    loadChildren: () => import('./clustering/clustering.module').then((m) => m.ClusteringModule),
  },
  {
    path: 'recommandation',
    loadChildren: () => import('./recommandation/recommandation.module').then((m) => m.RecommandationModule),
  },
  {
    path: 'weatherCondition',
    loadChildren: () => import('./weather-condition/weather-condition.module').then((m) => m.WeatherConditionModule),
  },
  {
    path: 'regressionLin',
    loadChildren: () => import('./regression-lin/regression-lin.module').then((m) => m.RegressionLinModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
