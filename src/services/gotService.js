export default class GotService {
  UNKNOWN = 'Неизвестно';

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api/';
  }

  getResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(`Could not fetch: ${url}, status: ${response.status}`);
    }
    return await response.json();
  }

  getAllCharacters = async () => {
    const characters = await this.getResource('characters?page=6&pageSize=10');
    return characters.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllHouses = async () => {
    const houses = await this.getResource('houses');
    return houses.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`houses/${id}`);
    return this._transformHouse(house);
  }

  getAllBooks = async () => {
    const books = await this.getResource('books');
    return books.map(this._transformBook);
  }

  getBook = async (id) => {
    const book = await this.getResource(`books/${id}`);
    return this._transformBook(book);
  }

  isSet = (data) => {
    if (data && data.toString().length > 0) {
      return data;
    }
    return this.UNKNOWN;
  }

  getId(item) {
    const url = item.url.split('/');
    return url[url.length - 1];
  }

  _transformCharacter = (character) => {
    return {
      id: this.getId(character),
      name: this.isSet(character.name),
      gender: this.isSet(character.gender),
      born: this.isSet(character.born),
      died: this.isSet(character.died),
      culture: this.isSet(character.culture)
    };
  }

  _transformHouse = (house) => {
    return {
      id: this.getId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons)
    };
  }

  _transformBook = (book) => {
    return {
      id: this.getId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      releaser: this.isSet(book.releaser)
    }
  }
}
