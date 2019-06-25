import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message/message.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { MessageCategoryService } from 'src/app/services/message/message-category/message-category.service';
import { UserService } from 'src/app/services/user/user.service';
import { FlashService } from 'src/app/services/flash/flash.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  /**
   * @description pagination set default to 1
   */
  page = 1;

  /**
   * @description items per page
   */
  pageSize = 15;

  /**
   * @description flash message
   */
  flash: any = this.flashService.getFlashes();

  /**
   * @description all messages.
   */
  messages: Message[] = [];

  /**
   * @description available messages.
   */
  availableMessages: Message[] = [];

  /**
   * @description unavailable messages.
   */
  unavailableMessages: Message[] = [];

  /**
   * @description archived messages.
   */
  archivedMessages: Message[] = [];

  /**
   * @description all categories in database.
   */
  categories: Category[];

  /**
   * @description data that will be sent to the line chart component.
   */
  lineData: any = [];

  /**
   * @description data that will be sent to the pie chart component.
   */
  pieData: any = [];

  /**
   * @description collapse messages table div
   */
  isCollapsed = false;

  constructor(
    public messageService: MessageService,
    public categoryService: CategoryService,
    public messageCategoryService: MessageCategoryService,
    public userService: UserService,
    public flashService: FlashService
  ) {}

  ngOnInit() {
    this.getAllMessages();
    this.getCategories();
  }

  /**
   * @description get all messages and process the them.
   */
  getAllMessages = (): void => {
    this.messageService.getAllMessages({}).subscribe((messages) => {
      messages.forEach((message) => {
        this.userService.getUserById(message.creatorId).subscribe((user) => {
          message.creatorId = user.email;
        });
      });
      this.messages = this.sortDateDesc(messages);
      this.availableMessages = this.getAvailableMessages();
      this.unavailableMessages = this.getUnavailableMessages();
      this.archivedMessages = this.getArchivedMessages();
      this.processDataMonthly();
    });
  }

  /**
   * @description function to get available messages but not archived.
   */
  getAvailableMessages = (): Message[] => {
    const items = [];
    this.messages.forEach((message) => {
      if (message.available && !message.archive) {
        items.push(message);
      }
    });
    return items;
  }

  /**
   * @description function to get unavailable messages but not archived.
   */
  getUnavailableMessages = (): Message[] => {
    const items = [];
    this.messages.forEach((message) => {
      if (!message.available && !message.archive) {
        items.push(message);
      }
    });
    return items;
  }

  /**
   * @description function to get archived messages
   */
  getArchivedMessages = (): Message[] => {
    const items = [];
    this.messages.forEach((message) => {
      if (message.archive) {
        items.push(message);
      }
    });
    return items;
  }

  getCategories = (): void => {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      this.processDataCategory();
    });
  }

  /**
   * @description download all messages
   */
  download = (): void => {
    this.messageService.downloadMessages();
  }

  /**
   * ================================
   *    DATA FOR COMPONENT INPUT
   * ================================
   */

  /**
   * @description object that is sent to admin-number-box component
   */
  dataTotalBox = (): object => {
    return {
      heading: 'Total messages',
      type: 1,
      value: this.messages.length,
      maxValue: this.messages.length,
    };
  }

  /**
   * @description object that is sent to admin-number-box component
   */
  dataAvailableBox = (): object => {
    return {
      heading: 'Available',
      type: 2,
      value: this.availableMessages.length,
      maxValue: this.messages.length,
    };
  }

  /**
   * @description object that is sent to admin-number-box component
   */
  dataUnavailableBox = (): object => {
    return {
      heading: 'Unavailable',
      type: 3,
      value: this.unavailableMessages.length,
      maxValue: this.messages.length,
    };
  }

  /**
   * @description object that is sent to admin-number-box component
   */
  dataArchivedBox = (): object => {
    return {
      heading: 'Archived',
      type: 4,
      value: this.archivedMessages.length,
      maxValue: this.messages.length,
    };
  }

  /**
   * @description Process the data to pass to line-chart component.
   * Format: { label: 'label, y; value}
   */
  processDataMonthly = (): any => {
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    for (let monthNum = 0; monthNum <= 11; monthNum++) {
      let totalNum = 0;
      this.messages.forEach((message) => {
        if (new Date(message.created_at).getMonth() === monthNum) {
          totalNum++;
        }
      });
      this.lineData.push({ label: months[monthNum], y: totalNum });
    }
  }

  /**
   * @description Process the data to pass to pie-chart component.
   * Format: { label: 'label, y; value}
   */
  processDataCategory = (): void => {
    this.categories.forEach((category) => {
      this.messageCategoryService.getAllMessageCategories({ categoryId: category._id }).subscribe((results) => {
        this.pieData.push({ label: category.name, y: results.length });
      });
    });
  }

  /**
   * @description sort messages based on the newest date first
   */
  sortDateDesc = (array: Message[]): Message[] => {
    return array.sort((a, b) => {
      if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1;
      } else if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
