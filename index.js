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
}