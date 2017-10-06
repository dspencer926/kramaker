const kramerTeeth = require('../kramerPics/kramerTeeth.png');
const kramerEars = require('../kramerPics/kramerEars.png');
const kramerHair = require('../kramerPics/kramerHair.png');
const kramerTongue = require('../kramerPics/kramerTongue.png');
const kramerTongue2 = require('../kramerPics/kramerTongue2.png');
const kramerRound = require('../kramerPics/kramerRound.png');
const width = 300;
const height = 300;
// import rotateImage from '../loop.png';

const kramerTeethImg = new Image(width, height);
kramerTeethImg.src = kramerTeeth;

const kramerEarsImg = new Image(width, height);
kramerEarsImg.src = kramerEars;

const kramerHairImg = new Image(width, height);
kramerHairImg.src = kramerHair;

const kramerTongueImg = new Image(width, height);
kramerTongueImg.src = kramerTongue;

const kramerTongueImg2 = new Image(width, height);
kramerTongueImg2.src = kramerTongue2;

const kramerRoundImg = new Image(width, height);
kramerRoundImg.src = kramerRound;

export default [kramerTeethImg, kramerEarsImg, kramerHairImg, kramerTongueImg, kramerTongueImg2, kramerRoundImg];