class Folder {
    constructor(name, owner) {
      this.name = name;
      this.owner = owner;
      this.documents = [];
    }
  
    addDocument(document) {
      this.documents.push(document);
    }
  
    removeDocument(document) {
      const index = this.documents.indexOf(document);
      if (index > -1) {
        this.documents.splice(index, 1);
      }
    }
  }