import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {
  feedback = {
    productName: '',
    rating: 0,
    comments: '',
    userEmail: '',
    userName: ''
  };

  submitted = false;
  error = '';
  
  constructor(private http: HttpClient) {}

  submitFeedback() {
    this.http.post(`${environment.apiUrl}/feedback`, this.feedback)
      .subscribe({
        next: () => {
          this.submitted = true;
          this.error = '';
        },
        error: (err) => {
          this.error = 'Failed to submit feedback. Please try again.';
          console.error('Error submitting feedback:', err);
        }
      });
  }

  resetForm() {
    this.feedback = {
      productName: '',
      rating: 0,
      comments: '',
      userEmail: '',
      userName: ''
    };
    this.submitted = false;
  }
}