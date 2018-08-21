import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { UnivCommonModule } from '../common/univ-common.module';
import { EnsureUserAuthGuard } from '../common/guards/auth.guards';
import { UserResolve } from '../common/resolvers/user.resolve';
import { HeaderComponent } from '../pages/header/header.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { AppPage } from '../pages/app.page.';
import { LoginPage } from './login/login.page';

const appRouter: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: 'app', component: AppPage, canActivate: [EnsureUserAuthGuard], resolve: { user: UserResolve },
    children: [
      { path: 'home', component: HomePage },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppPage,
    LoginPage,
    HomePage,
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    RouterModule.forRoot(appRouter, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: true
    }),
    UnivCommonModule
  ],
  exports: [
    RouterModule,
    HeaderComponent,
  ],
})
export class AppRoutingModule { }
