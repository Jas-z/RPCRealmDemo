exports = async function() {
  const request = context.services.get('mongodb-atlas').db('sample_mflix').collection("movies");

  const pipeline = [
  {
    "$match": {
      "imdb.rating": { "$gte": 7 },
      "genres": { "$nin": [ "Crime", "Horror" ] } ,
      "rated": { "$in": ["PG", "G" ] },
      "languages": { "$all": [ "English", "Japanese" ] }
    }
  }];

  return await request.aggregate(pipeline).toArray()
  .then(data => {
    console.log(data.length);
    return data;
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
};