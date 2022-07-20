export class TicketsDB {
  private static SEARCH_URL: string = 'https://aviasales-test-api.kata.academy/search';
  private static TICKETS_URL: string = 'https://aviasales-test-api.kata.academy/tickets';

  static async getSearchId(): Promise<() => string> {
    const request = await fetch(this.SEARCH_URL);
    const { searchId } = await request.json();
    if (!searchId) {
      throw new Error('searchId can not be null');
    }
    return searchId;
  }

  static async getTickets(): Promise<any> {
    let request = await fetch(`${this.TICKETS_URL}?searchId=${await this.getSearchId()}`);
    return request.json();
  }
}
