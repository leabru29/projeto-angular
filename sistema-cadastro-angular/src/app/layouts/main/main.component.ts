import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { HttpClient } from '@angular/common/http';
import { EnderecoService } from 'src/app/services/endereco.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  cpf_mask = createMask('999.999.999-99');

  telefone_mask = createMask('(99) 99999-9999');

  cep_mask = createMask('99.999-999')


  @Input() btnText!: string

  formUsuario!: FormGroup;

  constructor(private http: HttpClient, private enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.formUsuario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('', [Validators.required]),
      data_nascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      conf_senha: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
    });
  }

  get nome() {
    return this.formUsuario.get('nome')!;
  }

  get sobrenome(){
    return this.formUsuario.get('sobrenome')!;
  }

  get data_nascimento(){
    return this.formUsuario.get('data_nascimento')!;
  }
  get cpf(){
    return this.formUsuario.get('cpf')!;
  }
  get telefone(){
    return this.formUsuario.get('telefone')!;
  }
  get email(){
    return this.formUsuario.get('email')!;
  }
  get senha(){
    return this.formUsuario.get('senha')!;
  }
  get conf_senha(){
    return this.formUsuario.get('conf_senha')!;
  }
  get cep(){
    return this.formUsuario.get('cep')!;
  }
  get logradouro(){
    return this.formUsuario.get('logradouro')!;
  }
  get numero(){
    return this.formUsuario.get('numero')!;
  }
  get bairro(){
    return this.formUsuario.get('bairro')!;
  }
  get cidade(){
    return this.formUsuario.get('cidade')!;
  }


  onSubmit(){
    if (this.formUsuario.invalid) {
      return;
    }
    console.log(this.formUsuario.value);

  }

  consultaCEP(){
    let cep = this.formUsuario.value.cep
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validaCEP = /^[0-9]{8}$/;
      if (validaCEP.test(cep)) {
         this.resetaForm(this.formUsuario);
         this.getDataAndress(cep);
      }
    }
  }

  resetaForm(formulario: any) {
    formulario.patchValue({
      logradouro: null,
      complemento: null,
      bairro: null,
      cidade: null
    })
  }

  populaForm(dados: any){
    this.formUsuario.patchValue({
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade
    })
  }

  getDataAndress(cep: any){
    this.enderecoService.getDadosEndereco(cep)
        .then(dados => this.populaForm(dados))
        .catch(error => console.error(error))
  }
}
