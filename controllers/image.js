const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "d5bbf78e26ba4d5aa31ef47968bd51e9",
});

const handleApiCall = (req,res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable wo work with API'))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      console.log(entries[0]);
      res.json(entries[0]);
    })
}

module.exports = {
  handleImage,
  handleApiCall
}
