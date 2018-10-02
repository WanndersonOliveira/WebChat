var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var app = express();
var texto = "";

app.get('/', function(req, res){
	var html = '';
	var val = [];

	html+= '<html>';
	html+= '<head>';
	html+= '<meta charset="utf-8">';
	html+= '<title>Programa</title>';
	html+= '</head>';
	html+= '<body>';
	html+= '<form method="post" action="/">';
	html+= '<textarea cols="30" rows="5" name="txt" placeholder="Digite o seu comentario" style="position: absolute; top: 50px; left: 20%;"></textarea>';
	html+= '<div style="position: absolute; top: 200px; left: 20%;"></div>';
	html+= '<input type="submit" value="Enviar" style="position: absolute; top: 60px; left: 60%">';
	html+= '</form>';
	html+= '<a href="/del" style="position: absolute; top: 50px; left: 10%;">Deletar</a>';
	html+= '</body>';
	html+= '</html>';

	res.send(html);
});

app.post('/', urlencodedParser,function (req, res){
	var html = '';
	var txt = req.body.txt;
	var val = [];

	ler();
	var t = texto;
	val = t.split("/");

	html+= '<html>';
	html+= '<head>';
	html+= '<meta charset="utf-8">';
	html+= '<title>Programa</title>';
	html+= '</head>';
	html+= '<body>';
	html+= '<form method="post" action="/">';
	html+= '<textarea cols="30" rows="5" name="txt" placeholder="Digite o seu comentario" style="position: absolute; top: 50px; left: 20%;"></textarea>';

	if(txt){
		gravar(txt);
	}

	var n = 200;
	if(val.length != 0){
		for(i = 0; i < val.length; i++){
			html += '<div style="position: absolute; top: '+n+'px; left: 20%; width: 40%; height: 50px; background-color: blue;">';
			html += '<p style="position: absolute; top: 5px; left: 50px; font-family: Cambria;">'+val[i]+'</p>';
			html += '</div>';
			n = n + 70;
		}
	}

	html+= '<input type="submit" value="Enviar" style="position: absolute; top: 60px; left: 60%">';
	html+= '</form>';
	html+= '<a href="/del" style="position: absolute; top: 50px; left: 10%;">Deletar</a>';
	html+= '</body>';
	html+= '</html>';

	res.send(html);
});

app.get('/del', function(req, res){
	dlt();
	res.redirect('/');
});

app.listen(2000, function(){
	console.log('App rodando na porta 2000');
});

function gravar(text){
	var t = text+"/";
	fs.appendFile('conversa.txt', t, function (err){
		if (err) throw err;
		console.log('Gravado!');
	});
}

function ler(){
	fs.readFile('conversa.txt', function (err, data){
		if (err) throw err;
		texto = data.toString();
	});
}

function dlt(){
	var nothing = "";
	fs.writeFile('conversa.txt', nothing, function (err){
		if (err) throw err;
		console.log('Apagado!');
	});
}
