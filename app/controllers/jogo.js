module.exports.jogo = function(application, req, res) {
	if(req.session.autorizado) {
		res.render('jogo');
	} else {
		application.app.controllers.index.index(application, req, res);
	}
}

module.exports.sair = function(application, req, res) {
	req.session.destroy(function(err){
		application.app.controllers.index.index(application, req, res);
	});
}