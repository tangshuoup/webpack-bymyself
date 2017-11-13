let express =require('express');
let app = express();
let router =express.Router();
var port =5000;
router.get('',function(req,res,next){
	req.url='/index.html';
	next();
})
app.use(router);
app.use(express.static('./dist'));
module.exports = app.listen(port, function(err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port +'\n')
});
