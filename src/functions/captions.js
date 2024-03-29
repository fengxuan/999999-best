var getSubtitles = require('youtube-captions-scraper').getSubtitles

exports.handler = async function(event, context, callback) {
  try {
    const videoID = event.queryStringParameters.v || null
    if(!videoID) {
      throw 'Video ID is required'
      return
    }
    const lang = event.queryStringParameters.l || 'en'
    const captions = await getSubtitles({
      videoID,
      lang
    })
    if(!captions) {
      throw 'No captions found'
      return
    }

    var subtitls = []

    captions.forEach(function(caption){
      subtitls.push(caption.text)
    })

    console.log("captions: "+ JSON.stringify(captions));

    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: subtitls.join('\n') //JSON.stringify(subtitls)
    })
  } catch(e) {
    callback(e)
  }
}
