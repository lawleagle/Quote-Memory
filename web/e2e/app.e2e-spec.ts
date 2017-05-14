import { QuoteMemoryPage } from './app.po';

describe('quote-memory App', () => {
  let page: QuoteMemoryPage;

  beforeEach(() => {
    page = new QuoteMemoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
