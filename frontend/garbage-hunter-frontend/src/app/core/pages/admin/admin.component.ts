import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  /**
   * @description all messages.
   * @type {Message[]}
   * @memberof AdminComponent
   */
  messages: Message[] = [];
  
  /**
   * @description available messages.
   * @type {Message[]}
   * @memberof AdminComponent
   */
  availableMessages: Message[] = [];

  /**
   * @description unavailble messages.
   * @type {Message[]}
   * @memberof AdminComponent
   */
  unavailableMessages: Message[] = [];

  /**
   * @description archived messages.
   * @type {Message[]}
   * @memberof AdminComponent
   */
  archivedMessages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.getAllMessages();
  }

  /**
   * @description get all messages and process the them.
   * @memberof AdminComponent
   */
  getAllMessages = (): void => {
    this.messageService.getAllMessages({}).subscribe((messages) => {
      this.messages = messages;
      this.availableMessages = this.getAvailableMessages();
      this.unavailableMessages = this.getUnavailableMessages();
      this.archivedMessages = this.getArchivedMessages();
    });
  };

  /**
   * @description function to get available messages but not archived.
   * @memberof AdminComponent
   */
  getAvailableMessages = (): Message[] => {
    let items = [];
    this.messages.forEach((message) => {
      if (message.available && !message.archive) {
        items.push(message);
      }
    });
    return items;
  };

  /**
   * @description funtion to get unavailable messages but not archived.
   * @memberof AdminComponent
   */
  getUnavailableMessages = (): Message[] => {
    let items = [];
    this.messages.forEach((message) => {
      if (!message.available && !message.archive) {
        items.push(message);
      }
    });
    return items;
  };

  /**
   * @description function to get archived messages
   * @memberof AdminComponent
   */
  getArchivedMessages = (): Message[] => {
    let items = [];
    this.messages.forEach((message) => {
      if (message.archive) {
        items.push(message);
      }
    });
    return items;
  };

  /**
   * @description download all messages
   * @memberof AdminComponent
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
   * @memberof AdminComponent
   */
  dataTotalBox = (): object => {
    return {
      heading: 'Total',
      type: 1,
      value: this.messages.length,
      maxValue: this.messages.length,
    };
  };

  /**
   * @description object that is sent to admin-number-box component
   * @memberof AdminComponent
   */
  dataAvailableBox = (): object => {
    return {
      heading: 'Available',
      type: 2,
      value: this.availableMessages.length,
      maxValue: this.messages.length,
    };
  };

  /**
   * @description object that is sent to admin-number-box component
   * @memberof AdminComponent
   */
  dataUnavailableBox = (): object => {
    return {
      heading: 'Unavailable',
      type: 3,
      value: this.unavailableMessages.length,
      maxValue: this.messages.length,
    };
  };

  /**
   * @description object that is sent to admin-number-box component
   * @memberof AdminComponent
   */
  dataArchivedBox = (): object => {
    return {
      heading: 'Archived',
      type: 4,
      value: this.archivedMessages.length,
      maxValue: this.messages.length,
    };
  };

  /**
   * @description object that is sent to chart-line component
   * @memberof AdminComponent
   */
  dataMonthly = (): any => {
    return this.dummyMonthlyStats;
  };

  /**
   * @description object that is sent to chart-pie component
   * @memberof AdminComponent
   */
  dataCategory = (): any => {
    return this.dummyCategoryStats;
  };

  /** DUMMIES */
  dummyMonthlyStats = [
    {
      name: 'Number of create messages',
      series: [
        {
          name: 'January',
          value: 13,
        },
        {
          name: 'February',
          value: 2,
        },
        {
          name: 'March',
          value: 15,
        },
        {
          name: 'April',
          value: 8,
        },
        {
          name: 'May',
          value: 7,
        },
        {
          name: 'June',
          value: 11,
        },
        {
          name: 'July',
          value: 6,
        },
        {
          name: 'August',
          value: 2,
        },
        {
          name: 'September',
          value: 4,
        },
        {
          name: 'October',
          value: 14,
        },
        {
          name: 'November',
          value: 10,
        },
        {
          name: 'December',
          value: 1,
        },
      ],
    },
  ];
  dummyCategoryStats = [
    {
      name: 'Furniture',
      value: 12,
    },
    {
      name: 'Table',
      value: 3,
    },
    {
      name: 'Chair',
      value: 10,
    },
    {
      name: 'Electronic',
      value: 5,
    },
    {
      name: 'Bed',
      value: 7,
    },
  ]
}
