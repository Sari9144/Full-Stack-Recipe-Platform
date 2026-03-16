// import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User } from '../../model'; // ודאי שהנתיב נכון (הוספתי models/)
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppButtonComponent } from '../buton-basic/buton-basic.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule,AppButtonComponent],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class UserDetailComponent {
  @Input() userData: User | undefined;
  // @Output() editClicked = new EventEmitter<void>();

  // הפונקציה שנקראת מה-HTML
  // openEditModal(): void {
  //   this.editClicked.emit(); // שולח אות לאבא
  // }
}