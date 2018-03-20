import {Component, AfterViewInit, Renderer, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {ToastyConfig} from 'ng2-toasty';

enum MenuOrientation {
   STATIC,
   OVERLAY
}

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

   activeTabIndex: number;
   sidebarActive: boolean;
   layoutMode: MenuOrientation = MenuOrientation.STATIC;
   darkMenu = false;
   topbarMenuActive: boolean;
   sidebarClick: boolean;
   topbarItemClick: boolean;
   activeTopbarItem: any;
   documentClickListener: Function;

   private subscription: Subscription;

   constructor(public renderer: Renderer,
               private toastyConfig: ToastyConfig,
               private translate: TranslateService,
               private activatedRoute: ActivatedRoute) {

      this.translate.addLangs(['pt-BR', 'en']);
      this.translate.setDefaultLang('en');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|pt-BR/) ? browserLang : 'pt-BR');

      this.toastyConfig.theme = 'bootstrap';
   }

   ngOnInit() {
      // subscribe to router event
      this.subscription = this.activatedRoute.queryParams.subscribe(
         (param: any) => {
            const locale = param['locale'];
            if (locale !== undefined) {
               this.translate.use(locale);
            }
         });
   }

   changeLanguage(lang) {
      this.translate.use(lang);
   }

   ngAfterViewInit() {
      this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
         if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
         }

         if (!this.sidebarClick && (this.overlay || !this.isDesktop())) {
            this.sidebarActive = false;
         }

         this.topbarItemClick = false;
         this.sidebarClick = false;
      });
   }

   onTabClick(event, index: number) {
      if (this.activeTabIndex === index) {
         this.sidebarActive = !this.sidebarActive;
      } else {
         this.activeTabIndex = index;
         this.sidebarActive = true;
      }

      event.preventDefault();
   }

   closeSidebar(event) {
      this.sidebarActive = false;
      event.preventDefault();
   }

   onSidebarClick(event) {
      this.sidebarClick = true;
   }

   onTopbarMenuButtonClick(event) {
      this.topbarItemClick = true;
      this.topbarMenuActive = !this.topbarMenuActive;

      event.preventDefault();
   }

   onTopbarItemClick(event, item) {
      this.topbarItemClick = true;

      if (this.activeTopbarItem === item) {
         this.activeTopbarItem = null;
      } else {
         this.activeTopbarItem = item;
      }

      event.preventDefault();
   }

   get overlay(): boolean {
      return this.layoutMode === MenuOrientation.OVERLAY;
   }

   changeToStaticMenu() {
      this.layoutMode = MenuOrientation.STATIC;
   }

   changeToOverlayMenu() {
      this.layoutMode = MenuOrientation.OVERLAY;
   }

   isDesktop() {
      return window.innerWidth > 1024;
   }

   ngOnDestroy() {
      if (this.documentClickListener) {
         this.documentClickListener();
      }

      // prevent memory leak by unsubcribing
      this.subscription.unsubscribe();
   }

}
