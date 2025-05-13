import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeedbackService, Feedback } from '../services/feedback.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  feedbackList: Feedback[] = [];
  loading = true;
  error = '';
  averageRating = 0;
  totalFeedback = 0;
  
  // Product stats
  productStats: {[key: string]: {count: number, avgRating: number}} = {};

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbackList = data;
        this.totalFeedback = data.length;
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load feedback data. Please try again later.';
        this.loading = false;
        console.error('Error loading feedback:', err);
      }
    });
  }

  calculateStats(): void {
    if (this.feedbackList.length === 0) return;
    
    // Calculate average rating
    const totalRating = this.feedbackList.reduce((sum, item) => sum + item.rating, 0);
    this.averageRating = totalRating / this.feedbackList.length;
    
    // Calculate per-product stats
    this.feedbackList.forEach(feedback => {
      if (!this.productStats[feedback.productName]) {
        this.productStats[feedback.productName] = {
          count: 0,
          avgRating: 0
        };
      }
      
      this.productStats[feedback.productName].count++;
      
      // Recalculate average for this product
      const productFeedback = this.feedbackList.filter(f => f.productName === feedback.productName);
      const productTotalRating = productFeedback.reduce((sum, item) => sum + item.rating, 0);
      this.productStats[feedback.productName].avgRating = productTotalRating / productFeedback.length;
    });
  }
}