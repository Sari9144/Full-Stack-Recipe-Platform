// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-button',
//   standalone: true,
//   imports: [],
//   templateUrl: './buton-basic.component.html', 
//   styleUrl: './buton-basic.component.css'
// })
// export class AppButtonComponent {
//   @Input() text: string = '';       // הטקסט שיופיע על הכפתור
//   @Input() variant: string = 'primary'; // עיצוב הכפתור (primary, success, admin)
  
//   @Output() btnClick = new EventEmitter<void>();

//   handleClick() {
//     this.btnClick.emit();
//   }
// }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @description קומפוננטת כפתור גנרית מעוצבת (Reusable Button)
 * תומכת בוריאציות שונות של עיצוב, מצבי טעינה וחסימה.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buton-basic.component.html',
  styleUrl: './buton-basic.component.css'
})
export class AppButtonComponent {
  /** הטקסט שיופיע על הכפתור */
  @Input() text: string = '';

  /** * סגנון הכפתור. 
   * ערכים אפשריים: 'primary' | 'success' | 'admin' | 'outline' | 'danger'
   */
  @Input() variant: 'primary' | 'success' | 'admin' | 'outline' | 'danger' = 'primary';

  /** האם הכפתור חסום ללחיצה */
  @Input() disabled: boolean = false;

  /** האם הכפתור במצב טעינה (מציג אנימציה) */
  @Input() isLoading: boolean = false;

  /** סוג הכפתור (button, submit, reset) */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** אירוע לחיצה */
  @Output() btnClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled && !this.isLoading) {
      this.btnClick.emit();
    }
  }
}