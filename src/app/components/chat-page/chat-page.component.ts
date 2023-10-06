import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  constructor(private mainService: MainService) { }

  chatText = '';
  promptText = '';

  promptList = ["Me conte uma piada", "Doido", "Mais doido"]
  responseList = ["Teste de texto1", "Teste de text 2", "Esse é um texto aleatório sem sentido algun"]

  combinedList = [""]

  loading = false

  ngOnInit(): void {
    
  }

  sendPrompt() {
    if (this.promptText != '') {
      this.loading = true;
      let jsonObject = { content: this.promptText };
      if (this.combinedList.length == 1)
        this.combinedList.pop()
      this.combinedList.push(this.promptText)
      this.mainService.sendToBackendChat(jsonObject).subscribe(
        (r) => {
          this.chatText = r;
          //this.promptList.push(this.promptText)
          //this.responseList.push(r)
          this.loading = false
          this.combinedList.push(r)
        },
        (error) => {
          //console.log(error);
          this.loading = false
          this.chatText = 'Desculpe, ocorreu um erro inesperado ' + error;
        }
      );
    }
  }
}
