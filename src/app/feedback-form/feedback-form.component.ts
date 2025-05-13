import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {
  feedback = {
    name: '',
    email: '',
    message: ''
  };
  
  submitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.feedback.name || !this.feedback.email || !this.feedback.message) {
      this.submitError = true;
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    this.submitting = true;
    this.submitError = false;
    this.submitSuccess = false;

    this.http.post('/api/feedback', this.feedback)
      .subscribe({
        next: () => {
          this.submitting = false;
          this.submitSuccess = true;
          this.feedback = { name: '', email: '', message: '' };
          
          // Redirect to feedback list after successful submission
          setTimeout(() => {
            this.router.navigate(['/feedback-list']);
          }, 2000);
        },
        error: (err) => {
          this.submitting = false;
          this.submitError = true;
          this.errorMessage = 'There was an error submitting your feedback. Please try again.';
          console.error('Error submitting feedback:', err);
        }
      });
  }
}