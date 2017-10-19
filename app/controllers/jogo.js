module.exports.jogo = function(application, req, res) {
	if(!req.session.autorizado) {
		application.app.controllers.index.index(application, req, res);

		return;	
	} 

	var msg = '';

	if(req.query.msg !== '') {
		msg = req.query.msg;
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg);
}

module.exports.sair = function(application, req, res) {
	req.session.destroy(function(err){
		application.app.controllers.index.index(application, req, res);
	});
}

module.exports.suditos = function(application, req, res) {
	if(!req.session.autorizado) {
		application.app.controllers.index.index(application, req, res);

		return;	
	} 

	res.render('aldeoes', {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res) {
	if(!req.session.autorizado) {
		application.app.controllers.index.index(application, req, res);

		return;	
	} 

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.getAcoes(req.session.usuario, res);
}

module.exports.ordenar_acoes_sudito = function(application, req, res) {
	var dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada.').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada.').notEmpty();

	var erros = req.validationErrors();

	if(erros) {
		res.redirect('jogo?msg=erro');
		return;
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario;
	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=sucesso');
}

module.exports.revogar_acao = function(application, req, res) {
	var url_query = req.query;

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.revogarAcao(url_query.id, res);
}

