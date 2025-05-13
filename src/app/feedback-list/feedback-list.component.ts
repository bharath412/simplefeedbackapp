import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  feedbackList: Feedback[] = [];
  loading = true;
  error = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFeedback();
  }

  fetchFeedback(): void {
    this.http.get<Feedback[]>('/api/feedback')
      .subscribe({
        next: (data) => {
          this.feedbackList = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching feedback:', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}