import { Content } from './content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('Should create a Notification', () => {
    const notification = new Notification({
      content: new Content('Nova mensagem'),
      category: 'Chat',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
