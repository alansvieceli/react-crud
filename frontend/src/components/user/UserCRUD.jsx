import React from 'react'
import axios from 'axios'

import Main from '../template/Main'
import Constants from '../../utils/Constants'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir"
}

//estado inicial
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends React.Component {

    state = { ...initialState }

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id);
        list.unshift(user) //coloca elemento na primeira posição do array
        return list;
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${Constants.BASE_URL}/${user.id}` : Constants.BASE_URL

        //axios.post ou axios.put
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    updateField(event) {
        const user = { ...this.state.user } //clonar objeto
        user[event.target.name] = event.target.value;
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-dm-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-dm-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}