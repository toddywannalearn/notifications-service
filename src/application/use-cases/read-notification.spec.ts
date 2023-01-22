import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

describe('Read notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should not be able to read a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    //promises ou são resolvidas com sucesso ou rejeitadas, por isso o .reject
    expect(async () => {
      await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
