import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

@Component({
  selector: 'app-feedback-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})
export class FeedbackDetailComponent implements OnInit {
  feedback: Feedback | null = null;
  loading = true;
  error = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchFeedbackDetail(id);
      }
    });
  }

  fetchFeedbackDetail(id: string): void {
    this.http.get<Feedback>(`/api/feedback/${id}`)
      .subscribe({
        next: (data) => {
          this.feedback = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching feedback details:', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}