class CheckObject {
  IsPromise(obj){
    return Promise.resolve(obj) == obj;
  }
}

export default new CheckObject();
