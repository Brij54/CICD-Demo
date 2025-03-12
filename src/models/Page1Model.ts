class Page1Model {
  #remoteData;

  constructor(remoteData: any) {
    this.#remoteData = remoteData;
  }

  duration() {
    return this.#remoteData.duration;
  }

  setDuration(value: any) {
    this.#remoteData.duration = value;
  }

  airline() {
    return this.#remoteData.airline;
  }

  setAirline(value: any) {
    this.#remoteData.airline = value;
  }

  time() {
    return this.#remoteData.time;
  }

  setTime(value: any) {
    this.#remoteData.time = value;
  }

  stoppage() {
    return this.#remoteData.stoppage;
  }

  setStoppage(value: any) {
    this.#remoteData.stoppage = value;
  }

  cost() {
    return this.#remoteData.cost;
  }

  setCost(value: any) {
    this.#remoteData.cost = value;
  }

}

export default Page1Model;
