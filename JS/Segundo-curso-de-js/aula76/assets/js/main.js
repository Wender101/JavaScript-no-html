// Sempre que eu quiser referenciar uma chave do meu obj dentro do obj, eu presciso da palavra 'this'. O this recebe quem chama.

// OBS: se vc usar uma errow function, o valor do this sempre será o mesmo! 

function criaCalculadora() {
  return {
    display: document.querySelector('.display'),

    inicia() {
      this.cliqueBotoes();
      this.pressionaEnter();
    },

    pressionaEnter() {
      this.display.addEventListener('keyup', e => {
        if(e.keyCode === 13) {
          this.realizaConta();
        }
      });
    },
    
    clearDisplay() {
      this.display.value = '';
    },

    apagaUm() {
      this.display.value = this.display.value.slice(0, -1);
    },

    realizaConta() {
      // O eval vai ezecutar como Js oq for passado para ele.
      let conta = this.display.value;

      try{
        conta = eval(conta);
        
        if(!conta) {
          alert('Conta Invalida');
          return;    
        }
        
        this.display.value = String(conta);
      } catch(e) {
        alert('Conta Invalida');
        return; 
      }

    },

    cliqueBotoes() {
      // this -> calculadora
      document.addEventListener('click', e =>  {
        const el = e.target; // Serve pra checar qual elemento do documento foi clicado.

        if(el.classList.contains('btn-num')) {
          // this -> seria o #document caso não fosse uma arrow funciton.
          this.btnParaDisplay(el.innerText);
        }

        if(el.classList.contains('btn-clear')) {
          this.clearDisplay();
        }

        if(el.classList.contains('btn-del')) {
          this.apagaUm();
        }

        if(el.classList.contains('btn-eq')) {
          this.realizaConta();
        }

      }); 

      /* Segunda forma, caso não fosse usar uma arrow function {
        
          cliqueBotoes() {

            document.addEventListener('click', function(e)  {
              const el = e.target; // Serve pra checar qual elemento do documento foi clicado.
      
              if(el.classList.contains('btn-num')) {
                // this -> #document
                this.btnParaDisplay(el.innerText);
              }
            }.bind(this)); // Esta falando pra função usar esse this e n o dela.
          },
        }
      */
    },

    btnParaDisplay(valor) {
      this.display.value += valor;
    }
  };
}

const calculadora = criaCalculadora();
calculadora.inicia();

