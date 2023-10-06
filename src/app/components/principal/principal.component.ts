import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  constructor(private mainService: MainService) {}

  ngOnInit(): void {}

  fileName: any;

  jsonObject: any;

  reportText: String = '';

  fileSizeError: boolean = false;

  charCount: number = 0;

  loading = false;

  fileUploaded = false;

  errorMessage = ''

  onFileChange(event: any) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.readFile(file);
  }

  readFile(file: File) {
    this.fileUploaded = false;
    this.errorMessage = ''
    this.reportText = ''
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent: string = reader.result as string;
      this.charCount = fileContent.length;
      console.log('char count: ' + this.charCount);
      if (this.charCount > 20000) {
        this.fileSizeError = true;
        this.fileUploaded = false
      } else {
        this.fileSizeError = false;
      }

      this.jsonObject = { content: fileContent };
    };
    reader.readAsText(file);
    this.fileUploaded = true;
  }

  sendToBackend() {
    this.reportText = '';
    this.errorMessage = ''
    if (this.charCount == 0) {
      console.log('escolha o arquivo!');
    } else {
      this.loading = true;
      this.mainService.sendToBackend(this.jsonObject).subscribe(
        (r) => {
          this.reportText = r;
          //console.log(r);
          this.loading = false;
        },
        (error) => {
          //console.log(error);
          this.errorMessage = 'Ocorreu um erro na conexão com a API!';
          this.loading = false;

        }
      );
    }
  }
}
