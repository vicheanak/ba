import { SpPage } from './app.po';

describe('sp App', function() {
  let page: SpPage;

  beforeEach(() => {
    page = new SpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
