import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import Tarefa from './models/app.model'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public titulo: string = 'Lista de Tarefas'
  public tarefas: Tarefa[] = []
  public formulario_tarefa: FormGroup
  public id_base: number = 1

  constructor(private form_builder: FormBuilder){
    this.formulario_tarefa = this.form_builder.group({
      tarefa: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })

    this.carregar_tarefas()
  }

  adicionar_tarefa(){
    const tarefa = this.formulario_tarefa.controls['tarefa'].value

    this.tarefas.push({
      tarefa: tarefa,
      concluida: false
    })

    this.salvar_tarefas()
    this.limpar_formulario()
  }

  concluir_tarefa(tarefa: Tarefa){
    tarefa.concluida = true
    this.salvar_tarefas()
  }

  refazer_tarefa(tarefa: Tarefa){
    tarefa.concluida = false
    this.salvar_tarefas()
  }

  remover_tarefa(tarefa: Tarefa){
    const indice = this.tarefas.indexOf(tarefa)

    if(indice !== -1){
      this.tarefas.splice(indice, 1)
      this.salvar_tarefas()
    }
  }

  salvar_tarefas(){
    const dados_tarefas = JSON.stringify(this.tarefas)

    localStorage.setItem('Tarefas', dados_tarefas)
  }

  carregar_tarefas(){
    const tarefas_salvas = localStorage.getItem('Tarefas')

    if(tarefas_salvas !== null){
      this.tarefas = JSON.parse(tarefas_salvas)
    }else{
      console.log('Não há tarefas a serem carregadas!')
    }
  }

  limpar_formulario(){
    this.formulario_tarefa.reset()
  }
}