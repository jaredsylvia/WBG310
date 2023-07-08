class FormData {
    constructor(db) {
      this.db = db;
      this.insert = this.insert.bind(this); // Bind the insert method to the class instance
    }
  
    getAll() {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM formData';
        this.db.all(query, (err, rows) => {
          if (err) {
            console.error('Error retrieving entries from the database:', err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  
    getById(id) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM formData WHERE id = ?';
        this.db.get(query, [id], (err, row) => {
          if (err) {
            console.error('Error retrieving entry from the database:', err);
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    }
  
    insert(data) {
        return new Promise((resolve, reject) => {
          const { firstName, lastName, email, phone, newsletter, message, interests } = data;
    
          const insertQuery = 'INSERT INTO formData (firstName, lastName, email, phone, newsletter, message) VALUES (?, ?, ?, ?, ?, ?)';
          const insertValues = [firstName, lastName, email, phone, newsletter, message];
    
          this.db.run(insertQuery, insertValues, function (err) {
            if (err) {
              console.error('Error inserting entry into the database:', err);
              reject(err);
            } else {
              const messageId = this.lastID;
    
              if (interests && interests.length > 0) {
                const insertInterestsQuery = 'INSERT INTO message_interests (message_id, interest_id) VALUES (?, ?)';
                const insertInterestsPromises = interests.map(interestId => {
                  const insertInterestsValues = [messageId, interestId];
                  return new Promise((resolve, reject) => {
                    this.db.run(insertInterestsQuery, insertInterestsValues, (err) => {
                      if (err) {
                        console.error('Error inserting interests into the database:', err);
                        reject(err);
                      } else {
                        resolve();
                      }
                    });
                  });
                });
    
                Promise.all(insertInterestsPromises)
                  .then(() => {
                    resolve(messageId);
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else {
                resolve(messageId);
              }
            }
          }.bind(this)); // Bind the context of the callback function to ensure 'this' refers to the db object
        });
      }
    
    
      
      
  
    getInterests(messageId) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT interests.id, interests.name FROM interests INNER JOIN message_interests ON interests.id = message_interests.interest_id WHERE message_interests.message_id = ?';
        this.db.all(query, [messageId], (err, rows) => {
          if (err) {
            console.error('Error retrieving interests from the database:', err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  }
  
  module.exports = FormData;
  