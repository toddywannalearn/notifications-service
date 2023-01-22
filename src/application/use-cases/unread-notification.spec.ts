import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('Should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('Should not be able to unread a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    //promises ou são resolvidas com sucesso ou rejeitadas, por isso o .reject
    expect(async () => {
      await unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
