import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  standalone: false,
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  loading = false;
  error: string | null = null;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.loading = true;
    this.error = null;
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
          this.error = 'Failed to load tutorials.';
          this.loading = false;
        }
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    if (!confirm('Delete all tutorials? This cannot be undone.')) return;
    this.tutorialService.deleteAll()
      .subscribe({
        next: () => {
          this.refreshList();
        },
        error: (e) => {
          console.error(e);
          this.error = 'Failed to remove tutorials.';
        }
      });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;
    this.loading = true;
    this.error = null;
    this.tutorialService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
          this.error = 'Search failed.';
          this.loading = false;
        }
      });
  }

}