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

    componentDidMount() {
        axios(Constants.BASE_URL).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id);
        if (add) list.unshift(user) //coloca elemento na primeira posição do array
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

    load(user) {
        this.setState({ user });
    }

    remove(user) {
        axios.delete(`${Constants.BASE_URL}/${user.id}`)
            .then(resp => {
                const list = this.getUpdatedList(user, false)
                this.setState({ list })
            })
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

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}