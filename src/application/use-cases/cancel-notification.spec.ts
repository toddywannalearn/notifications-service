import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    //promises ou são resolvidas com sucesso ou rejeitadas, por isso o .reject
    expect(async () => {
      await cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
