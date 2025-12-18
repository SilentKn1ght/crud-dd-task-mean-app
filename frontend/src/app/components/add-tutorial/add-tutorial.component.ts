import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  standalone: false,
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;
  saving = false;

  constructor(private tutorialService: TutorialService) { }

  saveTutorial(): void {
    if (!this.tutorial.title?.trim() || !this.tutorial.description?.trim()) {
      return;
    }
    const data = {
      title: this.tutorial.title.trim(),
      description: this.tutorial.description.trim()
    };

    this.saving = true;
    this.tutorialService.create(data)
      .subscribe({
        next: () => {
          this.submitted = true;
          this.saving = false;
        },
        error: (e) => {
          console.error(e);
          this.saving = false;
        }
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}