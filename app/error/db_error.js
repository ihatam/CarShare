class DbError {
    constructor(err,crash) {
      this.err = err;
      this.crash =crash;
    }
    message(){
        return `erreur on line ${this.crash}
         erreur.message : ${this.err.message}`;
    }
    formatError(){
       return {message:`An error occured: ${this.message()}`,err:this.err}
    }
}
module.exports = DbError;