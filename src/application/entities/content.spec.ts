import { Content } from './content';

describe('Notification Content', () => {
  it('Should be able to create notification content', () => {
    const content = new Content('Voce recebeu uma nova mensagem');

    expect(content).toBeTruthy();
  });

  it('Should throw error for content with less than 5 characters', () => {
    expect(() => new Content('Voc')).toThrow();
  });

  it('Should throw error for content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(245))).toThrow();
  });
});
