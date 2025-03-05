class CustomError extends Error {
    data: Record<string, any>; // Тип данных можно уточнить при необходимости
  
    constructor(data: { message: string }) {
      super(data.message);
      this.data = data;
  
      // Нужно, чтобы унаследованный класс корректно работал
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export default CustomError;
  