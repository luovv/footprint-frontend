import { FootprintPage } from './app.po';

describe('footprint App', function() {
  let page: FootprintPage;

  beforeEach(() => {
    page = new FootprintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
