// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-shopping-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './shoping-list.component.html',
//   styleUrls: ['./shoping-list.component.css']
// })
// export class ShoppingListComponent {
//   @Input() list: { [key: string]: number } = {}; // מקבל את האובייקט מהשרת
//   @Output() close = new EventEmitter<void>();

//   // פונקציה להדפסה
//   printList() {
//     window.print();
//   }

//   // פונקציה לשיתוף בוואטסאפ
//   // shareToWhatsApp() {
//   //   let text = "🛒 *רשימת הקניות שלי:* \n\n";
//   //   for (const [item, amount] of Object.entries(this.list)) {
//   //     text += `• ${item}: ${amount}\n`;
//   //   }
    
//   //   const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
//   //   window.open(url, '_blank');
//   // }
// }

// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ShoppingListData } from '../../recipe.model'; // ייבוא הממשק

// @Component({
//   selector: 'app-shopping-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './shoping-list.component.html',
//   styleUrls: ['./shoping-list.component.css']
// })
// export class ShoppingListComponent {
//   @Input() list: ShoppingListData = {}; // שימוש בממשק החדש
//   @Output() close = new EventEmitter<void>();

//   printList(): void {
//     window.print();
//   }

//   shareToWhatsApp(): void {
//     if (Object.keys(this.list).length === 0) return;

//     let text = "🛒 *רשימת הקניות שלי מאתר המתכונים:* \n\n";
    
//     // מעבר על המילון ובניית הודעה מעוצבת
//     for (const [item, amount] of Object.entries(this.list)) {
//       text += `✅ *${item}*: ${amount}\n`;
//     }
    
//     text += "\n בתאבון! 👩‍🍳";
    
//     const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
//     window.open(url, '_blank');
//   }
// }
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShoppingListComponent {
  @Input() list: Record<string, string> = {}; // מקבל אובייקט מהשרת
  @Output() close = new EventEmitter<void>();

  printList() {
    window.print();
  }
}