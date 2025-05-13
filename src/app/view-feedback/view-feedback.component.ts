import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeedbackService, Feedback } from '../services/feedback.service';

@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss']
})
export class ViewFeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  filteredFeedback: Feedback[] = [];
  loading = true;
  error = '';
  
  // Filtering options
  selectedProduct: string = '';
  minRating: number = 0;
  
  // Derived data
  uniqueProducts: string[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbackList = data;
        this.filteredFeedback = [...data];
        this.extractUniqueProducts();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load feedback data. Please try again later.';
        this.loading = false;
        console.error('Error loading feedback:', err);
      }
    });
  }

  extractUniqueProducts(): void {
    const productSet = new Set<string>();
    this.feedbackList.forEach(feedback => {
      if (feedback.productName) {
        productSet.add(feedback.productName);
      }
    });
    this.uniqueProducts = Array.from(productSet);
  }

  applyFilters(): void {
    this.filteredFeedback = this.feedbackList.filter(feedback => {
      // Filter by product if selected
      if (this.selectedProduct && feedback.productName !== this.selectedProduct) {
        return false;
      }
      
      // Filter by minimum rating
      if (feedback.rating < this.minRating) {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.selectedProduct = '';
    this.minRating = 0;
    this.filteredFeedback = [...this.feedbackList];
  }
  
  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}