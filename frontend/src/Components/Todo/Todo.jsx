import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import axios from 'axios'
import Erro from '../Mensagens/Erro'
import Sucesso from '../Mensagens/Sucesso'

const URL = 'http://localhost:3003/api/todos'


export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            description: '', 
            list: [], 
            hasError: false, 
            mensagem: '', 
            hasSuccess: false,
            mostrarErro: false,
            mostrarSucesso: false,
            Validacao: false
            
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkDone = this.handleMarkDone.bind(this)
        this.handleDisMarkDone = this.handleDisMarkDone.bind(this)
        this.refresh()
    }

    refresh() {
        axios.get(`${URL}?sort=-createAt`)
            .then(response => this.setState({...this.state, description: '', list: response.data})); 
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })

    }

   

    handleAdd() {
        const description = this.state.description

        if (description == "") {
            console.log("Campo vazio")

            this.setState({ mostrarErro: true, Validacao:true, mostrarSucesso: false, mensagem: "Informe a tarefa!" })        

        } else {

            axios.post(URL, { description })
                .then(response => this.refresh(), 
                    this.setState({ mostrarSucesso: true, Validacao: false, mostrarErro: false, mensagem: "Tarefa salva com sucesso!" }))
                .catch(function (error) {
                    console.log(error);
                })
        }


    }

    handleRemove(todo){
        
        axios.delete(`${URL}/${todo._id}`)
            .then(response => this.refresh(),  
            this.setState({ mostrarSucesso: true, mostrarErro: false, mensagem: "Excluido com sucesso!" }))
    }

    handleMarkDone(todo){
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(response => this.refresh(),
                this.setState({ mostrarSucesso: true, mostrarErro: false, mensagem: "Tarefa concluida com sucesso!" }))

    }

    handleDisMarkDone(todo){
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(response => this.refresh(),
                this.setState({ mostrarSucesso: true, mostrarErro: false, mensagem: "Tarefa desmarcada com sucesso!" }))
    }

    render() {

      

        return (


            <div className="container">
             <br/>

                { this.state.mostrarErro && <Erro  mensagem={this.state.mensagem}/>}
               
                { this.state.mostrarSucesso && <Sucesso mensagem={this.state.mensagem}/> }

               

                <TodoForm
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    error={this.state.hasError}
                    Validacao={this.state.Validacao}
                     />

                <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkDone={this.handleMarkDone}
                    handleDisMarkDone={this.handleDisMarkDone}
                    />
            </div>
        )
    }
}