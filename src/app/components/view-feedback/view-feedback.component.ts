import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ViewFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.http.get<Feedback[]>(`${environment.apiUrl}/api/feedback`)
      .subscribe({
        next: (data) => {
          this.feedbacks = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load feedback data. Please try again later.';
          this.loading = false;
          console.error('Error fetching feedback:', err);
        }
      });
  }
}