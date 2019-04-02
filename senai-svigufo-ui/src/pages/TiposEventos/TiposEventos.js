import React, {Component} from "react";
import logo from '../../assets/img/icon-login.png';


import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';

class TiposEventos extends Component {
    constructor() {
        super(); //traz algumas funcionalidades
        this.state = {
            lista : [
                // {
                //     id: 1,
                //     nome : "Desenvolvimento de Sistemas"
                // },
                // {
                //     id : 2,
                //     nome : "Marketing Digital"
                // },
                // {
                //     id:3,
                //     nome: "Design"
                // },
                // {
                //     id: 4,
                //     nome: "Linkedin"
                // } //usa-se assim qnd usamos uma lista fixa
            ],
            nome : ""
        }

        this.atualizaEstadoNome = this.atualizaEstadoNome.bind(this); //pesquisar mais sobre
        this.cadastraTipoEvento = this.cadastraTipoEvento.bind(this);
    }

    buscarTiposEventos() {
        fetch('http://localhost:5000/api/tiposeventos')
            .then(resposta => resposta.json())
            .then(data => this.setState({lista : data}))
            .catch(erro => console.log("Erro:", erro))
    }
    
    //Inicializando
    componentDidMount() {
        this.buscarTiposEventos();
    }

    atualizaEstadoNome(event) {
        this.setState( {nome : event.target.value});

    }

    cadastraTipoEvento(event) {
        event.preventDefault();

        fetch('http://localhost:5000/api/tiposeventos',
        {
            method: "POST",
            body : JSON.stringify({ nome : this.state.nome}),
            headers: {"Content-Type" : "application/json"}
        })
        .then (resposta => resposta)
        .then (this.buscarTiposEventos())
        .catch(erro => console.log("Erro:", erro))
    }

    render() {
        return (
            <div>
            <header className="cabecalhoPrincipal">
              <div className="container">
                <img src={logo} />
      
                <nav className="cabecalhoPrincipal-nav">
                  Administrador
                </nav>
              </div>
            </header>
      
            <main className="conteudoPrincipal">
              <section className="conteudoPrincipal-cadastro">
                <h1 className="conteudoPrincipal-cadastro-titulo">Tipos de Eventos</h1>
                <div className="container" id="conteudoPrincipal-lista">
                  <table id="tabela-lista">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Título</th>
                      </tr>
                    </thead>
      
                    <tbody>
                        {
                            this.state.lista.map(function(tipoevento) {
                                return (
                                    <tr key = {tipoevento.id}>
                                        <td> {tipoevento.id}</td>
                                        <td>{tipoevento.nome}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                  </table>
                </div>
      
                <div className="container" id="conteudoPrincipal-cadastro">
                  <h2 className="conteudoPrincipal-cadastro-titulo">
                    Cadastrar Tipo de Evento
                  </h2>
                  <form onSubmit = {this.cadastraTipoEvento} method="POST" id="form">
                    <div className="container">
                      <input
                        type="text"
                        value = {this.state.nome}
                        onChange = {this.atualizaEstadoNome}
                        id="nome-tipo-evento"
                        placeholder="tipo do evento"
                      />
                      <button
                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </main>
      
            <footer className="rodapePrincipal">
              <section className="rodapePrincipal-patrocinadores">
                <div className="container">
                  <p>Escola SENAI de Informática - 2019</p>
                </div>
              </section>
            </footer>
          </div>
        );
    }
}

export default TiposEventos;