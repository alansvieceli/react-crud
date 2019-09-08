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
    usar: { name: '', email: '' },
    list: []
}

export default class UserCrud extends React.Component {

    state = { ...initialState }

    getUpdatedList(user){
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
                this.setState({ user: initialState.user, list})
            })    
    }

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}