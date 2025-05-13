import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div class="container mx-auto px-4 py-3">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h1 class="text-2xl font-bold">Feedback App</h1>
            </div>
            
            <nav class="w-full md:w-auto">
              <ul class="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-2">
                <li>
                  <a routerLink="/" class="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200" routerLinkActive="bg-white/20" [routerLinkActiveOptions]="{exact: true}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <a routerLink="/feedback" class="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200" routerLinkActive="bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Feedback
                  </a>
                </li>
                <li>
                  <a routerLink="/about" class="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200" routerLinkActive="bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About
                  </a>
                </li>
                <li *ngIf="!isLoggedIn">
                  <a routerLink="/login" class="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200" routerLinkActive="bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </a>
                </li>
                <li *ngIf="!isLoggedIn">
                  <a routerLink="/register" class="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200" routerLinkActive="bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register
                  </a>
                </li>
                <li *ngIf="isLoggedIn">
                  <button (click)="logout()" class="flex items-center px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <p>© 2023 Simple Feedback App. All rights reserved.</p>
            </div>
            <div class="flex space-x-4">
              <a href="#" class="hover:text-blue-300 transition-colors duration-200">Privacy Policy</a>
              <a href="#" class="hover:text-blue-300 transition-colors duration-200">Terms of Service</a>
              <a href="#" class="hover:text-blue-300 transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
    
    // Check if token exists in localStorage
    const token = this.authService.getToken();
    if (token) {
      this.isLoggedIn = true;
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}