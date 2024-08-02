class HashMap {
   constructor(bucketSize = 16, loadFactor = 0.75) {
      this.bucketSize = bucketSize;
      this.loadFactor = loadFactor;
      this.buckets = [];
      for (let i = 0; i < this.bucketSize; i++) {
         this.buckets[i] = [];
      }
      this.size = 0;
   }

   hash(key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
         hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }

      return hashCode % this.bucketSize;
   }

   checkBucketCollision() {
      if (this.size / this.bucketSize > this.loadFactor) {
         const oldBuckets = this.buckets;
         this.bucketSize *= 2;
         this.buckets = [];
         for (let i = 0; i < this.bucketSize; i++) {
            this.buckets[i] = [];
         }
         this.size = 0;
         oldBuckets.forEach((bucket) => {
            bucket.forEach((item) => {
               this.set(item.key, item.value);
            });
         });
      }
   }

   set(key, value) {
      let index = this.hash(key);
      if (index < 0 || index >= this.buckets.length) {
         throw new Error("Trying to access index out of bound");
      }
      let bucket = this.buckets[index];

      // Check if bucket already has that key and update value
      for (let i = 0; i < bucket.length; i++) {
         if (bucket[i].key === key) {
            bucket[i].value = value;
            return;
         }
      }

      // If bucket doesn't have key then push key value pair to bucket
      bucket.push({ key, value });

      this.size++;
      this.checkBucketCollision();
   }

   get(key) {
      let index = this.hash(key);
      if (index < 0 || index >= this.buckets.length) {
         throw new Error("Trying to access index out of bound");
      }
      let bucket = this.buckets[index];

      for (let i = 0; i < bucket.length; i++) {
         if (bucket[i].key === key) {
            return bucket[i].value;
         }
      }

      return null;
   }

   has(key) {
      let index = this.hash(key);
      if (index < 0 || index >= this.buckets.length) {
         throw new Error("Trying to access index out of bound");
      }
      let bucket = this.buckets[index];

      for (let i = 0; i < bucket.length; i++) {
         if (bucket[i].key === key) {
            return true;
         }
      }

      return false;
   }

   remove(key) {
      let index = this.hash(key);
      if (index < 0 || index >= this.buckets.length) {
         throw new Error("Trying to access index out of bound");
      }
      let bucket = this.buckets[index];

      for (let i = 0; i < bucket.length; i++) {
         if (bucket[i].key === key) {
            bucket[i] = {};
            this.size -= 1;
            return true;
         }
      }
      return false;
   }

   length() {
      return this.size;
   }

   clear() {
      this.bucketSize = 16;
      this.buckets = [];
      for (let i = 0; i < this.bucketSize; i++) {
         this.buckets[i] = [];
      }
      this.size = 0;
   }

   keys() {
      let keysArray = [];
      this.buckets.forEach(bucket => {
         bucket.forEach(item => {
            keysArray.push(item.key);
         });
      });
      return keysArray;
   }
   
   values() {
      let valuesArray = [];
      this.buckets.forEach(bucket => {
         bucket.forEach(item => {
            valuesArray.push(item.value);
         });
      });
      return valuesArray;
   }

   entries() {
      let entriesArray = [];
      this.buckets.forEach(bucket => {
         bucket.forEach(item => {
            entriesArray.push([item.key, item.value]);
         });
      });
      return entriesArray;
   }
}

export default HashMap;