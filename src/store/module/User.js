class User {
    constructor(name) {
      this.name = name;
      this.token = null;
      this.folders = [];
    }
  
    addFolder(folder) {
      this.folders.push(folder);
    }
  
    removeFolder(folder) {
      const index = this.folders.indexOf(folder);
      if (index > -1) {
        this.folders.splice(index, 1);
      }
    }
  
    getFiles() {
      const files = [];
      for (const folder of this.folders) {
        files.push(...folder.files);
      }
      return files;
    }

    getUserName() {
      return this.name;
    }
  }